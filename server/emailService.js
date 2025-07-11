const nodemailer = require('nodemailer');

// Create transporter using LH.pl SMTP settings
const createTransporter = () => {
  // Remove quotes from password and handle special characters
  const cleanPassword = process.env.EMAIL_PASSWORD.replace(/^['"]|['"]$/g, '');
  
  console.log('Email configuration:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    hasPassword: !!cleanPassword
  });
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true, // SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPassword
    },
    tls: {
      rejectUnauthorized: false // For compatibility with some email servers
    },
    debug: true, // Enable debug for troubleshooting
    logger: true // Enable logging
  });
};

// Send payment confirmation email
const sendPaymentConfirmation = async (customerEmail, orderDetails) => {
  try {
    const transporter = createTransporter();
    
    // Verify SMTP configuration
    await transporter.verify();
    console.log('Email server connection verified');
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'Projekt Dawny Wrocław',
        address: process.env.EMAIL_FROM
      },
      to: customerEmail,
      subject: 'Potwierdzenie płatności - Projekt Dawny Wrocław',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
              Dziękujemy za płatność!
            </h1>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://projektdawnywroclaw.pl/favicon.ico" alt="Projekt Dawny Wrocław" style="width: 64px; height: 64px;">
            </div>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              Szanowni Państwo,
            </p>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              Dziękujemy za dokonanie płatności za rezerwację w projekcie <strong>Dawny Wrocław</strong>. 
              Płatność została pomyślnie zrealizowana.
            </p>
            
            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">Szczegóły zamówienia:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #7f8c8d; font-weight: bold;">ID Zamówienia:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${orderDetails.orderId || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #7f8c8d; font-weight: bold;">Kwota:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${(orderDetails.totalAmount / 100).toFixed(2)} ${orderDetails.currencyCode || 'PLN'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #7f8c8d; font-weight: bold;">Data płatności:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${new Date().toLocaleDateString('pl-PL')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #7f8c8d; font-weight: bold;">Status:</td>
                  <td style="padding: 8px 0; color: #27ae60; font-weight: bold;">Opłacone</td>
                </tr>
              </table>
            </div>
            
            ${orderDetails.products && orderDetails.products.length > 0 ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #2c3e50;">Wykupione produkty:</h3>
              <ul style="list-style: none; padding: 0;">
                ${orderDetails.products.map(product => `
                  <li style="padding: 10px; background-color: #f8f9fa; margin: 5px 0; border-radius: 5px; border-left: 4px solid #3498db;">
                    <strong>${product.name}</strong><br>
                    <span style="color: #7f8c8d;">Ilość: ${product.quantity} | Cena jednostkowa: ${(product.unitPrice / 100).toFixed(2)} PLN</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            ` : ''}
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60;">
              <p style="color: #27ae60; margin: 0; font-weight: bold;">
                ✅ Płatność została zrealizowana pomyślnie
              </p>
            </div>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              Szczegółowe informacje o rezerwacji i dalszych krokach otrzymają Państwo w osobnej wiadomości.
            </p>
            
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
              W razie pytań prosimy o kontakt pod adresem: 
              <a href="mailto:${process.env.EMAIL_FROM}" style="color: #3498db; text-decoration: none;">${process.env.EMAIL_FROM}</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
            
            <div style="text-align: center; color: #7f8c8d; font-size: 14px;">
              <p style="margin: 0;">
                <strong>Projekt Dawny Wrocław</strong><br>
                Odkryj historię miasta w nowy sposób
              </p>
              <p style="margin: 10px 0 0 0;">
                Ten email został wysłany automatycznie. Prosimy nie odpowiadać na tę wiadomość.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Dziękujemy za płatność!

Szanowni Państwo,

Dziękujemy za dokonanie płatności za rezerwację w projekcie Dawny Wrocław. 
Płatność została pomyślnie zrealizowana.

Szczegóły zamówienia:
- ID Zamówienia: ${orderDetails.orderId || 'N/A'}
- Kwota: ${(orderDetails.totalAmount / 100).toFixed(2)} ${orderDetails.currencyCode || 'PLN'}
- Data płatności: ${new Date().toLocaleDateString('pl-PL')}
- Status: Opłacone

Szczegółowe informacje o rezerwacji i dalszych krokach otrzymają Państwo w osobnej wiadomości.

W razie pytań prosimy o kontakt pod adresem: ${process.env.EMAIL_FROM}

Projekt Dawny Wrocław
Odkryj historię miasta w nowy sposób
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Test email function for debugging
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Email server connection test failed:', error);
    return false;
  }
};

module.exports = {
  sendPaymentConfirmation,
  testEmailConnection
};
