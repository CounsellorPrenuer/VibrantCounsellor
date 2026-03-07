
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hat5anx4",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-07",
});

async function verify() {
  console.log("Checking Sanity data...");
  try {
    const settings = await client.fetch('*[_type == "settings"][0]');
    console.log("Settings found:", settings ? "Yes" : "No");
    
    const plans = await client.fetch('*[_type == "plan"]');
    console.log("Plans found:", plans.length);
    
    const stats = await client.fetch('*[_type == "stat"]');
    console.log("Stats found:", stats.length);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

verify();
