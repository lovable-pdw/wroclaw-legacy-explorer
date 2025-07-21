import { NextRequest, NextResponse } from 'next/server';
import { sendPaymentConfirmation } from '../shared/email-service';
import type { EmailOrderDetails } from '../shared/types';

interface RequestBody {
  email: string;
  orderId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, orderId }: RequestBody = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    console.log('=== Testing Email Function ===');
    console.log('Target email:', email);
    console.log('Test order ID:', orderId);
    
    const testOrderDetails: EmailOrderDetails = {
      orderId: orderId || 'TEST-' + Date.now(),
      totalAmount: 2500, // 25.00 PLN in grosze
      currencyCode: 'PLN',
      products: [
        {
          name: 'Rezerwacja testowa - Dawny Wrocław',
          quantity: '1',
          unitPrice: '2500'
        }
      ]
    };
    
    console.log('📧 Sending test email to:', email);
    console.log('📦 Test order details:', testOrderDetails);
    
    const result = await sendPaymentConfirmation(email, testOrderDetails);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully',
        messageId: result.messageId,
        sentTo: email
      });
    } else {
      console.error('❌ Test email failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
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
