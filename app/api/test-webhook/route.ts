import { NextRequest, NextResponse } from 'next/server';
import { sendPaymentConfirmation } from '../shared/email-service';
import type { EmailOrderDetails } from '../shared/types';

interface RequestBody {
  email?: string;
  orderId?: string;
  status?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, orderId, status = 'COMPLETED' }: RequestBody = await request.json();
    
    console.log('=== Testing Webhook Function ===');
    console.log('Simulating PayU notification with:', { email, orderId, status });
    
    const mockNotification = {
      order: {
        orderId: orderId || 'TEST-WEBHOOK-' + Date.now(),
        status: status,
        totalAmount: '2500',
        currencyCode: 'PLN',
        products: [
          {
            name: 'Test Product - Dawny Wrocław',
            quantity: '1',
            unitPrice: '2500'
          }
        ],
        buyer: email ? {
          email: email,
          firstName: 'Test',
          lastName: 'User'
        } : undefined
      }
    };
    
    console.log('🔄 Processing test webhook notification...');
    
    // Process the mock notification the same way as real webhook
    const order = mockNotification.order;
    const customerEmail = order.buyer?.email;
    
    if (customerEmail && status === 'COMPLETED') {
      const orderDetails: EmailOrderDetails = {
        orderId: order.orderId,
        totalAmount: parseInt(order.totalAmount),
        currencyCode: order.currencyCode,
        products: order.products
      };
      
      const emailResult = await sendPaymentConfirmation(customerEmail, orderDetails);
      
      return NextResponse.json({
        success: true,
        message: 'Test webhook processed',
        emailSent: emailResult.success,
        emailError: emailResult.error || null
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Test webhook processed, but no email sent',
        reason: !customerEmail ? 'No email provided' : `Status is ${status}, not COMPLETED`
      });
    }
  } catch (error) {
    console.error('❌ Test webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
