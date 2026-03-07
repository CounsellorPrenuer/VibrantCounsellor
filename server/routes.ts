import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // No API routes needed - this is a static informational website
  // All contact actions use external links (phone, email, WhatsApp)

  const httpServer = createServer(app);

  return httpServer;
}
