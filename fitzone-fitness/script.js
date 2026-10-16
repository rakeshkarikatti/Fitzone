/**
 * FitZone — Build Your Best Self
 * Interactive JavaScript (Vanilla ES6+)
 * 
 * Features:
 * - Responsive mobile navigation toggle & auto-close
 * - Sticky header effect on scroll
 * - Active section highlighting (ScrollSpy)
 * - Accessible contact form validation with inline feedback
 * - Interactive Workout Plan Detail Modal
 * - Dynamic copyright year
 * - Accessible Back to Top controls
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initContactForm();
  initPlanModal();
  initBackToTop();
  initCopyrightYear();
});

/* ==========================================================================
   1. Responsive Navigation Bar
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (!navToggle || !navMenu) return;

  // Toggle mobile menu open/close
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Automatically close mobile menu when a nav link is selected
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  });

  // Close when clicking outside of the navigation
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close when Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
      navToggle.focus();
    }
  });

  function toggleMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navMenu.classList.toggle('active', open);

    // Prevent body scroll when mobile menu is active
    if (window.innerWidth <= 768) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  // Active section tracking on scroll (ScrollSpy)
  const sections = document.querySelectorAll('main > section[id]');
  const navItems = document.querySelectorAll('.nav-list .nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navItems.forEach((item) => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* ==========================================================================
   2. Sticky Header Styling on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Accessible Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusAlert = document.getElementById('formStatusMessage');

  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const goalSelect = document.getElementById('fitnessGoal');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const goalError = document.getElementById('goalError');

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time error clearing on input
  fullNameInput.addEventListener('input', () => clearFieldError(fullNameInput, nameError));
  emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  goalSelect.addEventListener('change', () => clearFieldError(goalSelect, goalError));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    statusAlert.style.display = 'none';
    statusAlert.className = 'form-status-alert';
    statusAlert.textContent = '';

    // Validate Full Name
    const nameVal = fullNameInput.value.trim();
    if (!nameVal) {
      showFieldError(fullNameInput, nameError, 'Please enter your full name.');
      isValid = false;
    } else if (nameVal.length < 2) {
      showFieldError(fullNameInput, nameError, 'Name must contain at least 2 characters.');
      isValid = false;
    } else {
      clearFieldError(fullNameInput, nameError);
    }

    // Validate Email Address
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      showFieldError(emailInput, emailError, 'Please provide your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showFieldError(emailInput, emailError, 'Please enter a valid email format (e.g., name@domain.com).');
      isValid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // Validate Fitness Goal Dropdown
    const goalVal = goalSelect.value;
    if (!goalVal) {
      showFieldError(goalSelect, goalError, 'Please select your primary fitness goal.');
      isValid = false;
    } else {
      clearFieldError(goalSelect, goalError);
    }

    if (!isValid) {
      // Focus first erroneous field
      const firstInvalid = form.querySelector('.input-wrapper.has-error input, .input-wrapper.has-error select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Form successfully validated (Frontend demonstration feedback)
    statusAlert.className = 'form-status-alert success';
    statusAlert.innerHTML = `
      <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
      <div>
        <strong>Enquiry Received!</strong> Thank you, ${escapeHTML(nameVal)}. Our coaching team has received your goal inquiry. 
        <br><small style="color: #94a3b8;">(Frontend Demonstration: No data was transmitted to external servers.)</small>
      </div>
    `;
    statusAlert.style.display = 'flex';

    // Reset fields
    form.reset();
  });

  function showFieldError(inputElement, errorElement, message) {
    const wrapper = inputElement.closest('.input-wrapper');
    if (wrapper) wrapper.classList.add('has-error');
    inputElement.setAttribute('aria-invalid', 'true');
    if (errorElement) errorElement.textContent = message;
  }

  function clearFieldError(inputElement, errorElement) {
    const wrapper = inputElement.closest('.input-wrapper');
    if (wrapper) wrapper.classList.remove('has-error');
    inputElement.removeAttribute('aria-invalid');
    if (errorElement) errorElement.textContent = '';
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/* ==========================================================================
   4. Interactive Plan Details Modal
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

  const planData = {
    muscle: {
      title: 'Muscle Building Blueprint',
      badge: 'Strength & Hypertrophy',
      goalValue: 'muscle',
      description: 'Engineered for dedicated athletes seeking substantial muscle volume, dense strength development, and enhanced tendon resilience.',
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
      description: 'Designed to elevate your cardiovascular ceiling, torch calories efficiently, and boost every-day stamina without joint burnout.',
      schedule: '3–4 days per week (Zone 2 aerobic base + HIIT sessions)',
      highlights: [
        'Zone 2 endurance training for mitochondrial and cardiac health',
        'Low-impact interval circuits with rowing, sprints, and cycling',
        'Mobility cooldowns focused on hip flexors, ankles, and spine',
        'Heart rate variability (HRV) guidelines for balanced recovery'
      ]
    },
    total: {
      title: 'Total Body Fitness & Mobility',
      badge: 'Functional Conditioning',
      goalValue: 'total',
      description: 'A comprehensive physical foundation uniting functional strength, joint range of motion, balance, and athletic core power.',
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

  exploreButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const planKey = btn.getAttribute('data-plan');
      const data = planData[planKey];
      if (!data) return;

      lastFocusedElement = btn;
      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;

      modalBody.innerHTML = `
        <p>${data.description}</p>
        <h4>Weekly Structure & Frequency</h4>
        <p><strong>Frequency:</strong> ${data.schedule}</p>
        <h4>Key Program Elements</h4>
        <ul>
          ${data.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `;

      // Preset the contact goal when user clicks "Apply"
      modalEnrollBtn.onclick = () => {
        closeModal();
        const goalSelect = document.getElementById('fitnessGoal');
        if (goalSelect) {
          goalSelect.value = data.goalValue;
        }
      };

      openModal();
    });
  });

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop outside card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Dynamic Copyright Year
   ========================================================================== */
function initCopyrightYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   6. Back To Top Buttons
   ========================================================================== */
function initBackToTop() {
  const floatingBtn = document.getElementById('floatingTopBtn');
  const footerBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    if (window.scrollY > 400) {
      floatingBtn.classList.add('visible');
    } else {
      floatingBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (floatingBtn) floatingBtn.addEventListener('click', scrollToTop);
  if (footerBtn) footerBtn.addEventListener('click', scrollToTop);
}
