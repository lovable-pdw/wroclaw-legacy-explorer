import { VercelRequest, VercelResponse } from '@vercel/node';

// PayU configuration - same as in create-order.ts
const IS_SANDBOX = process.env.PAYU_SANDBOX !== 'false';
const PAYU_BASE_URL = IS_SANDBOX ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';

const SANDBOX_CREDENTIALS = {
  clientId: '300746',
  clientSecret: '2ee86a66e5d97e3fadc400c9f19b065d',
  merchantPosId: '300746'
};

const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientId : null);
const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientSecret : null);

// OAuth token storage (in production, use Redis)
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken(): Promise<string> {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch(`${PAYU_BASE_URL}/pl/standard/user/oauth/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: PAYU_CLIENT_ID!,
        client_secret: PAYU_CLIENT_SECRET!
      })
    });

    if (!response.ok) {
      throw new Error(`OAuth failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    
    // console.log('New OAuth token obtained for order status');
    return accessToken;
  } catch (error) {
    console.error('OAuth Token Error:', error);
    throw new Error(`Failed to obtain OAuth token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId } = req.query;

  if (!orderId || typeof orderId !== 'string') {
    return res.status(400).json({ error: 'Order ID is required.' });
  }

  try {
    // console.log('🔍 Checking order status for:', orderId);
    
    const token = await getAccessToken();

    const payuResponse = await fetch(
      `${PAYU_BASE_URL}/api/v2_1/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!payuResponse.ok) {
      throw new Error(`PayU API error: ${payuResponse.status} ${payuResponse.statusText}`);
    }

    const data = await payuResponse.json();
    // console.log('✅ Order status retrieved successfully');
    
    return res.status(200).json(data);

  } catch (error) {
    console.error('PayU Order Status Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return res.status(500).json({
      error: 'Failed to get order status from PayU.',
      details: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}
