import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Ticket, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { insertLeadSchema } from "@shared/schema";

const checkoutSchema = insertLeadSchema.extend({
  couponCode: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: string;
    name: string;
    price: string;
    description: string;
  };
}

// Workers URL
const WORKER_URL = "https://vibrant-counselor-api.gauravgoodreads.workers.dev"; 

export function CheckoutDialog({ isOpen, onClose, plan }: CheckoutDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [discount, setDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: `Order: ${plan.name}`,
      message: `Enrolled in ${plan.name}`,
      couponCode: "",
    },
  });

  const basePrice = parseInt(plan.price.replace(/\D/g, ""));
  const finalPrice = discount 
    ? Math.round(basePrice * (1 - discount.percent / 100)) 
    : basePrice;

  const handleValidateCoupon = async () => {
    const code = form.getValues("couponCode");
    if (!code) return;

    setIsValidatingCoupon(true);
    try {
      const resp = await fetch(`${WORKER_URL}/api/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponCode: code }),
      });
      
      const data = await resp.json();
      if (data.valid) {
        setDiscount({ code, percent: data.discount });
        toast({
          title: "Coupon Applied!",
          description: `${data.discount}% discount has been added.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Coupon",
          description: "This coupon code is not valid.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to validate coupon.",
      });
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const onSubmit = async (values: CheckoutValues) => {
    setIsProcessing(true);
    try {
      // 1. Save Lead Info first
      await fetch(`${WORKER_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // 2. Create Razorpay Order
      const orderResp = await fetch(`${WORKER_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          couponCode: discount?.code,
        }),
      });

      const order = await orderResp.json();

      if (!order.id) throw new Error("Failed to create order");

      // 3. Open Razorpay Modal
      const options = {
        key: "rzp_live_ZDRBsLXKmZI6Gu", // Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Vibrant Counselor",
        description: `Enrollment for ${plan.name}`,
        order_id: order.id,
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: "#7C3AED", // Primary purple
        },
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}. We will contact you shortly.`,
          });
          onClose();
          form.reset();
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "Something went wrong. Please try again or contact support.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-950 p-0 overflow-hidden border-border shadow-2xl">
        <div className="bg-gradient-purple-pink h-2 w-full" />
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Secure Checkout</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Complete your enrollment for <span className="text-primary font-bold">{plan.name}</span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ankit Sharma" {...field} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium focus:ring-primary focus:border-primary placeholder:text-slate-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="ankit@email.com" type="email" {...field} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium focus:ring-primary focus:border-primary placeholder:text-slate-400" />
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
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98XXX XXXXX" {...field} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium focus:ring-primary focus:border-primary placeholder:text-slate-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">Coupon Code</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="couponCode"
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Enter code" {...field} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium uppercase focus:ring-primary focus:border-primary placeholder:text-slate-400" />
                      </FormControl>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 font-bold"
                    disabled={isValidatingCoupon || !form.watch("couponCode")}
                    onClick={handleValidateCoupon}
                  >
                    {isValidatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </Button>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl space-y-2 my-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Base Price:</span>
                  <span className="font-semibold line-through opacity-50 dark:text-white">₹{basePrice.toLocaleString()}</span>
                </div>
                {discount && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-bold">
                    <span className="flex items-center gap-1"><Ticket size={14} /> Discount ({discount.percent}%):</span>
                    <span>-₹{(basePrice - finalPrice).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Total Amount:</span>
                  <span className="text-2xl font-black text-primary">₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary text-lg font-bold glow-purple shadow-xl"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Finalizing Order...</>
                  ) : (
                    <><CreditCard className="mr-2 h-5 w-5" /> Pay Now Securely</>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={14} className="text-green-500" />
                  Payments secured by Razorpay
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
