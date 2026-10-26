# Siam Ahmed - Senior Developer Portfolio & WordPress Integration

[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-crimson.svg)](https://github.com/siamhossain7722/Admin-portfolio)
[![WordPress](https://img.shields.io/badge/WordPress-Ready%20Plugin%20%26%20Gutenberg-blue.svg)](https://admin.qrioustechbd.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An elite, high-performance personal developer portfolio landing page for a **Senior Full-Stack Engineer & Tech Architect**, inspired by the modern **Reeni Next.js** aesthetic.

Built with **Pure HTML5, Vanilla CSS3, and Modern JavaScript**, with zero heavyweight external framework dependencies, and seamlessly prepared for **WordPress**.

---

## 🌟 Key Features

- **Cyberpunk / Dark Aesthetic**: High-contrast dark palette (`#0c0d12`) with neon accents (`#ff014f` / `#ff336e`), subtle glassmorphism, and responsive theme switcher (Dark / Light mode).
- **Interactive Header & Navigation**: Sticky navbar with progress indicator ring, responsive offcanvas navigation sidebar for mobile devices, and custom brand emblem logo.
- **Dynamic Typewriter Hero**: Smooth headline typewriter rotation highlighting key engineering specializations.
- **4-Card Service Matrix**: Interactive cards with neon border glow transitions and dynamic micro-animations.
- **Odometer Counter Engine**: IntersectionObserver-powered numeric counters showcasing experience metrics and project completions.
- **Technical Mastery Progress Bars**: Animated skill-level indicator bars for frontend, backend, cloud, and architecture stacks.
- **Filterable Portfolio Showcase**: Categorized project gallery (Full-Stack, Next.js, Cloud) with interactive popup modals for project deep-dives.
- **Client Testimonial Slider**: Touch and button-navigated carousel for client recommendations.
- **Lead Capture Contact Form**: Custom form validation with real-time floating toast notifications.
- **WordPress Integration**:
  - Full self-contained Gutenberg HTML/CSS/JS block (`wordpress-page-content.html`).
  - Standalone WordPress plugin package with shortcode `[siam_portfolio]` and full-page template override (`wp-plugin/siam-developer-portfolio`).

---

## 📁 Repository Structure

```text
portfolio/
├── index.html                   # Primary standalone portfolio landing page
├── wordpress-page-content.html  # Full self-contained Gutenberg block template for WordPress
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS design system, themes, and animations
│   ├── js/
│   │   └── main.js              # Typewriter, counters, modal, and carousel logic
│   └── images/
│       ├── logo.jpg             # 3D glowing neon emblem logo
│       ├── user-profile.jpg     # Lead architect portrait
│       ├── developer-alt.jpg    # Secondary profile showcase
│       ├── project-*.jpg        # Portfolio showcase thumbnails
│       └── blog-*.jpg           # Tech memo article covers
└── wp-plugin/
    ├── siam-developer-portfolio.zip # Ready-to-install WordPress plugin archive
    └── siam-developer-portfolio/    # Unpacked plugin source files
        ├── siam-developer-portfolio.php
        ├── templates/
        └── assets/
```

---

## 🚀 Getting Started Locally

To run the portfolio locally without any build step:

```bash
# Using Python
python -m http.server 3000

# Or using Node http-server / npx serve
npx serve . -l 3000
```

Then open `http://localhost:3000/` in your browser.

---

## 🌐 WordPress Deployment

1. **Option A (Instant Gutenberg Block)**:
   - Create or edit a page in WordPress.
   - Insert a **Custom HTML** block.
   - Copy and paste the entire contents of `wordpress-page-content.html` into the block.
   - Set page title to `Portfolio` and publish.

2. **Option B (WordPress Plugin)**:
   - Upload `wp-plugin/siam-developer-portfolio.zip` in **Plugins -> Add New -> Upload Plugin**.
   - Activate the plugin. It will automatically generate and configure a dedicated `/portfolio` landing page with shortcode `[siam_portfolio]`.

---

## 📄 License

Distributed under the MIT License. Built with ❤️ for Siam Ahmed.
