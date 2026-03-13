export interface Env {
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  // DB: D1Database; // Future: Add D1 here
}

const COUPONS: Record<string, number> = {
  "WELCOME10": 10,
  "MENTORIA20": 20,
  "DISCOVERY50": 50,
};

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/api/create-order" && request.method === "POST") {
        const body: any = await request.json();
        const { amount, currency, receipt, couponCode } = body;

        let finalAmount = amount;
        if (couponCode && COUPONS[couponCode.toUpperCase()]) {
          const discount = COUPONS[couponCode.toUpperCase()];
          finalAmount = Math.round(amount * (1 - discount / 100));
        }

        // Razorpay Order Creation
        const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
        const response = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount * 100, // Razorpay expects paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
          }),
        });

        const orderData = await response.json();
        return new Response(JSON.stringify({ ...orderData, discountApplied: finalAmount < amount }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (url.pathname === "/api/validate-coupon" && request.method === "POST") {
        const { couponCode } = await request.json() as any;
        const discount = COUPONS[couponCode?.toUpperCase()];
        
        if (discount) {
          return new Response(JSON.stringify({ valid: true, discount }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ valid: false }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (url.pathname === "/api/sanity" && request.method === "GET") {
        const query = url.searchParams.get("query");
        const paramsStr = url.searchParams.get("params");
        if (!query) return new Response("Query missing", { status: 400, headers: corsHeaders });

        const projectId = "hat5anx4";
        const dataset = "production";
        let sanityUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${encodeURIComponent(query)}`;
        
        if (paramsStr) {
          const params = JSON.parse(paramsStr);
          for (const [key, value] of Object.entries(params)) {
            sanityUrl += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
          }
        }

        const response = await fetch(sanityUrl);
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (url.pathname === "/api/leads" && request.method === "POST") {
        const leadData = await request.json();
        console.log("New Lead Received:", leadData);
        
        // Future: Save to D1 database
        // await env.DB.prepare("INSERT INTO leads (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)")
        //   .bind(leadData.name, leadData.email, leadData.phone, leadData.subject, leadData.message).run();

        return new Response(JSON.stringify({ success: true, message: "Lead saved" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
