/**
 * ==========================================================================
 * FitZone — Build Your Best Self
 * Module 3: JavaScript Features & Interactive Client-Side Logic
 * ==========================================================================
 * 
 * Student & Mentor Technical Documentation:
 * This script demonstrates modern Vanilla JavaScript (ES6+) principles:
 * - Block-scoped variable declarations (`const` and `let`)
 * - Modular, single-responsibility functions with event-driven architecture
 * - Semantic DOM selection (`getElementById`, `querySelector`, `querySelectorAll`)
 * - Robust conditional logic and regular expression validation
 * - Dynamic data structures (Arrays, Objects, Sets, and Maps)
 * - IntersectionObserver API for performant, hardware-accelerated scroll animations
 * - Accessible UI state management (`aria-expanded`, `aria-pressed`, `aria-invalid`)
 * - Keyboard navigation management (Escape key listeners, focus restoration)
 * - Web Storage API (`localStorage`) for cross-session theme persistence
 * - Zero external library dependencies (100% Pure Vanilla JS)
 * 
 * Table of Contents:
 * 1. Application Initialization (DOMContentLoaded)
 * 2. Feature Two: Responsive Mobile Navigation Menu
 * 3. Feature Three: Dark / Light Mode Theme Toggle & LocalStorage Persistence
 * 4. Feature Four: Smooth Scrolling & Sticky Header Offset
 * 5. Feature Five: Scroll Reveal Animations (IntersectionObserver API)
 * 6. Feature Six: Accessible Contact Form Validation & Demonstration Feedback
 * 7. Feature Seven: Interactive Workout Plan Details Modal
 * 8. Feature Seven: ScrollSpy Active Section Navigation Highlighting
 * 9. Feature Seven: Dynamic Copyright Year & Back-to-Top Controls
 */

'use strict';

/* ==========================================================================
   1. Application Lifecycle Entry Point
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular features safely once the DOM is fully constructed
  initThemeToggle();
  initNavigation();
  initSmoothScrolling();
  initScrollSpy();
  initScrollReveal();
  initContactForm();
  initPlanModal();
  initBackToTop();
  initCopyrightYear();
});

/* ==========================================================================
   2. Feature Two: Responsive Mobile Navigation Menu
   ==========================================================================
   How it works:
   - On desktop, navigation links are displayed inline within the header.
   - On mobile/tablet screens (<= 768px), a hamburger button (#navToggle) is displayed.
   - When clicked, it toggles the mobile drawer (.nav-wrapper) and updates ARIA states.
   - The hamburger bar morphs into a close 'X' via CSS transforms.
   - For optimal UX, the menu automatically closes if:
       a) A navigation link is clicked
       b) The user clicks anywhere outside the active menu
       c) The user presses the physical 'Escape' key on their keyboard
   - Traps or restores body scroll so the background doesn't scroll underneath.
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  // Guard clause: ensure elements exist in the DOM
  if (!navToggle || !navMenu) return;

  /**
   * Helper function to open or close the mobile navigation drawer
   * @param {boolean} shouldOpen - Desired menu state (true = open, false = closed)
   */
  function setMenuState(shouldOpen) {
    // 1. Update accessibility attribute for screen readers
    navToggle.setAttribute('aria-expanded', String(shouldOpen));
    navToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');

    // 2. Toggle active class to trigger CSS slide-in transform
    navMenu.classList.toggle('active', shouldOpen);

    // 3. Prevent background page scroll on mobile while the drawer is open
    if (window.innerWidth <= 768) {
      document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }
  }

  // Toggle drawer open/closed on hamburger button click
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isCurrentlyExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isCurrentlyExpanded);
  });

  // Automatically close the mobile menu whenever any navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        setMenuState(false);
      }
    });
  });

  // Close the drawer when clicking outside the navigation container
  document.addEventListener('click', (event) => {
    const isMenuOpen = navMenu.classList.contains('active');
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (isMenuOpen && !clickedInsideMenu && !clickedToggle) {
      setMenuState(false);
    }
  });

  // Close the drawer when pressing the physical 'Escape' key for keyboard accessibility
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      setMenuState(false);
      navToggle.focus(); // Return keyboard focus back to the toggle button
    }
  });

  // Reset menu styling if the window is resized beyond the mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      setMenuState(false);
    }
  });
}

