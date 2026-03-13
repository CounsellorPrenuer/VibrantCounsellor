
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hat5anx4",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-07",
  token: "sklcTKbzL9k1UuHkDJ8t22eMV9AioNweijTuq4861BKblWcbuSrLTQVEo7m3yi0gAekqNeN8PrXBvxZuSDoxpVl7CHctVAsbnscm3cowtUQNcHJmSHwlHcDJI6BJXYsBqqiQkXiFoo9EWdOcFN0UlDJ6Vc1wxUV7XT8doLaKJlHuFtqVk2WD",
});

async function addCors() {
  const origins = [
    "https://CounsellorPrenuer.github.io",
    "https://counsellorprenuer.github.io",
    "http://localhost:5173"
  ];

  console.log("Attempting to add CORS origins via Sanity Management API...");

  for (const origin of origins) {
    try {
      // Correct endpoint based on Sanity CLI behavior: /v1/projects/<id>/cors
      const url = `https://api.sanity.io/v1/projects/hat5anx4/cors`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${client.config().token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          origin,
          allowCredentials: true
        })
      });

      const data = await response.text();
      
      if (response.ok) {
        console.log(`✅ Success: Added ${origin}`);
      } else {
        console.error(`❌ Failed: ${origin}. Status: ${response.status}. Response: ${data}`);
      }
    } catch (err) {
      console.error(`❌ Error adding ${origin}:`, err);
    }
  }
}

addCors();
