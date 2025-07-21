import { EmailOrderDetails, EmailResult } from './types';

// Import the existing email service
const { sendPaymentConfirmation: originalSendEmail, testEmailConnection } = require('../../../server/emailService');

export async function sendPaymentConfirmation(
  customerEmail: string, 
  orderDetails: EmailOrderDetails
): Promise<EmailResult> {
  return await originalSendEmail(customerEmail, orderDetails);
}

export async function testEmailConnectionService(): Promise<boolean> {
  return await testEmailConnection();
}
