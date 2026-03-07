# Counselors by Manpreet Kaur

## Overview

A professional career counseling and educational guidance website for Manpreet Kaur, a certified career counselor with 23+ years of experience. The platform serves as an informational website showcasing services, credentials, and contact information for students, parents, and professionals seeking career guidance. Built as a static website with modern UI components, it emphasizes visual appeal through gradient designs, glassmorphic effects, and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool and dev server
- Wouter for client-side routing
- TanStack React Query for state management
- Tailwind CSS for styling with custom design system

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component system (New York style variant)
- Custom component aliases via path mapping (@/components, @/lib, @/hooks)

**Design System:**
- Color palette: Purple (primary), Teal/Cyan (secondary), Pink/Magenta (accent)
- Typography: Raleway font family from Google Fonts
- Visual effects: Gradient backgrounds, glassmorphic cards, glow effects, animated gradients
- Responsive design with mobile-first approach
- Light mode only (dark mode explicitly not required per design guidelines)

**Component Structure:**
- Single-page application (SPA) with section-based layout
- Modular components: Navbar, Hero, About, Services, Impact, Testimonials, How It Works, Why Choose, Mentoria Integration, Contact, Footer
- Custom hooks for scroll animations and mobile detection
- Intersection Observer API for reveal animations

### Backend Architecture

**Server Setup:**
- Express.js server with TypeScript
- Minimal API surface - primarily serves static content
- No authentication or session management required
- Development mode uses Vite middleware for HMR

**Rationale:**
This is a static informational website with no dynamic backend requirements. All contact actions (phone, email, WhatsApp) link directly to external services. The Express server mainly handles static file serving and development tooling.

### Data Storage

**Database Configuration:**
- Drizzle ORM configured with PostgreSQL dialect
- Database schemas intentionally left empty (shared/schema.ts)
- No data persistence layer needed for current requirements

**Rationale:**
The website displays static content with no user-generated data, form submissions, or dynamic content management. All information is hardcoded in React components. Database infrastructure is configured but unused, allowing for future expansion if needed.

## External Dependencies

### Third-Party Services

**Google Fonts:**
- Raleway font family for typography
- Loaded via preconnect for performance optimization

**Contact Integrations:**
- Direct phone links (tel:+919815299446)
- Direct email links (mailto:counselor963@gmail.com)
- WhatsApp web integration for messaging
- No backend processing required

### Development Tools

**Replit Integrations:**
- @replit/vite-plugin-runtime-error-modal for error overlays
- @replit/vite-plugin-cartographer for development mapping
- @replit/vite-plugin-dev-banner for dev environment indication

**Build & Development:**
- esbuild for server bundling
- Vite for client bundling and dev server
- drizzle-kit for potential database migrations
- PostCSS with Tailwind and Autoprefixer

### UI Libraries

**Core Dependencies:**
- 25+ Radix UI components (@radix-ui/react-*)
- class-variance-authority for component variants
- tailwind-merge and clsx for className utilities
- cmdk for command menu functionality
- embla-carousel-react for carousel components
- lucide-react for icon system

**Form Handling:**
- react-hook-form with @hookform/resolvers
- Zod validation via drizzle-zod
- Date handling with date-fns

### Database Connection

**Neon Serverless PostgreSQL:**
- @neondatabase/serverless for database connectivity
- connect-pg-simple for session store (configured but unused)
- Connection string via DATABASE_URL environment variable

**Note:**
While Drizzle and PostgreSQL are configured, the current application requires no database. This infrastructure supports future features like blog posts, testimonials management, or contact form submissions if needed.