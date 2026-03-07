import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hat5anx4",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-07",
  token: "sklcTKbzL9k1UuHkDJ8t22eMV9AioNweijTuq4861BKblWcbuSrLTQVEo7m3yi0gAekqNeN8PrXBvxZuSDoxpVl7CHctVAsbnscm3cowtUQNcHJmSHwlHcDJI6BJXYsBqqiQkXiFoo9EWdOcFN0UlDJ6Vc1wxUV7XT8doLaKJlHuFtqVk2WD",
});

async function populate() {
  console.log("Starting Sanity population...");

  const globalSettings = {
    _type: "settings",
    _id: "global-settings",
    whatsappNumber: "+919815299446",
    contactPhone: "+91 9815299446",
    contactEmail: "counselor963@gmail.com",
    contactLocation: "Punjab, India",
    contactWebsite: "counselorsedu.com",
    facebookLink: "https://facebook.com/counselorprenuer",
    instagramLink: "https://instagram.com/counselorprenuer",
    heroTitle: "Empowering Futures with Clarity, Confidence, and Compassion",
    heroSubtitle: "Personalized career guidance and educational counseling by Manpreet Kaur, helping students and professionals discover direction and purpose.",
  };

  const plans = [
    // Standard Mentoria Packages
    {
      _type: "plan",
      name: "Discover",
      price: "₹5,500",
      description: "Ideal for 8-9 Students. Psychometric assessment and 1 career counselling session.",
      buttonId: "pl_RwDuOx96VYrsyN",
      features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"],
      gradient: "from-blue-500 to-cyan-500",
      category: "standard",
      subgroup: "8-9 Students",
      order: 1
    },
    {
      _type: "plan",
      name: "Discover Plus+",
      price: "₹15,000",
      description: "Comprehensive guidance for 8-9 Students (8 sessions, 1/year).",
      buttonId: "pl_RwDq8XpK76OhB3",
      features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"],
      gradient: "from-blue-600 to-purple-600",
      category: "standard",
      subgroup: "8-9 Students",
      order: 2
    },
    {
      _type: "plan",
      name: "Achieve Online",
      price: "₹5,999",
      description: "For 10-12 Students seeking clear career direction.",
      buttonId: "pl_RwDxvLPQP7j4rG",
      features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      gradient: "from-purple-500 to-pink-500",
      category: "standard",
      subgroup: "10-12 Students",
      order: 3
    },
    {
      _type: "plan",
      name: "Achieve Plus+",
      price: "₹10,599",
      description: "In-depth support for 10-12 Students with 4 sessions.",
      buttonId: "pl_RwDzfVkQYEdAIf",
      features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"],
      gradient: "from-pink-500 to-rose-500",
      category: "standard",
      subgroup: "10-12 Students",
      order: 4
    },
    {
      _type: "plan",
      name: "Ascend Online",
      price: "₹6,499",
      description: "Digital guidance for Graduates to shortlist career paths.",
      buttonId: "pl_RwE1evNHrHWJDW",
      features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      gradient: "from-teal-500 to-emerald-500",
      category: "standard",
      subgroup: "Graduates",
      order: 5
    },
    {
      _type: "plan",
      name: "Ascend Plus+",
      price: "₹10,599",
      description: "Professional pathing for Graduates with 3 sessions.",
      buttonId: "pl_RwE3WEILWB9WeJ",
      features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"],
      gradient: "from-emerald-600 to-teal-700",
      category: "standard",
      subgroup: "Graduates",
      order: 6
    },
    {
      _type: "plan",
      name: "Ascend Online (Pro)",
      price: "₹6,499",
      description: "Career growth strategy for Working Professionals.",
      buttonId: "mp-3",
      features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"],
      gradient: "from-orange-500 to-amber-500",
      category: "standard",
      subgroup: "Working Professionals",
      order: 7
    },
    {
      _type: "plan",
      name: "Ascend Plus+ (Pro)",
      price: "₹10,599",
      description: "Advanced career strategy for Working Professionals with 3 sessions.",
      buttonId: "mp-2",
      features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"],
      gradient: "from-amber-600 to-orange-700",
      category: "standard",
      subgroup: "Working Professionals",
      order: 8
    },
    // Customizable Mentorship Plans
    {
      _type: "plan",
      name: "Career Report",
      price: "₹1,500",
      description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests.",
      buttonId: "career-report",
      features: ["Psychometric assessment", "Detailed interest report", "Scientific analysis"],
      gradient: "from-gray-700 to-gray-900",
      category: "custom",
      order: 9
    },
    {
      _type: "plan",
      name: "College Admission Planning",
      price: "₹3,000",
      description: "Get unbiased recommendations and details on your future college options in India and abroad.",
      buttonId: "college-admission-planning",
      features: ["University shortlisting", "Resourceful planner", "India & Abroad options"],
      gradient: "from-pink-500 to-purple-500",
      category: "custom",
      order: 10
    }
  ];

  const stats = [
    { _type: "stat", value: "23", label: "Years of Career Counseling Experience", suffix: "+", order: 1 },
    { _type: "stat", value: "10000", label: "Students & Professionals Guided", suffix: "+", order: 2 },
    { _type: "stat", value: "100", label: "Workshops Conducted", suffix: "+", order: 3 },
    { _type: "stat", value: "99", label: "Client Satisfaction Rate", suffix: "%", order: 4 },
  ];

  const testimonials = [
    {
      _type: "testimonial",
      quote: "After meeting Manpreet Ma'am, my son understood what career truly suits his abilities. Her approach is professional yet deeply personal.",
      author: "Parent",
      role: "Parent of Student",
      location: "Amritsar",
      order: 1
    }
  ];

  const credentials = [
    { _type: "credential", title: "Certified Professional", description: "IAAP, APCDA, GCDA Certified Career Counselor", icon: "Award", order: 1 },
    { _type: "credential", title: "ICEF Graduate", description: "US Course Graduate (USCG 598)", icon: "GraduationCap", order: 2 },
    { _type: "credential", title: "Experienced Educator", description: "Teaching & Training from GNDU", icon: "Users", order: 3 },
    { _type: "credential", title: "NGO Founder", description: "Supporting underprivileged girls' education", icon: "Heart", order: 4 },
  ];

  try {
    // CLEANUP STRAY PLANS
    console.log("Cleaning up old plans...");
    await client.delete({ query: '*[_type == "plan"]' });
    
    // Population
    await client.createOrReplace(globalSettings);
    console.log("Global Settings updated.");

    for (const plan of plans) {
      await client.createOrReplace({
        _id: `plan-${(plan.buttonId || plan.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        ...plan
      } as any);
    }
    console.log("Plans updated.");

    for (const stat of stats) {
      await client.createOrReplace({
        _id: `stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        ...stat
      });
    }

    for (const credential of credentials) {
      await client.createOrReplace({
        _id: `credential-${credential.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        ...credential
      });
    }

    console.log("Population complete!");
  } catch (error) {
    console.error("Population failed:", error);
  }
}

populate();
