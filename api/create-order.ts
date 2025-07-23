import { VercelRequest, VercelResponse } from '@vercel/node';

// PayU configuration - same as in your original server
const IS_SANDBOX = process.env.PAYU_SANDBOX !== 'false'; // Default to sandbox unless explicitly set to false
const PAYU_BASE_URL = IS_SANDBOX ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';

const SANDBOX_CREDENTIALS = {
  clientId: '300746',
  clientSecret: '2ee86a66e5d97e3fadc400c9f19b065d',
  merchantPosId: '300746'
};

console.log('Environment Variables Debug:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  PAYU_SANDBOX: process.env.PAYU_SANDBOX,
  hasPayuClientId: !!process.env.PAYU_CLIENT_ID,
  hasPayuClientSecret: !!process.env.PAYU_CLIENT_SECRET
});

const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientId : null);
const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientSecret : null);
const PAYU_MERCHANT_POS_ID = process.env.PAYU_MERCHANT_POS_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.merchantPosId : null);
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://projektdawnywroclaw.pl';
const IS_TEST_MODE = process.env.TEST_MODE === 'true';

// Log configuration for debugging
console.log('PayU Configuration:', {
  environment: IS_SANDBOX ? 'SANDBOX' : 'PRODUCTION',
  baseUrl: PAYU_BASE_URL,
  clientId: PAYU_CLIENT_ID,
  merchantPosId: PAYU_MERCHANT_POS_ID,
  hasClientSecret: !!PAYU_CLIENT_SECRET,
  usingSandboxCredentials: IS_SANDBOX && !process.env.PAYU_CLIENT_ID
});

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
    
    console.log('New OAuth token obtained');
    return accessToken;
  } catch (error) {
    console.error('OAuth Token Error:', error);
    throw new Error(`Failed to obtain OAuth token: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  try {
    const { 
      customerIp, 
      description, 
      currencyCode = 'PLN', 
      totalAmount, 
      products,
      extOrderId,
      buyer
    } = req.body;

    // Validate required fields
    if (!customerIp || !description || !totalAmount || !products || !Array.isArray(products)) {
      return res.status(400).json({ 
        error: 'customerIp, description, totalAmount, and products array are required.' 
      });
    }

    // Get OAuth token
    const token = await getAccessToken();
    
    // Validate products array
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product.name || !product.unitPrice || !product.quantity) {
        return res.status(400).json({
          error: `Product at index ${i} is missing required fields (name, unitPrice, quantity).`
        });
      }
      if (isNaN(product.unitPrice) || isNaN(product.quantity)) {
        return res.status(400).json({
          error: `Product at index ${i} has invalid numeric values.`
        });
      }
    }

    let finalAmount = totalAmount;
    let finalDescription = description;
    if (IS_TEST_MODE) {
      finalAmount = 100; // 1 zl
      finalDescription = `[TEST] ${description}`;
      console.log('🧪 TEST MODE: Using 1 zloty for production PayU test');
    }

    // Create order payload
    const orderPayload = {
      customerIp,
      merchantPosId: PAYU_MERCHANT_POS_ID,
      description: finalDescription,
      currencyCode,
      totalAmount: finalAmount.toString(),
      products: products.map((product: any) => ({
        name: IS_TEST_MODE ? `[TEST] ${product.name}` : product.name,
        unitPrice: IS_TEST_MODE ? "100" : product.unitPrice.toString(),
        quantity: product.quantity.toString()
      })),
      ...(extOrderId && { extOrderId }),
      ...(buyer && {
        buyer: {
          email: buyer.email,
          phone: buyer.phone,
          firstName: buyer.firstName,
          lastName: buyer.lastName,
          language: buyer.language || 'pl'
        }
      }),
      continueUrl: `${FRONTEND_URL}/payment-success`,
      notifyUrl: `${FRONTEND_URL}/api/payu-webhook`
    };

    console.log('Creating PayU order with payload:', JSON.stringify(orderPayload, null, 2));    // Create order with PayU
    const payuResponse = await fetch(`${PAYU_BASE_URL}/api/v2_1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderPayload),
      redirect: 'manual'
    });

    console.log('PayU response status:', payuResponse.status);
    console.log('PayU response headers:', Object.fromEntries(payuResponse.headers.entries()));

    // Handle 302 redirect (normal PayU response)
    if (payuResponse.status === 302) {
      const redirectUri = payuResponse.headers.get('location');
      console.log('✅ PayU order created successfully! Redirect URL:', redirectUri);
      
      return res.status(200).json({
        status: { statusCode: 'SUCCESS' },
        redirectUri: redirectUri,
        orderId: payuResponse.headers.get('correlation-id') || null,
        extOrderId: orderPayload.extOrderId
      });
    } 
    // Handle JSON response (alternative flow)
    else if (payuResponse.status === 200) {
      const data = await payuResponse.json();
      console.log('✅ PayU JSON response received:', data);
      
      return res.status(200).json({
        status: data.status || { statusCode: 'SUCCESS' },
        redirectUri: data.redirectUri,
        orderId: data.orderId,
        extOrderId: data.extOrderId || orderPayload.extOrderId
      });
    }
    // Handle unexpected response
    else {
      console.log('⚠️ Unexpected PayU response format');
      console.log('Status:', payuResponse.status);
      
      return res.status(200).json({
        status: { statusCode: 'SUCCESS' },
        redirectUri: `${PAYU_BASE_URL}/summary`,
        orderId: payuResponse.headers.get('correlation-id') || null,
        extOrderId: orderPayload.extOrderId,
        message: 'Order created but response format unexpected'
      });
    }
  } catch (error) {
    console.error('PayU Create Order Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Always return JSON response
    return res.status(500).json({
      error: 'Failed to create order with PayU.',
      details: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}
