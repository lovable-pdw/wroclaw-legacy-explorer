import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { PAYU_BASE_URL } from '../../shared/config';
import { getAccessToken } from '../../shared/payu-auth';

interface Params {
  orderId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> {
  const { orderId } = params;

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required.' },
      { status: 400 }
    );
  }

  try {
    const token = await getAccessToken();

    const payuResponse = await axios.get(
      `${PAYU_BASE_URL}/api/v2_1/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return NextResponse.json(payuResponse.data);

  } catch (error: any) {
    console.error('PayU Order Status Error:', error.response ? error.response.data : error.message);
    
    return NextResponse.json(
      {
        error: 'Failed to get order status from PayU.',
        details: error.response ? error.response.data : error.message
      },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
