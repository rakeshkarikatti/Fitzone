# FitZone — Build Your Best Self

> **Module 3: JavaScript Features Integration**  
> A modern, responsive, high-performance fitness service website engineered with semantic HTML5, pure CSS3 (CSS Grid & Flexbox), and accessible modern Vanilla JavaScript (ES6+).

![FitZone Preview Banner](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Project Overview

**FitZone — Build Your Best Self** is an interactive, responsive fitness web application designed for a college web development assignment, GitHub portfolio showcase, and LinkedIn professional demonstration.

The platform embodies a premium athletic visual aesthetic combining deep charcoal and obsidian dark mode surfaces (`#0a0c0e`, `#111417`, `#171b1f`) with a vibrant neon lime-green accent (`#ccff00`). With the completion of **Module 3**, the website features a complete suite of lightweight, high-performance, accessible JavaScript interactions built without any external third-party frameworks.

---

## 🛠 Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Markup** | HTML5 Semantic Elements | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>` patterns |
| **Styling** | CSS3 Architecture | CSS Custom Properties (Tokens), Flexbox, CSS Grid, `clamp()` fluid sizing, Media Queries |
| **Interactivity** | Vanilla JavaScript (ES6+) | Event listeners, DOM manipulation, `IntersectionObserver`, `localStorage`, Form validation |
| **Typography** | Google Fonts | [Outfit](https://fonts.google.com/specimen/Outfit) (Headings) & [Inter](https://fonts.google.com/specimen/Inter) (Body) |
| **Iconography** | Font Awesome 6 CDN | Accessible vector icons for UI actions, features, and social channels |
| **Media Assets** | Unsplash Photography | Curated, high-resolution fitness imagery with responsive scaling |

---

## 📂 Project Structure

```text
FitZone/
├── index.html         # Semantic structure, landmarks, theme bootstrap, and modal dialog
├── style.css          # Design system tokens, dark/light themes, responsive layout, animations
├── script.js          # Module 3 Vanilla JS logic (Nav, Theme, Smooth Scroll, Reveal, Form, Modal)
├── README.md          # Comprehensive technical documentation, setup, and submission guide
└── assets/
    └── images/        # Local asset directory for offline assets & screenshots
```

---

## 🚀 Module 3 JavaScript Features Breakdown

### 1. JavaScript Fundamentals (ES6+)
- **Scope & Variables:** Strict usage of `const` for immutables and `let` for reassignable values; zero legacy `var`.
- **Functions & Event Handling:** Arrow functions, declarative callbacks, and passive scroll listeners for maximum FPS.
- **DOM Manipulation:** Native DOM querying (`getElementById`, `querySelector`, `querySelectorAll`) and attribute manipulation (`setAttribute`, `classList`).
- **Data Structures:** Structured dictionary objects for workout plans (`planData`), array iterations (`forEach`, `map`), and input sanitization helpers.
- **Pedagogical Code Comments:** Every major JavaScript function contains explanatory comments detailing its operational logic, accessibility considerations, and browser event flows.

### 2. Responsive Mobile Navigation Menu
- Desktop displays normal inline navigation links.
- On viewports `<= 768px`, navigation collapses into a dedicated mobile drawer and displays a 44px touch-accessible hamburger button (`#navToggle`).
- Smooth CSS transition animations for drawer expansion and hamburger-to-close ('X') icon morphing.
- **Multi-modal dismissal:**
  - Clicking any navigation link closes the drawer automatically.
  - Clicking anywhere outside the active drawer dismisses it.
  - Pressing the keyboard `Escape` key immediately closes the drawer and restores focus to the toggle button.
- Dynamically manages `aria-expanded="true/false"` and prevents background page scrolling when the drawer is open.

### 3. Dark / Light Mode Theme Toggle
- **Default Theme:** Dark Mode utilizing FitZone's signature deep charcoal and neon lime-green branding.
- **Light Mode:** High-contrast slate and pure white surfaces with an athletic emerald green accent (`#16a34a`) ensuring strict WCAG AA color contrast compliance.
- **Persistence via Web Storage:** Reads and writes theme state using `localStorage.getItem('fitzone_theme')` and `localStorage.setItem('fitzone_theme')`.
- **Zero-Flicker Bootstrap Script:** An immediate execution script in `<head>` applies `data-theme` before initial paint, preventing unwanted theme flashing during page load.
- Updates the toggle button icon between a glowing sun (`fa-sun`) and moon (`fa-moon`) with updated `aria-pressed` and accessible title attributes.

### 4. Smooth Scrolling & Sticky Header Offset
- Internal links (`#home`, `#workouts`, `#services`, `#about`, `#contact`) scroll smoothly to target sections.
- Accounts for the sticky navigation bar's dynamic height (`headerOffset`) so section headings are never obscured or clipped underneath the header.
- Utilizes CSS `scroll-margin-top` and `scroll-padding-top` on all sections as a bulletproof native fallback.
- Strictly honors the user's OS-level accessibility setting: `@media (prefers-reduced-motion: reduce)` switches scrolling to instantaneous transitions.

### 5. Scroll Reveal Animations (`IntersectionObserver` API)
- Employs native `window.IntersectionObserver` for hardware-accelerated scroll animations without performance-heavy scroll listeners.
- Targets cards, headers, media wrappers, and consultation cards (`.reveal-item`).
- Elements gently fade in (`opacity: 0 -> 1`) and translate upward (`translateY(28px -> 0)`).
- **Resource Optimization:** Unobserves elements (`observer.unobserve(entry.target)`) immediately after they enter the viewport to free browser memory.
- **Graceful Degradation:** If `IntersectionObserver` is unsupported or if reduced-motion is requested, all content remains immediately 100% visible. Content is never hidden if JavaScript fails to execute.

### 6. Accessible Contact Form Validation
- Validates the consultation form (`#contactForm`) with customized client-side logic:
  - **Full Name:** Verifies non-empty string, trims whitespace, and ensures length `>= 2` characters.
  - **Email Address:** Verifies non-empty string, trims whitespace, and validates syntax against an RFC-standard regular expression (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - **Fitness Goal:** Requires selection of an explicit goal from the `<select>` dropdown.
  - **Optional Notes:** Safe multiline input for athlete notes or injury history.
- **Real-Time Error Clearing:** Inline errors clear immediately as the user types or updates a select element (`input` and `change` listeners).
- **Accessibility & Focus Management:**
  - Connects inputs to error text via `aria-describedby` (`nameError`, `emailError`, `goalError`).
  - Sets `aria-invalid="true"` on invalid controls.
  - Does not rely on color alone (combines warning icons, borders, and descriptive guidance text).
  - Automatically shifts focus to the first invalid field upon failed submission.
- **Demonstration Confirmation:** On successful validation, displays a clean confirmation banner without reloading the page, accompanied by an explicit disclaimer stating that this is a frontend demonstration.

### 7. Additional Interactions
- **Interactive Plan Details Modal:** Clicking "Explore Plan" opens an accessible modal dialog populated dynamically from a JavaScript data store. Features focus trapping, backdrop dismissal, keyboard Escape key support, and an "Apply For This Plan" action that pre-selects the goal in the consultation form.
- **Floating Back-to-Top Button:** Floating round button (`#floatingTopBtn`) fades in when the user scrolls past 380px, accompanied by a footer Back-to-Top anchor.
- **ScrollSpy Navigation Highlighting:** Navigation links automatically highlight with an active indicator as the user scrolls through each section.
- **Dynamic Copyright Year:** Automatically renders the current calendar year (`new Date().getFullYear()`) in the footer.

---

## 🗺 Feature-to-File Mapping

| Feature | HTML (`index.html`) | CSS (`style.css`) | JavaScript (`script.js`) |
|---|---|---|---|
| **Mobile Navigation** | Lines 32–64 (`#navToggle`, `#navMenu`, `.nav-link`) | Lines 360–489, 1720–1775 (`.nav-toggle`, `.hamburger-bar`, `.nav-wrapper.active`) | Lines 45–118 (`initNavigation()`, `setMenuState()`) |
| **Dark / Light Theme** | Lines 24–36, 60–64 (`#themeToggleBtn`, `#themeToggleIcon`) | Lines 9–130 (`:root`, `[data-theme="light"]`, `.theme-toggle-btn`) | Lines 120–186 (`initThemeToggle()`, `applyTheme()`) |
| **Smooth Scrolling** | Lines 48–60, 89–96 (Section anchor links) | Lines 93–97 (`scroll-behavior`, `scroll-margin-top`) | Lines 188–236 (`initSmoothScrolling()`) |
| **Scroll Reveal** | Lines 67, 121, 158, 282, 349, 437 (`.reveal-item`) | Lines 1841–1870 (`.js-reveal`, `.reveal-item`, `.is-revealed`) | Lines 238–288 (`initScrollReveal()`, `IntersectionObserver`) |
| **Form Validation** | Lines 518–614 (`#contactForm`, `#fullName`, `#email`, `#fitnessGoal`) | Lines 1230–1340 (`.input-wrapper.has-error`, `.field-error`, `.form-status-alert`) | Lines 290–425 (`initContactForm()`, `setFieldError()`) |
| **Plan Details Modal** | Lines 624–644 (`#planModal`, `#modalTitle`, `#modalBody`) | Lines 1343–1460 (`.modal-backdrop.open`, `.modal-card`) | Lines 427–550 (`initPlanModal()`, `planData`) |
| **ScrollSpy Highlighting** | Lines 48–54 (`.nav-link`) | Lines 410–440 (`.nav-link.active`) | Lines 552–600 (`initScrollSpy()`) |
| **Back to Top & Year** | Lines 722, 726, 736 (`#currentYear`, `#floatingTopBtn`) | Lines 1600–1650 (`.floating-top-btn.visible`) | Lines 602–645 (`initBackToTop()`, `initCopyrightYear()`) |

---

## 💻 Local Development Setup (VS Code)

Follow these simple steps to run and test the website locally:

### Option 1: Live Server Extension (Recommended)
1. Open **Visual Studio Code**.
2. Press `Ctrl + O` (or `Cmd + O` on macOS) and select the `FitZone` directory.
3. Install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Extensions Marketplace (`Ctrl + Shift + X`).
4. In the File Explorer pane, right-click `index.html` and select **"Open with Live Server"**.
5. Live Server will launch your default browser at `http://127.0.0.1:5500/index.html` with real-time automatic reload enabled.

### Option 2: Python Built-In HTTP Server
If you have Python installed, run this command in your terminal from the project root:
```bash
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`.

### Option 3: Direct Browser Launch
Double-click `index.html` directly from your file explorer to open it in Chrome, Edge, Safari, or Firefox.

---

## 🔧 Git Commands: Commit & Push to GitHub

To publish your updated Module 3 project to your GitHub repository:

```bash
# 1. Check current repository status
git status

# 2. Stage all updated files (index.html, style.css, script.js, README.md)
git add .

# 3. Create a descriptive, conventional commit
git commit -m "feat(module-3): implement vanilla JS features, dark/light theme, mobile nav, and accessible validation"

# 4. Push changes to your GitHub main branch
git push origin main
```

---

## 🌐 GitHub Pages Deployment Guide

Publish your website live on the web for free in under two minutes:

1. Push your latest code to your GitHub repository on the `main` branch.
2. In your web browser, navigate to your repository on [GitHub.com](https://github.com).
3. Click the **Settings** tab located at the top-right of the repository page.
4. On the left sidebar menu under the "Code and automation" section, click **Pages**.
5. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` from the dropdown menu and set the folder to `/ (root)`.
6. Click the **Save** button.
7. Refresh after 60–90 seconds. GitHub will display a banner at the top of the page:
   > *Your site is live at https://&lt;your-username&gt;.github.io/fitzone-fitness/*
8. Test the live URL on your mobile phone, tablet, and desktop browser!

---

## 🧪 Module 3 Testing & Verification Checklist

| # | Test Case Description | Verified Status | Expected & Observed Result |
|---|---|:---:|---|
| 1 | Desktop Navigation | Verified | Nav links render inline with hover underlines and smooth section navigation. |
| 2 | Mobile Hamburger Menu Toggle | Verified | Hamburger displays `<= 768px`; clicks open and close drawer smoothly. |
| 3 | Mobile Nav Dismiss on Link Click | Verified | Selecting any nav anchor closes drawer immediately and scrolls to section. |
| 4 | Mobile Nav Dismiss via Escape Key | Verified | Pressing `Esc` closes active drawer and returns focus to `#navToggle`. |
| 5 | Dark / Light Theme Toggle | Verified | Clicking `#themeToggleBtn` flips `data-theme`, custom properties, and sun/moon icons. |
| 6 | Theme Persistence (`localStorage`) | Verified | Selected theme is preserved across page reloads and browser sessions. |
| 7 | Smooth Section Scrolling | Verified | All internal anchors scroll smoothly to target sections (`#home`, `#workouts`, etc.). |
| 8 | Sticky Header Offset | Verified | Section titles render with clean breathing room below sticky header (`76px`). |
| 9 | Scroll Reveal Animations | Verified | Cards and headers fade and shift upward smoothly upon entering viewport. |
| 10 | Fallback for Scroll Animations | Verified | If JS or `IntersectionObserver` is unavailable, all content remains 100% visible. |
| 11 | Reduced Motion Preference | Verified | `prefers-reduced-motion: reduce` instantly turns off transitions and scroll animations. |
| 12 | Empty Name Validation Error | Verified | Submitting empty name triggers inline warning and focuses field. |
| 13 | Invalid Email Validation Error | Verified | Invalid email syntax (e.g., `user@domain`) triggers inline warning banner. |
| 14 | Missing Fitness Goal Error | Verified | Submitting default dropdown option displays inline validation message. |
| 15 | Valid Form Submission | Verified | Correct input triggers success confirmation banner with demo disclaimer; fields reset. |
| 16 | Multi-Screen Responsiveness | Verified | Verified layout fluidity across 320px, 375px, 430px, 768px, 1024px, and 1440px+. |
| 17 | Zero Horizontal Overflow | Verified | No horizontal scrollbars or clipped components across any mobile viewport. |
| 18 | Clean Browser Console | Verified | Strict mode enabled (`'use strict'`); zero uncaught runtime errors or warnings. |
| 19 | Content Preservation | Verified | Hero, 3 Workout Plans, 3 Services, About, Consultation form, and Footer preserved. |
| 20 | Dual-Theme Accessibility | Verified | Text contrast ratios meet or exceed WCAG AA standards in both Dark and Light modes. |

---

## 📋 Module 3 Assignment Submission Checklist

Before submitting your assignment to your instructor or LMS portal:

- [x] All 3 core files (`index.html`, `style.css`, `script.js`) are located in the repository root.
- [x] Mobile hamburger menu opens, animates, closes on link click, and closes on Escape key.
- [x] Dark/Light mode toggle functions seamlessly and saves preference to `localStorage`.
- [x] Smooth scrolling correctly accounts for the sticky header height offset.
- [x] Scroll reveal animations use `IntersectionObserver` and unobserve revealed elements.
- [x] Form validation catches empty names, invalid emails, and unselected goals with inline messages.
- [x] Keyboard accessibility works (`focus-visible` indicators, Escape key listeners, focus restoration).
- [x] Reduced-motion preferences (`prefers-reduced-motion: reduce`) are strictly respected.
- [x] Tested on small mobile (320px–375px), modern mobile (430px), tablet, and desktop viewports.
- [x] Code is clean, well-indented, formatted, and documented with beginner-friendly comments.
- [x] Repository pushed to GitHub with active GitHub Pages deployment link.

---

## 📱 Suggested LinkedIn Post

Copy and customize this post to showcase your project on LinkedIn:

```markdown
🚀 Excited to share my latest web development project: FitZone — Build Your Best Self! 🏋️‍♂️⚡

As part of Module 3: JavaScript Features, I upgraded a responsive fitness platform from a static interface into a high-performance, accessible, interactive web application built with Pure HTML5, Vanilla CSS3, and Modern Vanilla JavaScript (ES6+). Zero external frameworks, zero bulky dependencies.

Key highlights engineered in this milestone:
✨ Custom Dark / Light Mode Toggle: Seamless theme switching powered by CSS custom properties and persistent cross-session state with the Web Storage API (localStorage).
📱 Mobile Navigation Drawer: Fully responsive hamburger menu with CSS transform morphing, touch-friendly touch targets, ARIA state updates, and keyboard Escape key listeners.
🎯 Performant Scroll Reveal Animations: Built with the native IntersectionObserver API for fluid 60fps animations that unobserve once revealed to conserve browser resources.
🛡️ Accessible Client-Side Form Validation: Real-time inline feedback, regex email verification, ARIA live regions, and automatic focus management without color-only cues.
⚡ Interactive Plan Details Modal: Structured program data modal with focus trapping and automatic contact goal pre-population.
♿ Accessibility First: Built with semantic landmarks, keyboard focus rings, and strict adherence to prefers-reduced-motion.

Check out the live demo and source code:
🔗 Live Website: https://<your-username>.github.io/fitzone-fitness/
💻 GitHub Repository: https://github.com/<your-username>/fitzone-fitness

A big thank you to my mentors and peers for the feedback! What feature would you like to see next?

#WebDevelopment #JavaScript #Frontend #VanillaJS #CSSGrid #Flexbox #ResponsiveDesign #Accessibility #A11y #PortfolioProject #CleanCode
```

---

## 📄 License & Attribution

Designed and developed for the **FitZone — Build Your Best Self** showcase. Educational and personal portfolio use permitted.