/* ==========================================================================
   3. Feature Three: Dark / Light Mode Theme Toggle & LocalStorage Persistence
   ==========================================================================
   How it works:
   - FitZone defaults to its signature Dark Mode (deep charcoal & neon lime green).
   - Clicking #themeToggleBtn switches between 'dark' and 'light' theme.
   - We set a `data-theme` attribute on `document.documentElement` (`<html>`),
     which triggers CSS custom property recalculation across all components.
   - The toggle button icon dynamically flips between sun (fa-sun) and moon (fa-moon).
   - The user's active preference is saved to `window.localStorage` under 'fitzone_theme'.
   - When the user returns or refreshes the page, their preference is restored instantly.
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeToggleIcon');

  if (!themeToggleBtn) return;

  const STORAGE_KEY = 'fitzone_theme';

  /**
   * Reads current active theme from <html> data-theme attribute
   * @returns {string} 'dark' | 'light'
   */
  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  /**
   * Applies the theme to the DOM, synchronizes icons, and stores in localStorage
   * @param {string} theme - 'dark' | 'light'
   * @param {boolean} saveToStorage - Whether to persist choice to localStorage
   */
  function applyTheme(theme, saveToStorage = true) {
    const isLight = theme === 'light';

    // 1. Set data-theme on root <html> tag for CSS custom properties
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Synchronize FontAwesome icon: sun in dark mode, moon in light mode
    if (themeIcon) {
      themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }

    // 3. Update accessible label and aria-pressed state
    const accessibleLabel = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggleBtn.setAttribute('aria-pressed', String(isLight));
    themeToggleBtn.setAttribute('aria-label', accessibleLabel);
    themeToggleBtn.setAttribute('title', accessibleLabel);

    // 4. Save preference to localStorage safely
    if (saveToStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        console.warn('FitZone: localStorage is not accessible in this environment.', err);
      }
    }
  }

  // Initialize button icons and accessible attributes according to existing theme
  applyTheme(getActiveTheme(), false);

  // Click event listener to toggle between light and dark themes
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = getActiveTheme();
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  });
}

/* ==========================================================================
   4. Feature Four: Smooth Scrolling & Sticky Header Offset
   ==========================================================================
   How it works:
   - Captures clicks on all internal anchor links (href starting with "#").
   - Computes the target element's exact vertical position on the page.
   - Subtracts the sticky header's rendered height so section titles are never
     obscured or clipped underneath the navigation bar.
   - Respects user's `prefers-reduced-motion` settings.
   - Updates browser history with the target hash without jumping.
   ========================================================================== */
function initSmoothScrolling() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const siteHeader = document.getElementById('siteHeader');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetHash = link.getAttribute('href');
      
      // Ignore bare '#' links
      if (!targetHash || targetHash === '#') return;

      const targetElement = document.querySelector(targetHash);
      if (!targetElement) return;

      // Prevent default instant jump
      event.preventDefault();

      // Check whether user requested reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Calculate dynamic sticky header height offset
      const headerOffset = siteHeader ? siteHeader.offsetHeight : 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const targetOffsetTop = elementPosition + window.pageYOffset - headerOffset;

      // Perform smooth window scroll
      window.scrollTo({
        top: Math.max(0, targetOffsetTop),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // Update URL hash smoothly for bookmarking
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', targetHash);
      }
    });
  });
}

/* ==========================================================================
   5. Feature Five: Scroll Reveal Animations (IntersectionObserver API)
   ==========================================================================
   How it works:
   - Leverages the browser's native `IntersectionObserver` API for 60fps performance.
   - Targets all elements annotated with `.reveal-item`.
   - As an element enters 12% of the viewport threshold, the `.is-revealed` class
     is added, triggering a smooth fade-in and subtle upward translation.
   - Elements are immediately unobserved (`observer.unobserve()`) once visible to
     conserve CPU and memory resources.
   - Accessibility & Graceful Degradation:
       * If IntersectionObserver is unsupported, all items stay visible.
       * If `prefers-reduced-motion` is active, animations are bypassed immediately.
       * If JavaScript is disabled, styles ensure content remains completely readable.
   ========================================================================== */
