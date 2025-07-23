import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Inline email test function for serverless environment
const testEmailConnection = async (): Promise<boolean> => {
  try {
    const cleanPassword = process.env.EMAIL_PASSWORD?.replace(/^['"]|['"]$/g, '') || '';
    
    console.log('Testing email configuration:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      hasPassword: !!cleanPassword
    });
    
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
    console.log('Email server connection verified successfully');
    return true;
  } catch (error) {
    console.error('Email connection test failed:', error);
    return false;
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
    console.log('Testing email service connection...');
    
    const isConnected = await testEmailConnection();
    
    console.log('Email service test result:', isConnected);
    
    res.status(200).json({
      message: 'Email service test completed',
      connected: isConnected,
      timestamp: new Date().toISOString(),
      config: {
        host: process.env.EMAIL_HOST || 'Not configured',
        port: process.env.EMAIL_PORT || 'Not configured',
        user: process.env.EMAIL_USER || 'Not configured',
        hasPassword: !!process.env.EMAIL_PASSWORD
      }
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
