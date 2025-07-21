import { NextRequest, NextResponse } from 'next/server';
import { sendPaymentConfirmation } from '../shared/email-service';
import type { EmailOrderDetails } from '../shared/types';

interface RequestBody {
  email: string;
  orderDetails: EmailOrderDetails;
}

export async function POST(request: NextRequest) {
  try {
    const { email, orderDetails }: RequestBody = await request.json();
    
    if (!email || !orderDetails) {
      return NextResponse.json(
        { error: 'Email and order details are required' },
        { status: 400 }
      );
    }
    
    console.log('=== Manual Email Trigger ===');
    console.log('Email:', email);
    console.log('Order Details:', orderDetails);
    
    const emailResult = await sendPaymentConfirmation(email, orderDetails);
    
    if (emailResult.success) {
      console.log('✅ Manual payment confirmation email sent successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully',
        messageId: emailResult.messageId 
      });
    } else {
      console.error('❌ Failed to send manual payment confirmation email:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: emailResult.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Manual email trigger error:', error);
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
