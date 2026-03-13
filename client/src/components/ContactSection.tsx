import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, MessageCircle, Calendar, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { toast } from "@/hooks/use-toast";
import { insertLeadSchema, type InsertLead } from "@shared/schema";

const formSchema = insertLeadSchema;

interface GlobalSettings {
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  contactWebsite: string;
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: settings, isLoading } = useQuery<GlobalSettings>({
    queryKey: ["/api/settings"],
    queryFn: () => client.fetch(`*[_id == "global-settings"][0]`),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const saveLead = async (data: InsertLead) => {
    try {
      // Use the same worker URL as checkout
      const WORKER_URL = "https://vibrant-counselor-api.gauravgoodreads.workers.dev"; 
      
      const response = await fetch(`${WORKER_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Worker lead save failed");
      console.log("Lead saved successfully to database");
    } catch (error) {
      // Silently fail lead saving to not block the user's primary intent (email)
      console.error("Non-blocking failure to save lead:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    toast({
      title: "Processing Inquiry",
      description: "Saving your details and preparing your email...",
    });

    // 1. Save lead in background
    await saveLead(values);

    try {
      // 2. Prepare and trigger mailto
      const subject = encodeURIComponent(`Consultation Request: ${values.subject}`);
      const body = encodeURIComponent(
        `Hello,\n\nI have a new inquiry from counselorsedu.com:\n\n` +
        `Name: ${values.name}\n` +
        `Email: ${values.email}\n` +
        `Phone: ${values.phone}\n\n` +
        `Message:\n${values.message}\n\n` +
        `---\nCaptured via Lead Management System`
      );
      
      const destEmail = settings?.contactEmail || "counselor963@gmail.com";
      const mailtoLink = `mailto:${destEmail}?subject=${subject}&body=${body}`;

      // Cross-browser reliable redirect
      window.location.href = mailtoLink;

      toast({
        title: "Redirecting...",
        description: "Opening your email client to send the inquiry.",
      });

      // Reset after redirect
      setTimeout(() => {
        setIsSubmitting(false);
        form.reset();
      }, 1000);

    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Action Required",
        description: "Redirect failed. Please email us at " + (settings?.contactEmail || "counselor963@gmail.com"),
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: settings?.contactLocation || "Punjab, India",
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings?.contactPhone || "+91 9815299446",
      link: `tel:${settings?.contactPhone?.replace(/\s+/g, "") || "+919815299446"}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings?.contactEmail || "counselor963@gmail.com",
      link: `mailto:${settings?.contactEmail || "counselor963@gmail.com"}`,
    },
    {
      icon: Globe,
      label: "Website",
      value: settings?.contactWebsite || "counselorsedu.com",
      link: settings?.contactWebsite ? (settings.contactWebsite.startsWith("http") ? settings.contactWebsite : `https://${settings.contactWebsite}`) : "https://counselorsedu.com",
    },
  ];

  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber.replace(/\+/g, "")}`
    : "https://wa.me/919815299446";

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-pink">Get in Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to take the first step towards a clear and confident future? 
            Let's connect — your journey to clarity begins here.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="p-6 glass hover-elevate transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-purple-teal rounded-lg shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 glass">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-purple-pink text-white text-lg glow-purple-hover"
                  onClick={() => window.open(`tel:${settings?.contactPhone?.replace(/\s+/g, "") || "+919815299446"}`, "_blank")}
                >
                  <Calendar className="mr-2" size={20} />
                  Book a Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full glass border-white/30 text-lg"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp
                </Button>
              </div>
            </Card>
          </div>

          <Card className="p-8 glass">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="glass" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="glass" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98XXX XXXXX" {...field} className="glass" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Inquiry about..." {...field} className="glass" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your goals..." 
                          className="min-h-[150px] glass" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-purple-teal text-white text-lg glow-purple-hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing...</>
                  ) : (
                    <><Send className="mr-2 h-5 w-5" /> Send Message</>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