function initScrollReveal() {
  // Feature detection for IntersectionObserver
  const isObserverSupported = 'IntersectionObserver' in window;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealItems = document.querySelectorAll('.reveal-item');
  if (revealItems.length === 0) return;

  // Fallback: if observer is unsupported or user prefers reduced motion, reveal everything immediately
  if (!isObserverSupported || prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  // Activate CSS reveal styles dynamically now that we know IntersectionObserver is supported
  document.documentElement.classList.add('js-reveal');

  // Configuration options for the intersection observer
  const observerOptions = {
    root: null, // use viewport as bounding box
    threshold: 0.12, // trigger when 12% of the element is visible
    rootMargin: '0px 0px -40px 0px' // slight bottom offset for natural reading trigger
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add reveal class to trigger CSS transition
        entry.target.classList.add('is-revealed');
        // Unobserve element once revealed to free system resources
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach observer to every reveal candidate
  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

/* ==========================================================================
   6. Feature Six: Accessible Contact Form Validation
   ==========================================================================
   How it works:
   - Intercepts form submission via `event.preventDefault()`.
   - Validates each required field:
       1. Full Name: Trims whitespace, verifies non-empty, checks min length (>= 2).
       2. Email: Trims whitespace, validates standard RFC email format via RegExp.
       3. Fitness Goal: Ensures a valid option from the dropdown is selected.
   - Real-time inline error clearing:
       * Listens to 'input' and 'change' events so errors vanish as soon as corrected.
   - Accessibility & Usability:
       * Sets `aria-invalid="true"` on invalid inputs.
       * Associates input fields with their corresponding error element via `aria-describedby`.
       * Uses warning icons + descriptive text so color alone is never the only error indicator.
       * Automatically focuses the first invalid element for keyboard users.
   - Feedback:
       * On valid submission, shows an accessible live banner (#formStatusMessage).
       * Explicitly states that this is a frontend demonstration (no data stored).
       * Resets the form fields.
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusAlert = document.getElementById('formStatusMessage');

  if (!form || !statusAlert) return;

  // Form input field references
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const goalSelect = document.getElementById('fitnessGoal');

  // Error message container references
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const goalError = document.getElementById('goalError');

  // Standard regular expression for email validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Displays an inline error message and updates ARIA states
   * @param {HTMLElement} inputEl - Form control element
   * @param {HTMLElement} errorEl - Container for error message text
   * @param {string} message - User-friendly error guidance text
   */
  function setFieldError(inputEl, errorEl, message) {
    const wrapper = inputEl.closest('.input-wrapper');
    if (wrapper) wrapper.classList.add('has-error');
    inputEl.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> ${message}`;
    }
  }

  /**
   * Clears inline error styling and ARIA states
   * @param {HTMLElement} inputEl - Form control element
   * @param {HTMLElement} errorEl - Container for error message text
   */
  function clearFieldError(inputEl, errorEl) {
    const wrapper = inputEl.closest('.input-wrapper');
    if (wrapper) wrapper.classList.remove('has-error');
    inputEl.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  /**
   * Sanitizes user input string against XSS injection
   * @param {string} str - Raw input string
   * @returns {string} Sanitized string
   */
  function sanitizeString(str) {
    return str.replace(/[&<>'"]/g, (tag) => {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      };
      return escapeMap[tag] || tag;
    });
  }

  // Real-time error clearing when the user types or selects
  if (fullNameInput) {
    fullNameInput.addEventListener('input', () => clearFieldError(fullNameInput, nameError));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  }
  if (goalSelect) {
    goalSelect.addEventListener('change', () => clearFieldError(goalSelect, goalError));
  }

  // Submit event listener
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    // Reset status alert banner
    statusAlert.style.display = 'none';
    statusAlert.className = 'form-status-alert';
    statusAlert.textContent = '';

    // 1. Validate Full Name
    const nameValue = fullNameInput ? fullNameInput.value.trim() : '';
    if (!nameValue) {
      setFieldError(fullNameInput, nameError, 'Please enter your full name.');
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = fullNameInput;
    } else if (nameValue.length < 2) {
      setFieldError(fullNameInput, nameError, 'Name must contain at least 2 characters.');
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = fullNameInput;
    } else {
      clearFieldError(fullNameInput, nameError);
    }

    // 2. Validate Email Address
    const emailValue = emailInput ? emailInput.value.trim() : '';
    if (!emailValue) {
      setFieldError(emailInput, emailError, 'Please provide an email address.');
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else if (!EMAIL_REGEX.test(emailValue)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g., name@domain.com).');
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // 3. Validate Fitness Goal Dropdown
    const goalValue = goalSelect ? goalSelect.value : '';
    if (!goalValue) {
      setFieldError(goalSelect, goalError, 'Please select your primary fitness goal.');
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = goalSelect;
    } else {
      clearFieldError(goalSelect, goalError);
    }

    // If validation failed, focus the first erroneous input
    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    // If validation passed: render success confirmation message
    const sanitizedName = sanitizeString(nameValue);
    statusAlert.className = 'form-status-alert success';
    statusAlert.innerHTML = `
      <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
      <div>
        <strong>Enquiry Received!</strong> Thank you, ${sanitizedName}. Your fitness inquiry has been successfully validated.
        <br><small style="opacity: 0.85;">(Note: This is a frontend demonstration. No backend or database is connected; no real emails were sent.)</small>
      </div>
    `;
    statusAlert.style.display = 'flex';

    // Reset form fields after successful submission
    form.reset();

    // Scroll status alert smoothly into view if on small screens
    statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ==========================================================================
   7. Feature Seven: Interactive Workout Plan Details Modal
   ==========================================================================
   How it works:
   - Stores workout plan data in a structured JavaScript dictionary object.
   - Clicking "Explore Plan" buttons reads the `data-plan` attribute.
   - Populates the modal title, badge, description, and highlights dynamically.
   - Focuses the close button for keyboard users.
   - Clicking "Apply For This Plan" closes the modal, pre-selects the goal
     in the consultation contact form, and scrolls smoothly to #contact!
   - Can be dismissed via Close Button, Cancel Button, Backdrop click, or Escape key.
   - Restores focus to the triggering element upon dismissal.
   ========================================================================== */
function initPlanModal() {
  const modal = document.getElementById('planModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalBody = document.getElementById('modalBody');
  const exploreButtons = document.querySelectorAll('.explore-plan-btn');

  if (!modal) return;

  // Structured program details data dictionary
  const planData = {
    muscle: {
      title: 'Muscle Building Blueprint',
      badge: 'Strength & Hypertrophy',
      goalValue: 'muscle',
      description: 'Engineered for dedicated athletes seeking substantial muscle volume, dense strength development, and enhanced tendon resilience through progressive overload.',
      schedule: '4–5 days per week (Upper / Lower or Push / Pull / Legs split)',
      highlights: [
        'Structured progressive overload tracking with baseline 1RM estimates',
        'Emphasis on multi-joint barbell squats, deadlifts, and overhead presses',
        'Specific rest period guidelines & metabolic conditioning finishers',
        'Deload schedules every 6 weeks for nervous system recovery'
      ]
    },
    active: {
      title: 'Active Lifestyle & Cardio Stamina',
      badge: 'Cardio & Energy',
      goalValue: 'cardio',
      description: 'Designed to elevate your cardiovascular ceiling, torch calories efficiently, and boost daily stamina without joint burnout or chronic fatigue.',
      schedule: '3–4 days per week (Zone 2 aerobic base + HIIT sessions)',
      highlights: [
        'Zone 2 endurance training for mitochondrial and cardiac health',
        'Low-impact interval circuits with rowing, sprints, and cycling',
        'Mobility cooldowns focused on hip flexors, ankles, and thoracic spine',
        'Heart rate variability (HRV) guidelines for balanced recovery'
      ]
    },
    total: {
      title: 'Total Body Fitness & Mobility',
      badge: 'Functional Conditioning',
      goalValue: 'total',
      description: 'A comprehensive physical foundation uniting functional multi-joint strength, active joint range of motion, balance, and athletic core power.',
      schedule: '3–5 days per week (Full-body rotational and kettlebell flows)',
      highlights: [
        'Kettlebell swings, Turkish get-ups, and calisthenic control',
        'Postural realignment and thoracic spine decompression',
        'Dynamic stability drills for athletic agility and longevity',
        'Adaptable for home gym or full commercial fitness facility'
      ]
    }
  };

  let lastFocusedElement = null;

  /**
   * Opens the modal dialog and traps focus
   */
  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  /**
   * Closes the modal dialog and restores focus
   */
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Attach click listener to each "Explore Plan" button
  exploreButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const planKey = btn.getAttribute('data-plan');
      const data = planData[planKey];
      if (!data) return;

      lastFocusedElement = btn;

      // Populate modal content dynamically
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalBadge) modalBadge.textContent = data.badge;

      if (modalBody) {
        modalBody.innerHTML = `
          <p>${data.description}</p>
          <h4>Weekly Structure & Frequency</h4>
          <p><strong>Frequency:</strong> ${data.schedule}</p>
          <h4>Key Program Elements</h4>
          <ul>
            ${data.highlights.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
      }

      // Link "Apply For This Plan" CTA to pre-select goal in contact form
      if (modalEnrollBtn) {
        modalEnrollBtn.onclick = () => {
          closeModal();
          const goalSelect = document.getElementById('fitnessGoal');
          if (goalSelect) {
            goalSelect.value = data.goalValue;
            // Clear any error state on goal input
            const goalError = document.getElementById('goalError');
            const wrapper = goalSelect.closest('.input-wrapper');
            if (wrapper) wrapper.classList.remove('has-error');
            if (goalError) goalError.textContent = '';
          }
        };
      }

      openModal();
    });
  });

  // Modal dismiss buttons
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  // Close when clicking modal backdrop outside the card
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal when pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Feature Seven: ScrollSpy Active Section Navigation Highlighting
   ==========================================================================
   How it works:
   - Tracks the user's vertical scroll position continuously using passive listeners.
   - Calculates which section is currently active within the viewport.
   - Updates `.active` class on the matching navigation anchor tags.
   - Enhances sticky header styling with elevation and background blur after 30px.
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('main > section[id]');
  const navItems = document.querySelectorAll('.nav-list .nav-link');
  const siteHeader = document.getElementById('siteHeader');

  function updateNavigationState() {
    const currentScrollY = window.scrollY;

    // 1. Sticky header elevation effect
    if (siteHeader) {
      if (currentScrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // 2. Active section ScrollSpy
    const scrollPosition = currentScrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateNavigationState, { passive: true });
  updateNavigationState();
}

/* ==========================================================================
   9. Feature Seven: Dynamic Copyright Year & Back-to-Top Controls
   ==========================================================================
   How it works:
   - Injects the current calendar year dynamically into #currentYear.
   - Displays a floating back-to-top button (#floatingTopBtn) once the user
     scrolls past 380px.
   - Smoothly scrolls to the top of the document on click.
   - Connects both the floating button and the footer #backToTopBtn link.
   ========================================================================== */
function initCopyrightYear() {
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
}

function initBackToTop() {
  const floatingBtn = document.getElementById('floatingTopBtn');
  const footerBtn = document.getElementById('backToTopBtn');

  // Toggle floating button visibility based on vertical scroll offset
  const handleScrollVisibility = () => {
    if (!floatingBtn) return;
    if (window.scrollY > 380) {
      floatingBtn.classList.add('visible');
    } else {
      floatingBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollVisibility, { passive: true });

  /**
   * Smoothly scrolls page to the very top (0, 0)
   * @param {Event} event - Trigger event
   */
  const scrollToTop = (event) => {
    event.preventDefault();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth'
    });
  };

  if (floatingBtn) floatingBtn.addEventListener('click', scrollToTop);
  if (footerBtn) footerBtn.addEventListener('click', scrollToTop);
}
