// PayU API Configuration
export const IS_SANDBOX = process.env.PAYU_SANDBOX === 'true';
export const PAYU_BASE_URL = IS_SANDBOX ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';

// Sandbox public credentials (for testing only)
const SANDBOX_CREDENTIALS = {
  clientId: '300746',
  clientSecret: '2ee86a66e5d97e3fadc400c9f19b065d',
  merchantPosId: '300746'
} as const;

// Use environment variables or fallback to sandbox public credentials
export const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientId : null);
export const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientSecret : null);
export const PAYU_MERCHANT_POS_ID = process.env.PAYU_MERCHANT_POS_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.merchantPosId : null);

// Frontend URL for redirects
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const IS_TEST_MODE = process.env.TEST_MODE === 'true';
