// Simple email test script
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  // Clean password from quotes
  const cleanPassword = process.env.EMAIL_PASSWORD.replace(/^['"]|['"]$/g, '');
  
  console.log('Testing email with:');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER);
  console.log('Password length:', cleanPassword.length);
  console.log('Password first char:', cleanPassword.charAt(0));
  console.log('Password last char:', cleanPassword.charAt(cleanPassword.length - 1));
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPassword
    },
    debug: true,
    logger: true
  });
  
  try {
    await transporter.verify();
    console.log('✅ Email server connection successful!');
  } catch (error) {
    console.error('❌ Email server connection failed:', error.message);
  }
}

testEmail();
