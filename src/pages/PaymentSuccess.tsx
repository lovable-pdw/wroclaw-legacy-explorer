import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Clock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { API_ENDPOINTS } from "@/lib/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Get stored booking data
    const storedBookingData = localStorage.getItem('bookingData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    }

    // Check order status if orderId is provided
    const orderId = searchParams.get('orderId') || searchParams.get('order_id');
    if (orderId) {
      checkOrderStatus(orderId);
    } else {
      // If no orderId, assume success for now
      setOrderStatus('success');
    }
  }, [searchParams]);
  const checkOrderStatus = async (orderId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.ORDER_STATUS(orderId));
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
        
        // Map PayU status to our status
        const payuStatus = data.orders?.[0]?.status || data.status;
        if (payuStatus === 'COMPLETED' || payuStatus === 'SUCCESS') {
          setOrderStatus('success');
        } else if (payuStatus === 'PENDING' || payuStatus === 'WAITING_FOR_CONFIRMATION') {
          setOrderStatus('pending');
        } else {
          setOrderStatus('failed');
        }
      } else {
        setOrderStatus('failed');
      }
    } catch (error) {
      console.error('Error checking order status:', error);
      setOrderStatus('failed');
    }
  };

  const getStatusIcon = () => {
    switch (orderStatus) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />;
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500 mx-auto" />;
      case 'failed':
        return <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />;
      default:
        return <Clock className="w-16 h-16 text-blue-500 mx-auto animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (orderStatus) {
      case 'success':
        return {
          title: 'Płatność zakończona pomyślnie!',
          description: 'Twoja rezerwacja została potwierdzona. Szczegóły zostały wysłane na Twój email.',
        };
      case 'pending':
        return {
          title: 'Płatność w trakcie weryfikacji',
          description: 'Twoja płatność jest przetwarzana. Otrzymasz potwierdzenie w ciągu kilku minut.',
        };
      case 'failed':
        return {
          title: 'Płatność nieudana',
          description: 'Wystąpił problem z płatnością. Skontaktuj się z nami lub spróbuj ponownie.',
        };
      default:
        return {
          title: 'Sprawdzamy status płatności...',
          description: 'Proszę czekać, weryfikujemy Twoją płatność.',
        };
    }
  };

  const message = getStatusMessage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-6">
              {getStatusIcon()}
              <CardTitle className="text-2xl mt-4">{message.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{message.description}</p>
              
              {bookingData && (
                <div className="bg-muted/50 rounded-lg p-4 text-left">
                  <h3 className="font-semibold mb-3">Szczegóły rezerwacji:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pakiet:</span>
                      <span className="font-medium">{bookingData.package?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span className="font-medium">
                        {new Date(bookingData.date).toLocaleDateString('pl-PL')} o {bookingData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Imię i nazwisko:</span>
                      <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Telefon:</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                    {orderDetails?.orderId && (
                      <div className="flex justify-between">
                        <span>Numer zamówienia:</span>
                        <span className="font-medium">{orderDetails.orderId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {orderStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Co dalej?</h4>
                  <ul className="text-sm text-green-700 space-y-1 text-left">
                    <li>• Otrzymasz email z potwierdzeniem rezerwacji</li>
                    <li>• Punktualnie stawcie się w miejscu zbiórki</li>
                    <li>• Tablety będą na Was czekały</li>
                    <li>• W razie pytań dzwońcie: +48 787 975 999</li>
                  </ul>
                </div>
              )}

              {orderStatus === 'failed' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Potrzebujesz pomocy?</h4>
                  <p className="text-sm text-red-700">
                    Skontaktuj się z nami pod numerem <strong>+48 787 975 999</strong> lub 
                    spróbuj dokonać rezerwacji ponownie.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center pt-4">
                <Button asChild variant="outline">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Powrót do strony głównej
                  </Link>
                </Button>
                {orderStatus === 'failed' && (
                  <Button asChild>
                    <Link to="/booking">Spróbuj ponownie</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
