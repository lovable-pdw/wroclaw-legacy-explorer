import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Inline email test function for serverless environment
const testEmailConnection = async (): Promise<{ connected: boolean, emailSent: boolean, emailResult?: any }> => {
  try {
    const cleanPassword = process.env.EMAIL_PASSWORD?.replace(/^['"]|['"]$/g, '') || '';
    
    // console.log('Testing email configuration:', {
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   user: process.env.EMAIL_USER,
    //   hasPassword: !!cleanPassword
    // });
    
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
    
    await transporter.verify();
    // console.log('Email server connection verified successfully');
    
    // Send test email
    // console.log('Sending test email...');
    const mailOptions = {
      from: {
        name: 'Projekt Dawny Wrocław - Test',
        address: process.env.EMAIL_USER
      },
      to: 'piotr.sobolewski85@gmail.com',
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
              <p><strong>Numer zamówienia:</strong> sad </p>
              <p><strong>Kwota:</strong> adsad PLN</p>
              <p><strong>Status:</strong>  sadas </p>
            </div>
            <p>Dziękujemy za wsparcie projektu Dawny Wrocław!</p>
          </div>
        </div>
      `
    };
    
    const emailResult = await transporter.sendMail(mailOptions);
    // console.log('Test email sent successfully:', JSON.stringify(emailResult, null, 2));
    
    return { connected: true, emailSent: true, emailResult };
  } catch (error) {
    console.error('Email test failed:', error);
    return { connected: false, emailSent: false };
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
    try {
    // console.log('Testing email service connection...');
    
    const testResult = await testEmailConnection();
    
    // console.log('Email service test result:', testResult);
    
    res.status(200).json({
      message: 'Email service test completed',
      connected: testResult.connected,
      emailSent: testResult.emailSent,
      timestamp: new Date().toISOString(),
      config: {
        host: process.env.EMAIL_HOST || 'Not configured',
        port: process.env.EMAIL_PORT || 'Not configured',
        user: process.env.EMAIL_USER || 'Not configured',
        hasPassword: !!process.env.EMAIL_PASSWORD
      },
      emailResult: testResult.emailResult
    });
  } catch (error) {
    console.error('Email service test error:', error);
    
    res.status(500).json({
      error: 'Email service test failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
