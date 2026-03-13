
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hat5anx4",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-07",
  token: "sklcTKbzL9k1UuHkDJ8t22eMV9AioNweijTuq4861BKblWcbuSrLTQVEo7m3yi0gAekqNeN8PrXBvxZuSDoxpVl7CHctVAsbnscm3cowtUQNcHJmSHwlHcDJI6BJXYsBqqiQkXiFoo9EWdOcFN0UlDJ6Vc1wxUV7XT8doLaKJlHuFtqVk2WD",
});

async function check() {
  const plans = await client.fetch(`*[_type == "plan"]`);
  console.log("Total Plans:", plans.length);
  plans.forEach(p => {
    if (p.name?.includes("General") || p.category?.includes("General") || p.subgroup?.includes("General")) {
      console.log("Found General Plan:", p);
    }
  });
  
  const subgroups = Array.from(new Set(plans.map(p => p.subgroup || "General")));
  console.log("Available Subgroups:", subgroups);
}

check();
