import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useRef } from "react"; // Added useEffect and useRef
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

// TODO: Replace with your actual PayU Public Key
const PAYU_PUBLIC_KEY = "YOUR_PAYU_PUBLIC_KEY";

// Define the PayU SecureFields type if you have it, or use `any` for now
// This assumes the PayU SDK is loaded globally via the script tag in index.html
declare const PayU: any;

const bookingSchema = z.object({
  date: z.date({
    required_error: "Wybierz datę wycieczki",
  }),
  time: z.enum(["12:00", "16:00"], {
    required_error: "Wybierz godzinę wycieczki",
  }),
  package: z.string({
    required_error: "Wybierz pakiet",
  }),
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z.string().min(9, "Podaj prawidłowy numer telefonu"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const packages = [
  { id: "1", name: "1 osoba", subtitle: "1 tablet", price: 79 },
  { id: "2", name: "2 osoby", subtitle: "1 tablet", price: 139 },
  { id: "family", name: "Pakiet Rodzina", subtitle: "2+2 osoby, 2 tablety", price: 189, popular: true },
  { id: "family-plus", name: "Pakiet Rodzina +", subtitle: "2+3 lub więcej (2 dorosłych), 2 tablety", price: 199 },
  { id: "group", name: "Pakiet Grupa", subtitle: "powyżej 6 osób • 1 tablet na 2 osoby", price: 40, perPerson: true },
];

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const { toast } = useToast();
  const payuSecureFieldsRef = useRef<any>(null); // Ref to store PayU SecureFields instance
  // const [payuToken, setPayuToken] = useState<string | null>(null); // Token state might not be needed if directly used
  const [payuError, setPayuError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // Loading state

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (typeof PayU === "undefined" || !PAYU_PUBLIC_KEY.startsWith("pk_")) {
      console.warn("PayU SDK not loaded or Public Key is a placeholder.");
      setPayuError("Błąd inicjalizacji płatności PayU. Klucz publiczny jest nieprawidłowy lub SDK niezaładowane.");
      // Optionally, you could disable the payment form or show a more prominent error
      return;
    }

    try {
      const secureFields = PayU.SecureForms(PAYU_PUBLIC_KEY, {
        fonts: [{ cssSrc: "" }], // You can link your app's fonts if needed
      });
      payuSecureFieldsRef.current = secureFields;

      const sfStyles = {
        base: {
          // Basic styling for the input fields
          fontSize: '16px',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
        },
        invalid: {
          // Styling for invalid fields
          color: 'red',
          ':focus': {
            color: 'red',
          },
        },
      };

      // Mount Card Number
      const cardNumber = secureFields.create('card', sfStyles);
      cardNumber.mount('#payu-card-number');

      // Mount Card Expiry
      const cardExpiry = secureFields.create('expiry', sfStyles);
      cardExpiry.mount('#payu-card-expiry');

      // Mount Card CVV
      const cardCvv = secureFields.create('cvv', sfStyles);
      cardCvv.mount('#payu-card-cvv');

      // Optional: Listen for validation events to update UI
      const statusDiv = document.getElementById('payu-sf-status');

      cardNumber.on('validation', (status: any) => {
        if (statusDiv && status.error && status.field === 'card') {
          statusDiv.textContent = status.error.message || 'Błąd numeru karty';
        } else if (statusDiv && !status.error && status.field === 'card') {
          statusDiv.textContent = ''; // Clear error
        }
      });
      cardExpiry.on('validation', (status: any) => {
         if (statusDiv && status.error && status.field === 'expiry') {
          statusDiv.textContent = status.error.message || 'Błąd daty ważności';
        } else if (statusDiv && !status.error && status.field === 'expiry') {
          statusDiv.textContent = ''; // Clear error
        }
      });
      cardCvv.on('validation', (status: any) => {
        if (statusDiv && status.error && status.field === 'cvv') {
          statusDiv.textContent = status.error.message || 'Błąd kodu CVV';
        } else if (statusDiv && !status.error && status.field === 'cvv') {
          statusDiv.textContent = ''; // Clear error
        }
      });


    } catch (e) {
      console.error("Error initializing PayU Secure Fields:", e);
      setPayuError("Wystąpił błąd podczas inicjalizacji formularza płatności PayU.");
    }

    // Cleanup function to unmount fields if component unmounts
    return () => {
      if (payuSecureFieldsRef.current) {
        // Check if specific fields were mounted before trying to unmount
        // This part of the SDK is sometimes less clear in docs, adjust if PayU provides specific unmount methods per field
        // For now, we assume destroying the main instance is enough or fields unmount automatically.
        // payuSecureFieldsRef.current.destroy(); // Or similar method if available
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const getSelectedPackagePrice = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    return pkg ? (pkg.perPerson ? `${pkg.price} PLN za osobę` : `${pkg.price} PLN`) : "0 PLN";
  };

  const getSelectedPackageDetails = () => {
    return packages.find(p => p.id === selectedPackage);
  };

  const onSubmit = async (data: BookingFormData) => {
    setPayuError(null); // Clear previous errors
    if (!payuSecureFieldsRef.current) {
      setPayuError("Formularz płatności PayU nie jest gotowy.");
      toast({ title: "Błąd", description: "Formularz płatności PayU nie jest gotowy.", variant: "destructive" });
      return;
    }
    if (!selectedPackage) {
      toast({ title: "Błąd", description: "Proszę wybrać pakiet.", variant: "destructive" });
      return;
    }

    setIsProcessingPayment(true);
    const packageDetails = getSelectedPackageDetails();
    if (!packageDetails) {
      toast({ title: "Błąd", description: "Nie można znaleźć szczegółów pakietu.", variant: "destructive" });
      setIsProcessingPayment(false);
      return;
    }

    try {
      // 1. Create PayU Token from Secure Fields
      const tokenResult = await payuSecureFieldsRef.current.createToken();
      if (tokenResult.error) {
        console.error("PayU Tokenization Error:", tokenResult.error);
        setPayuError(tokenResult.error.message || "Błąd podczas tworzenia tokena płatności.");
        toast({
          title: "Błąd tokenizacji PayU",
          description: tokenResult.error.message || "Nie udało się przetworzyć danych karty.",
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      const payuToken = tokenResult.token;
      // console.log("PayU Token:", payuToken); // For debugging

      // 2. Call backend to create payment
      const createPaymentResponse = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: packageDetails.price, // Assuming price is in PLN, backend will convert to cents
          currency: 'PLN', // Or get dynamically if needed
          statement_soft_descriptor: `Wycieczka: ${packageDetails.name}`,
        }),
      });

      if (!createPaymentResponse.ok) {
        const errorData = await createPaymentResponse.json();
        throw new Error(errorData.details?.message || errorData.error || 'Nie udało się utworzyć płatności w systemie.');
      }
      const paymentData = await createPaymentResponse.json();
      const paymentId = paymentData.paymentId;

      if (!paymentId) {
        throw new Error('Nie otrzymano payment_id z backendu.');
      }

      // 3. Call backend to create charge
      const createChargeResponse = await fetch('/api/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: paymentId,
          token: payuToken,
          // Optionally include customer and billing_address if collected and required by PayU
          customer: { // Example structure, adjust as needed
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
          },
          // billing_address: { ... },
          order_details: { // Example structure
            product_description: `Rezerwacja wycieczki: ${packageDetails.name}`,
            // more order details if needed
          }
        }),
      });

      if (!createChargeResponse.ok) {
        const errorData = await createChargeResponse.json();
        throw new Error(errorData.details?.message || errorData.error || 'Nie udało się przetworzyć płatności.');
      }

      const chargeData = await createChargeResponse.json();
      console.log("PayU Charge Response:", chargeData); // For debugging

      // Handle PayU charge response
      // This depends heavily on PayU's response structure for a charge.
      // Typically, you'd check for a status like 'SUCCESSFUL', 'PENDING', or 'FAILED'.
      if (chargeData.status === 'SUCCESSFUL' || chargeData.status === 'CAPTURED') { // Adjust based on actual PayU status
        toast({
          title: "Płatność zakończona sukcesem!",
          description: "Twoja rezerwacja została potwierdzona.",
        });
        form.reset(); // Reset form on success
        setSelectedPackage("");
        // Potentially redirect to a success page: history.push('/booking-success');
      } else if (chargeData.redirect_uri) {
        // Handle 3D Secure redirection if needed
        toast({
          title: "Przekierowanie do banku",
          description: "Za chwilę zostaniesz przekierowany w celu dodatkowej weryfikacji.",
        });
        window.location.href = chargeData.redirect_uri;
      } else {
        // Handle other statuses (e.g., PENDING, FAILED)
        setPayuError(chargeData.error?.message || chargeData.message || "Płatność nie powiodła się. Spróbuj ponownie lub skontaktuj się z obsługą.");
        toast({
          title: "Płatność nie powiodła się",
          description: chargeData.error?.message || chargeData.message || "Wystąpił problem z płatnością.",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error("Payment Processing Error:", error);
      setPayuError(error.message || "Wystąpił nieoczekiwany błąd podczas przetwarzania płatności.");
      toast({
        title: "Błąd płatności",
        description: error.message || "Nie udało się przetworzyć płatności.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              REZERWACJA WYCIECZKI
            </h1>
            <p className="text-xl text-muted-foreground">
              Zarezerwuj historyczną wycieczkę po Wrocławiu z tabletem
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Date, Time, Package Selection */}
                <div className="space-y-6">
                  {/* Date Selection */}
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        Wybierz datę
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd.MM.yyyy")
                                    ) : (
                                      <span>Wybierz datę wycieczki</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Time Selection */}
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Wybierz godzinę
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/10 transition-colors">
                                  <RadioGroupItem value="12:00" id="time-12" />
                                  <Label htmlFor="time-12" className="cursor-pointer flex-1">
                                    <div className="font-semibold">12:00</div>
                                    <div className="text-sm text-muted-foreground">Południe</div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/10 transition-colors">
                                  <RadioGroupItem value="16:00" id="time-16" />
                                  <Label htmlFor="time-16" className="cursor-pointer flex-1">
                                    <div className="font-semibold">16:00</div>
                                    <div className="text-sm text-muted-foreground">Popołudnie</div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Package Selection */}
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Wybierz pakiet
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="package"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedPackage(value);
                                }}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                {packages.map((pkg) => (
                                  <div key={pkg.id} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/10 transition-colors">
                                    <RadioGroupItem value={pkg.id} id={`package-${pkg.id}`} />
                                    <Label htmlFor={`package-${pkg.id}`} className="cursor-pointer flex-1 flex justify-between items-center">
                                      <div>
                                        <div className="font-semibold flex items-center gap-2">
                                          {pkg.name}
                                          {pkg.popular && (
                                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                              POPULARNY
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">{pkg.subtitle}</div>
                                      </div>
                                      <div className="text-lg font-bold text-primary">
                                        {pkg.perPerson ? `${pkg.price} PLN/os.` : `${pkg.price} PLN`}
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Contact Form */}
                <div className="space-y-6">
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle>Dane kontaktowe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imię</FormLabel>
                              <FormControl>
                                <Input placeholder="Jan" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nazwisko</FormLabel>
                              <FormControl>
                                <Input placeholder="Kowalski" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jan.kowalski@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="+48 123 456 789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uwagi (opcjonalne)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Dodatkowe informacje lub specjalne życzenia..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Payment Details Card */}
                  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle>Dane Płatności (PayU Secure Fields)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="payu-card-number">Numer karty</Label>
                        <div id="payu-card-number" className="payu-secure-field h-10 p-2 border rounded-md mt-1"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="payu-card-expiry">Data ważności (MM/RR)</Label>
                          <div id="payu-card-expiry" className="payu-secure-field h-10 p-2 border rounded-md mt-1"></div>
                        </div>
                        <div>
                          <Label htmlFor="payu-card-cvv">CVV</Label>
                          <div id="payu-card-cvv" className="payu-secure-field h-10 p-2 border rounded-md mt-1"></div>
                        </div>
                      </div>
                      <div id="payu-sf-status" className="text-sm text-red-500"></div>
                    </CardContent>
                  </Card>

                  {/* Summary and Payment */}
                  <Card className="bg-gradient-accent text-background shadow-glow">
                    <CardHeader>
                      <CardTitle>Podsumowanie zamówienia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedPackage && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Pakiet:</span>
                            <span className="font-semibold">{getSelectedPackageDetails()?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cena:</span>
                            <span className="font-bold text-lg">{getSelectedPackagePrice()}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-background/20">
                        <Button 
                          type="submit"
                          size="lg"
                          className="w-full bg-background text-foreground hover:bg-background/90"
                          disabled={!selectedPackage || isProcessingPayment || !payuSecureFieldsRef.current || !!payuError}
                        >
                          {isProcessingPayment ? "Przetwarzanie..." : "PRZEJDŹ DO PŁATNOŚCI PAYU"}
                        </Button>
                        {payuError && <p className="text-sm text-red-400 mt-2 text-center">{payuError}</p>}
                      </div>
                      
                      <div className="text-center text-sm opacity-90">
                        <p>Bezpieczne płatności przez PayU</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Phone className="w-4 h-4" />
                          <span>Lub zadzwoń: +48 787 975 999</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;