# Implementation Plan - Roshan Kayastha's Portfolio Website

We will create a premium, modern, highly interactive, and responsive portfolio website for **Roshan Kayastha** using native HTML5, modern CSS, and JavaScript. The site will feature a sleek dark/light mode toggle, dynamic scroll animations, project filters, a working contact form, and high-fidelity custom visual assets.

---

## User Review Required

> [!IMPORTANT]
> - **Theme & Color Scheme:** We will implement a deep slate dark mode by default (`#0b0f19` background) with glowing neon indigo/violet gradients (`#6366f1` to `#a855f7`), and a light mode toggle. Please let us know if you prefer a different color palette.
> - **Sections proposed:**
>   1. **Navbar** - Sticky, glassmorphism design with auto-highlighting links.
>   2. **Hero** - Headline, typed role animation, call to action, and interactive layout.
>   3. **About Me** - Introduction and a timeline of experiences/education.
>   4. **Skills Showcase** - Categorized skills (Frontend, Backend, Mobile, Tools) with modern interactive cards.
>   5. **Projects Grid** - Filterable category grid with hover effects and detailed modals.
>   6. **Contact Form** - A sleek form with validation, social links, and success feedback.
> - **Custom Assets:** We will use SVGs and generate high-quality abstract tech illustrations using the `generate_image` tool to represent projects and visual elements.

---

## Open Questions

> [!NOTE]
> 1. Do you have a specific specialization or title you'd like to feature on the website (e.g., Full Stack Developer, UI/UX Designer, Mobile App Developer)?
> 2. Do you have any specific projects or social links (GitHub, LinkedIn, Email) you want us to pre-populate? If not, we will seed it with realistic professional placeholders that you can easily edit.
> 3. Would you like a download link for a Resume? We can place a placeholder PDF file in the workspace.

---

## Proposed Changes

We will create the portfolio in the root of the workspace.

### Core Assets & Pages

#### [NEW] [index.html](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/index.html)
- Main HTML structure.
- Imports Google Fonts (Outfit, Inter) and FontAwesome icons (for social/skills icons).
- Section structure: Header/Navbar, Hero, About, Skills, Projects, Contact, Footer.
- SEO tags, meta description, favicon placeholder.

#### [NEW] [style.css](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/style.css)
- Custom design system setup (variables for dark/light themes, typography, sizing).
- Reset and base styling.
- Layout configurations using Flexbox and CSS Grid.
- Advanced visuals: Glassmorphism (`backdrop-filter`), smooth transitions, glow effects, gradients, and custom animations.
- Responsive design rules (media queries for mobile, tablet, and desktop).

#### [NEW] [script.js](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/script.js)
- Dark/Light mode theme-toggle script with local storage persistence.
- "Typed" effect for the Hero section subtitle.
- Interactive Project Filter logic.
- Project details Modal opening/closing logic.
- Scroll-spy navbar link highlight and scroll-to-section.
- Form validation and dynamic submission handling.

#### [NEW] [assets/](file:///c:/Users/ACER/Downloads/Portfolio%20website%20roshan/assets)
- Create a directory for project images, resume, and icons.
- Generate high-quality images using `generate_image` for the project cards and background elements.

---

## Verification Plan

### Manual Verification
1. **Responsiveness:** Test layout on mobile, tablet, and desktop dimensions.
2. **Interactive Elements:**
   - Verify that clicking project cards opens a detailed modal.
   - Verify that clicking project category filters (e.g., "All", "Web", "Mobile", "Design") updates the displayed cards with smooth CSS transitions.
   - Verify theme toggle switches between Dark and Light styles correctly and remembers choice on reload.
   - Verify the contact form validates input (email format, empty fields) and shows a successful mock submission overlay.
3. **Performance & Access:** Start a local HTTP server using Python or node-static to verify loading times and check browser logs for any errors.
