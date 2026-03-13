import { useRef, useEffect, useState } from "react";
import { Check, Loader2, ChevronRight, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "./CheckoutDialog";

interface Plan {
  name: string;
  price?: string;
  priceStudent?: string;
  priceProfessional?: string;
  description: string;
  buttonId: string;
  features: string[];
  gradient: string;
  popular?: boolean;
  category?: string;
  subgroup?: string;
}

// A wrapper component to inject script safely for Razorpay forms
function RazorpayButton({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && formRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", id);
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, [id]);

  // Handle string-based IDs for custom packages (redirect to contact if no real Razorpay ID)
  const isRealRazorpayId = id.startsWith("pl_");

  if (!isRealRazorpayId) {
    return (
      <Button 
        className="mt-6 w-full bg-primary hover:bg-primary/90 text-white"
        onClick={() => window.location.href = "/contact?service=" + encodeURIComponent(id)}
      >
        Inquire Now
      </Button>
    );
  }

  return <form ref={formRef} className="mt-6 flex justify-center"></form>;
}

export function PricingSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [activeTab, setActiveTab] = useState<"standard" | "custom">("standard");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { data: plans, isLoading, error } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
    queryFn: () => client.fetch(`*[_type == "plan"] | order(order asc)`),
  });

  const standardPlans = plans?.filter(p => p.category === "standard" || !p.category) || [];
  const customPlans = plans?.filter(p => p.category === "custom") || [];

  // Grouping standard plans by subgroup
  const subgroups = Array.from(new Set(standardPlans.map(p => p.subgroup).filter(Boolean))) as string[];
  const [activeSubgroup, setActiveSubgroup] = useState<string>("");

  useEffect(() => {
    if (subgroups.length > 0 && !activeSubgroup) {
      setActiveSubgroup(subgroups[0]);
    }
  }, [subgroups, activeSubgroup]);

  return (
    <section id="pricing" ref={ref as any} className="relative py-24 lg:py-32 bg-background">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-7xl font-serif font-black mb-6 text-primary">
            Mentoria Packages
          </h2>
          <p className="text-xl font-medium text-slate-500 max-w-2xl mx-auto italic">
            Choose the right Mentoria plan for your career growth
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab("standard")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "standard" ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
            >
              Standard Packages
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "custom" ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
            >
              Customizable Plans
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load pricing plans. Please try again later.
          </div>
        ) : (
          <div className="space-y-20">
            {activeTab === "standard" ? (
              <div className="space-y-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {subgroups.map((group) => (
                    <Button
                      key={group}
                      variant={"outline"}
                      className={`rounded-full px-8 h-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                        activeSubgroup === group 
                          ? 'bg-primary text-white border-primary shadow-xl scale-105' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-primary/30 hover:text-primary shadow-sm'
                      }`}
                      onClick={() => setActiveSubgroup(group)}
                    >
                      {group}
                    </Button>
                  ))}
                </div>

                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="flex items-center gap-4 max-w-5xl mx-auto px-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
                    <span className="text-slate-300 font-serif italic text-lg px-4">Showing Plans for</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
                    {standardPlans
                      .filter(p => p.subgroup === activeSubgroup)
                      .map((plan, index) => (
                        <Card
                          key={index}
                          className={`relative p-10 bg-white border-border shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl flex flex-col group ${plan.popular ? 'ring-2 ring-primary border-primary/20' : ''}`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00A884] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                              <Info size={12} fill="white" /> POPULAR
                            </div>
                          )}
                          <div className="mb-8">
                            <h3 className="text-3xl font-serif font-black text-primary mb-1">{plan.name}</h3>
                            <p className="text-sm font-medium text-slate-400 mb-6 tracking-wide">Mentoria</p>
                            
                            <div className="flex items-baseline perfect-nums mb-4">
                              <span className="text-5xl font-black text-slate-900 leading-none">
                                {((activeSubgroup === "PROFESSIONALS" 
                                  ? (plan.priceProfessional || plan.price) 
                                  : (plan.priceStudent || plan.price)) || "").includes("₹") ? "" : "₹"}
                                {activeSubgroup === "PROFESSIONALS" 
                                  ? (plan.priceProfessional || plan.price) 
                                  : (plan.priceStudent || plan.price)}
                              </span>
                            </div>
                            <p className="text-slate-500 leading-relaxed font-medium">{plan.description}</p>
                          </div>

                          <div className="flex-1 space-y-4 mb-10">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-300">Features:</p>
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className="rounded-full bg-emerald-100 p-0.5 mt-0.5">
                                  <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="text-sm text-slate-600 font-medium leading-tight">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto">
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl text-lg shadow-lg hover:shadow-primary/20 transition-all active:scale-95 group-hover:scale-[1.02] duration-300"
                              onClick={() => setSelectedPlan(plan)}
                            >
                              Book Now
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Want To Customise Your Mentorship Plan?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {customPlans.map((plan, index) => (
                    <Card
                      key={index}
                      className="p-8 bg-white border-border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col rounded-2xl group border-slate-100"
                    >
                      <div className="mb-6">
                        <h4 className="text-xl font-serif font-black text-primary mb-2 leading-tight">{plan.name}</h4>
                        <span className="text-3xl font-serif font-black text-slate-900">{plan.price}</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-8 flex-1 italic leading-relaxed">
                        {plan.description}
                      </p>
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl shadow-md hover:shadow-primary/20 transition-all active:scale-95 duration-200"
                          onClick={() => setSelectedPlan(plan)}
                        >
                          Book Now
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full text-slate-400 hover:text-primary p-0 h-auto text-xs font-bold uppercase tracking-widest opacity-80"
                          onClick={() => window.location.href = `/contact?service=${encodeURIComponent(plan.name)}`}
                        >
                          Inquire Details <ChevronRight className="ml-1 w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="p-8 bg-slate-50 border-2 border-slate-100 flex flex-col md:flex-row items-center gap-8 mt-12 rounded-3xl overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Info className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl font-serif font-black text-slate-900 mb-2">Not sure which one to pick?</h4>
                    <p className="text-slate-500 font-medium">Contact our experts for a personalized recommendation based on your unique goals and challenges.</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 rounded-2xl shadow-xl hover:shadow-primary/30 transition-all active:scale-95 duration-300 grow-0 shrink-0"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Free Consultation
                  </Button>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedPlan && (
        <CheckoutDialog 
          isOpen={!!selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
          plan={{
            id: selectedPlan.buttonId,
            name: selectedPlan.name,
            price: selectedPlan.price || (activeSubgroup === "PROFESSIONALS" ? selectedPlan.priceProfessional : selectedPlan.priceStudent) || "",
            description: selectedPlan.description
          }}
        />
      )}
    </section>
  );
}
