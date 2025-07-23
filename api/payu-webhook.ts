import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Import webhook logging function
function addWebhookLog(logEntry: any) {
  // This would be shared with webhook-logs.ts in a real implementation
  console.log('=== PayU Webhook Received ===');
  console.log('Timestamp:', logEntry.timestamp);
  console.log('Headers:', JSON.stringify(logEntry.headers, null, 2));
  console.log('Body:', JSON.stringify(logEntry.body, null, 2));
}

// Inline email service for webhook notifications
async function sendPaymentConfirmation(customerEmail: string, orderDetails: any): Promise<boolean> {
  try {
    const cleanPassword = process.env.EMAIL_PASSWORD?.replace(/^['"]|['"]$/g, '') || '';
    
    console.log('🔧 Email config debug:');
    console.log('- HOST:', process.env.EMAIL_HOST);
    console.log('- PORT:', process.env.EMAIL_PORT);
    console.log('- USER:', process.env.EMAIL_USER);
    console.log('- FROM:', process.env.EMAIL_FROM);
    console.log('- PASSWORD length:', cleanPassword.length);
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    console.log('🔧 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'Projekt Dawny Wrocław',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER
      },
      to: customerEmail,
      subject: 'Potwierdzenie płatności - Projekt Dawny Wrocław',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
              Dziękujemy za płatność!
            </h1>
            <p>Szanowny Kliencie,</p>
            <p>Potwierdzamy otrzymanie płatności za Twoje zamówienie.</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3>Szczegóły zamówienia:</h3>
              <p><strong>1:</strong> ${orderDetails.products[0].name}</p>
              <p><strong>2:</strong> ${orderDetails.description}</p>
              <p><strong>3:</strong> ${orderDetails.products[0]}</p>
              <p><strong>Kwota:</strong> ${orderDetails.totalAmount ? (orderDetails.totalAmount / 100) : 'N/A'} PLN</p>
              <p><strong>Status:</strong> ${orderDetails.status}</p>
            </div>
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="color: #155724; margin-top: 0;">📍 Informacje o wycieczce:</h3>
              <p><strong>Gdzie:</strong> Pręgierz na Wrocławskim Rynku</p>
              <p><strong>Kiedy:</strong> Proszę stawić się 5 minut przed ustaloną godziną wycieczki</p>
              <p style="margin: 15px 0;">
                <a href="https://maps.google.com/maps?q=Pręgierz,+Rynek,+Wrocław" 
                   style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  📍 Zobacz lokalizację w Google Maps
                </a>
              </p>
              <p style="font-size: 14px; color: #6c757d;">
                <em>Pręgierz to historyczny słup znajdujący się na środku Rynku we Wrocławiu.</em>
              </p>
            </div>
            <p>Dziękujemy za wsparcie projektu Dawny Wrocław!</p>
          </div>
        </div>
      `
    };
    
    console.log('📧 Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email send result:', JSON.stringify(result, null, 2));
    console.log('✅ Email sent successfully to:', customerEmail);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const timestamp = new Date().toISOString();
  
  try {
    const body = req.body;
    
    // Log webhook call
    const logEntry = {
      timestamp,
      method: req.method,
      headers: req.headers,
      body,
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    };
    
    addWebhookLog(logEntry);
    
    // PayU sends notifications with order information
    if (body && body.order) {
      const order = body.order;
      const orderId = order.orderId;
      const status = order.status;
      
      console.log(`=== Order Status Update ===`);
      console.log(`BODY: ${body}`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Status: ${status}`);
      console.log(`Buyer Email: ${order.buyer?.email || 'Not provided'}`);        // Handle successful payment
        if (status === 'COMPLETED') {
          console.log('✅ Payment completed successfully for order:', orderId);
          
          // Extract customer email from buyer info
          let customerEmail: string | null = null;
          if (order.buyer && order.buyer.email) {
            customerEmail = order.buyer.email;
            console.log('📧 Customer email found in notification:', customerEmail);
          } else {
            console.log('⚠️ No buyer email in notification');
          }
          
          // Send payment confirmation email
          if (customerEmail) {
            console.log('📧 Sending payment confirmation email to:', customerEmail);
            const orderDetails = {
              orderId: orderId,
              totalAmount: Number(order.totalAmount) || 0,
              currencyCode: order.currencyCode || 'PLN',
              status: status,
              products: order.products || []
            };
            
            try {
              const emailSent = await sendPaymentConfirmation(customerEmail, orderDetails);
              if (emailSent) {
                console.log('✅ Payment confirmation email sent successfully');
              } else {
                console.log('❌ Failed to send payment confirmation email');
              }
            } catch (emailError) {
              console.error('❌ Error sending payment confirmation email:', emailError);
            }
          } else {
            console.warn('⚠️ No customer email found in order data, skipping email notification');
          }
        } else {
          console.log(`ℹ️ Order ${orderId} status is ${status}, no email action needed`);
        }
    } else {
      console.log('⚠️ No order information in notification');
      console.log('Raw notification structure:', Object.keys(body || {}));
    }
    
    // Always respond with 200 OK to acknowledge receipt
    return res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Error processing PayU webhook:', error);
    // Still respond with 200 to prevent PayU from retrying
    return res.status(200).send('ERROR');
  }
}
