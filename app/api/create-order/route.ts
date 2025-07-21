import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { 
  PAYU_BASE_URL, 
  PAYU_MERCHANT_POS_ID, 
  FRONTEND_URL, 
  IS_TEST_MODE 
} from '../shared/config';
import { getAccessToken } from '../shared/payu-auth';
import { 
  CreateOrderRequest, 
  PayUOrderPayload, 
  PayUOrderResponse 
} from '../shared/types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateOrderRequest = await request.json();
    
    const { 
      customerIp, 
      description, 
      currencyCode = 'PLN', 
      totalAmount, 
      products,
      extOrderId,
      buyer 
    } = body;

    // Validate required fields
    if (!customerIp || !description || !totalAmount || !products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'customerIp, description, totalAmount, and products array are required.' },
        { status: 400 }
      );
    }

    // Get OAuth token
    const token = await getAccessToken();
    
    // Validate products array
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product.name || !product.unitPrice || !product.quantity) {
        return NextResponse.json(
          { error: `Product at index ${i} is missing required fields (name, unitPrice, quantity).` },
          { status: 400 }
        );
      }
      if (isNaN(product.unitPrice) || isNaN(product.quantity)) {
        return NextResponse.json(
          { error: `Product at index ${i} has invalid numeric values.` },
          { status: 400 }
        );
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
    const orderPayload: PayUOrderPayload = {
      customerIp,
      merchantPosId: PAYU_MERCHANT_POS_ID!,
      description: finalDescription,
      currencyCode,
      totalAmount: finalAmount.toString(),
      products: products.map(product => ({
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
      notifyUrl: `${request.nextUrl.origin}/api/payu-webhook`
    };

    console.log('Creating PayU order with payload:', JSON.stringify(orderPayload, null, 2));

    // Create order with PayU
    const payuResponse = await axios.post(
      `${PAYU_BASE_URL}/api/v2_1/orders`,
      orderPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        validateStatus: function (status) {
          return status >= 200 && status < 400;
        }
      }
    );

    console.log('PayU response status:', payuResponse.status);
    console.log('PayU response headers:', Object.keys(payuResponse.headers));

    // Handle 302 redirect (normal PayU response)
    if (payuResponse.status === 302) {
      const redirectUri = payuResponse.headers.location;
      console.log('✅ PayU order created successfully! Redirect URL:', redirectUri);
      
      const response: PayUOrderResponse = {
        status: { statusCode: 'SUCCESS' },
        redirectUri: redirectUri,
        orderId: payuResponse.headers['correlation-id'] || null,
        extOrderId: orderPayload.extOrderId
      };
      
      return NextResponse.json(response);
    } 
    // Handle JSON response (alternative flow)
    else if (payuResponse.status === 200 && payuResponse.data && typeof payuResponse.data === 'object') {
      console.log('✅ PayU JSON response received:', payuResponse.data);
      
      const response: PayUOrderResponse = {
        status: payuResponse.data.status || { statusCode: 'SUCCESS' },
        redirectUri: payuResponse.data.redirectUri,
        orderId: payuResponse.data.orderId,
        extOrderId: payuResponse.data.extOrderId || orderPayload.extOrderId
      };
      
      return NextResponse.json(response);
    }
    // Handle unexpected response
    else {
      console.log('⚠️ Unexpected PayU response format');
      console.log('Status:', payuResponse.status);
      console.log('Data type:', typeof payuResponse.data);
      
      const response: PayUOrderResponse = {
        status: { statusCode: 'SUCCESS' },
        redirectUri: `${PAYU_BASE_URL}/summary`,
        orderId: payuResponse.headers['correlation-id'] || null,
        extOrderId: orderPayload.extOrderId,
        message: 'Order created but response format unexpected'
      };
      
      return NextResponse.json(response);
    }
  } catch (error: any) {
    console.error('PayU Create Order Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // More specific error messages based on status code
    let errorMessage = 'Failed to create order with PayU.';
    let statusCode = 500;
    
    if (error.response) {
      statusCode = error.response.status;
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request data sent to PayU. Please check the order details.';
          break;
        case 401:
          errorMessage = 'Authentication failed with PayU. Please check API credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. Please check your PayU merchant configuration.';
          break;
        case 422:
          errorMessage = 'PayU validation error. Please check the order data format.';
          break;
        case 429:
          errorMessage = 'Too many requests to PayU. Please try again later.';
          break;
        case 500:
          errorMessage = 'PayU server error. Please try again later.';
          break;
        default:
          errorMessage = `PayU API error (${error.response.status}): ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'Unable to connect to PayU. Please check your internet connection.';
      statusCode = 503;
    }
    
    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response ? error.response.data : error.message,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}
