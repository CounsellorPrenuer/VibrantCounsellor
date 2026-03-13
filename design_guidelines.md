# Design Guidelines: Counselors by Manpreet Kaur

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium educational platforms like Mentoria, Coursera, and modern SaaS landing pages that combine professionalism with warmth. The design balances inviting aesthetics with credibility through glassmorphism and vibrant gradients.

## Core Design Elements

### A. Color Palette

**Brand Colors (from logo analysis)**:
- Primary: 280 65% 55% (Purple) - Trust, wisdom, guidance
- Secondary: 200 70% 50% (Teal/Cyan) - Clarity, growth, future
- Accent: 340 80% 60% (Pink/Magenta) - Compassion, empowerment

**Gradients**:
- Hero Background: Animated gradient transitioning between purple → teal → pink
- Text Gradients: Purple to teal for headings (bg-clip-text)
- Button Gradients: Purple to pink with glow effects
- Card Overlays: Glassmorphic white with 10-20% opacity

**Dark Mode**: Not required for this counseling website

### B. Typography
**Font Family**: Raleway (Google Fonts)
- Headings: Raleway Bold/ExtraBold (700-800)
- Subheadings: Raleway SemiBold (600)
- Body: Raleway Regular/Medium (400-500)
- CTA Buttons: Raleway Bold (700)

**Hierarchy**:
- Hero Headline: 3.5rem-4rem with gradient text effect
- Section Titles: 2.5rem-3rem 
- Card Headings: 1.5rem
- Body Text: 1rem-1.125rem with generous line-height (1.7)

### C. Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section Padding: py-20 to py-32 desktop, py-12 mobile
- Card Spacing: p-6 to p-8
- Element Gaps: gap-4, gap-6, gap-8

**Containers**:
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl
- Text content: max-w-4xl for readability

### D. Component Library

**Navigation**:
- Glassy navbar with backdrop-blur-lg, bg-white/10
- Sticky positioning with smooth shadow on scroll
- Hover underline animation (scale-x transition from 0 to 1)
- Logo placement on left, CTA button on right

**Hero Section**:
- Full viewport height (min-h-screen)
- Animated gradient background with slow color transitions
- Floating/parallax decorative shapes (circles, blobs)
- Mouse-follow glow effect using CSS custom properties
- Profile image: Circular frame with gradient border, positioned right side desktop, centered mobile
- Gradient headline with text-transparent bg-clip-text
- Two prominent CTAs: "Book Free Consultation" (gradient fill + glow) and "Chat on WhatsApp" (outline with blur backdrop)

**Cards (Services, Testimonials, How It Works)**:
- Glassmorphism: backdrop-blur-lg, bg-white/10, border border-white/20
- Soft shadows: shadow-lg to shadow-2xl
- Hover Effects: 
  - Lift transform: -translate-y-2
  - Shadow increase: shadow-2xl to shadow-3xl
  - Subtle color shift: gradient overlay opacity change
  - Smooth transition-all duration-300

**Buttons**:
- Primary: Gradient background (purple to pink) with glow effect (box-shadow with brand colors)
- Hover: Lift effect (translate-y-1), increased glow intensity
- Outline: Backdrop blur, border with gradient, hover fills with gradient
- Padding: px-8 py-3 to px-10 py-4

**Stats/Numbers Section**:
- Large numerical displays with gradient text
- Grid layout: 4 columns desktop, 2 columns tablet, 1 column mobile
- Animated counters on scroll into view
- Icons or decorative elements above numbers

**Testimonial Cards**:
- Glassmorphic design with subtle gradient borders
- Quote styling with decorative quotation marks
- Client info with small circular avatars (placeholder)
- Star ratings with gradient fills
- Carousel navigation with gradient dot indicators

**Mentoria Partnership Section**:
- Two-column layout: Content left, stats grid right
- Mentoria logo prominent placement
- Stats in glassmorphic mini-cards with gradient accents
- Subtle "Explore Mentoria" link with arrow animation

**Contact Section**:
- Two-column: Contact info left, CTA buttons right (stack on mobile)
- Contact details with icons (location, phone, email, website)
- Large gradient buttons with glow and hover lift
- Background: Subtle gradient overlay

**Footer**:
- Multi-column layout with logo, quick links, social icons
- Glassmorphic top border
- Mentoria partnership acknowledgment
- Copyright with heart emoji accent

### E. Animations & Effects

**Scroll Animations**:
- Fade-in with slight upward movement for sections
- Stagger animations for card grids (delay each by 100ms)
- Trigger at 80% viewport visibility

**Hover Interactions**:
- Cards: Lift + shadow + gradient overlay opacity change
- Buttons: Lift + glow intensity increase
- Links: Underline slide animation
- Images: Slight scale (1.05) with smooth transition

**Background Effects**:
- Animated gradient: 10-15s linear infinite alternate
- Floating shapes: Slow parallax movement on scroll
- Mouse-follow glow: Radial gradient following cursor in hero (opacity 0.15-0.25)

**Page Transitions**:
- Smooth scroll behavior
- Section fade-ins with intersection observer
- No jarring animations - keep subtle and professional

## Images

**Hero Image**: Professional portrait of Manpreet Kaur
- Placement: Right side on desktop (40% width), centered on mobile
- Treatment: Circular frame with animated gradient border (rotating glow effect)
- Background: Integrated into gradient hero with floating shapes around

**Service Icons**: Use Heroicons for service categories
- Style: Gradient fills matching brand colors
- Placement: Above service card titles

**Decorative Elements**:
- Floating abstract shapes in hero (circles, blobs with gradient fills)
- Subtle pattern overlays in sections (dots or grid at 5% opacity)

**Mentoria Logo**: Partner logo in collaboration section
- Size: Medium (150-200px width)
- Placement: Centered in dedicated partnership section

## Accessibility & Polish

- Maintain WCAG AA contrast ratios (test gradient text carefully)
- Ensure all interactive elements have visible focus states with gradient outlines
- Animations respect prefers-reduced-motion
- Touch targets minimum 44x44px
- Alt text for all images including decorative hero shapes

## Responsive Behavior

**Breakpoints**:
- Mobile: < 640px (single column, stacked cards)
- Tablet: 640px-1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

**Key Adjustments**:
- Hero: Profile image moves from right to center on mobile
- Stats: 4→2→1 column grid
- Services/How It Works: 3→2→1 card grid
- Navigation: Hamburger menu on mobile with slide-in glassmorphic panel
- Reduce animation intensity on mobile for performance

This design creates a premium, trustworthy experience that balances professional credibility with warmth and approachability - perfect for a career counseling service.