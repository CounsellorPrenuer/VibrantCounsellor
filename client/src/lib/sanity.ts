import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Cloudflare Worker URL for proxying Sanity requests
const WORKER_URL = "https://vibrant-counselor-api.gauravgoodreads.workers.dev";

const sanityClient = createClient({
  projectId: "hat5anx4",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-07",
});

// Proxy fetcher to avoid CORS issues on GitHub Pages
export const client = {
  ...sanityClient,
  fetch: async (query: string, params: any = {}) => {
    const url = new URL(`${WORKER_URL}/api/sanity`);
    url.searchParams.set("query", query);
    if (Object.keys(params).length > 0) {
      url.searchParams.set("params", JSON.stringify(params));
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Sanity Proxy Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.result;
  }
};

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
