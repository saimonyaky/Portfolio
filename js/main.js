/**
 * ============================================================
 * Portfolio Website — Main JavaScript
 * Pure vanilla ES6+ • No frameworks
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================
   * 1. CACHED DOM REFERENCES
   * ========================================================== */

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navClose = document.querySelector('.nav__close');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const themeToggle = document.querySelector('.nav__theme-toggle');
  const scrollUpBtn = document.getElementById('scroll-up');
  const sections = document.querySelectorAll('section[id]');

  /* ==========================================================
   * 2. SVG ICON CONSTANTS
   * ========================================================== */

  /** Moon icon shown in dark mode (the default) */
  const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  /** Sun icon shown in light mode */
  const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  /* ==========================================================
   * 3. NAVIGATION — Sticky / Glass Effect
   * ========================================================== */

  /**
   * Adds a 'scrolled' class to the nav when the user scrolls
   * past 50 px, enabling a sticky glass-morphism effect via CSS.
   */
  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  /* ==========================================================
   * 4. NAVIGATION — Mobile Menu Toggle
   * ========================================================== */

  /** Open the mobile nav menu */
  const openMenu = () => {
    if (navMenu) navMenu.classList.add('show');
  };

  /** Close the mobile nav menu */
  const closeMenu = () => {
    if (navMenu) navMenu.classList.remove('show');
  };

  if (navToggle) navToggle.addEventListener('click', openMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);

  // Close the menu when any nav link is clicked (mobile UX)
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ==========================================================
   * 5. NAVIGATION — Active Link Highlighting
   * ========================================================== */

  /**
   * Uses IntersectionObserver to watch every <section id="…">
   * and toggle an 'active' class on the matching nav link.
   */
  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(sectionId)) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => activeLinkObserver.observe(section));

  /* ==========================================================
   * 6. DARK / LIGHT THEME TOGGLE
   * ========================================================== */

  const THEME_KEY = 'portfolio-theme';

  /**
   * Applies the given theme ('light' | 'dark') to the document,
   * updates the toggle button icon, and persists the choice.
   *
   * @param {'light'|'dark'} theme
   */
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggle) themeToggle.innerHTML = SUN_SVG;
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) themeToggle.innerHTML = MOON_SVG;
    }
    localStorage.setItem(THEME_KEY, theme);
  };

  // Restore saved theme on page load (default → dark)
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  /* ==========================================================
   * 7. TYPING EFFECT
   * ========================================================== */

  /**
   * Creates an infinite typing / deleting loop over an array of
   * strings, rendering into the target element character by character.
   */
  const initTypingEffect = () => {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    // Use an inner .typing-text span if it exists; otherwise use the title itself
    let typingTarget = heroTitle.querySelector('.typing-text');
    if (!typingTarget) {
      typingTarget = document.createElement('span');
      typingTarget.classList.add('typing-text');
      heroTitle.appendChild(typingTarget);
    }

    // Append a blinking cursor span (sibling of the typing text)
    let cursor = heroTitle.querySelector('.typing-cursor');
    if (!cursor) {
      cursor = document.createElement('span');
      cursor.classList.add('typing-cursor');
      cursor.textContent = '|';
      typingTarget.after(cursor);
    }

    const phrases = [
      'Game Developer',
      'Full Stack Developer',
      'Sinh viên CNTT',
      'Web Developer',
    ];

    const TYPE_SPEED = 70;   // ms per character when typing
    const DELETE_SPEED = 40; // ms per character when deleting
    const PAUSE = 2000;      // ms pause after typing completes

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        typingTarget.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
          // Finished typing — pause then start deleting
          isDeleting = true;
          setTimeout(tick, PAUSE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        // Deleting backward
        charIndex--;
        typingTarget.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, TYPE_SPEED);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    };

    tick();
  };

  initTypingEffect();

  /* ==========================================================
   * 8. SCROLL REVEAL ANIMATIONS
   * ========================================================== */

  /**
   * Observes elements with reveal classes and adds 'active' once
   * they scroll into view. Each element is revealed only once.
   */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // reveal only once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '-50px',
    }
  );

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================
   * 9. SCROLL UP BUTTON
   * ========================================================== */

  /**
   * Shows the scroll-up button after 500 px of scroll depth.
   */
  const handleScrollUpVisibility = () => {
    if (!scrollUpBtn) return;
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  };

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================
   * 10. COMBINED SCROLL HANDLER
   * ========================================================== */

  window.addEventListener('scroll', () => {
    handleNavScroll();
    handleScrollUpVisibility();
  }, { passive: true });

  /* ==========================================================
   * 11. SKILLS ACCORDION
   * ========================================================== */

  /**
   * Accordion behavior for skill groups. Clicking a header opens
   * its group and closes all other groups.
   */
  const skillHeaders = document.querySelectorAll('.skills__group-header');

  skillHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const parentGroup = header.closest('.skills__group');
      if (!parentGroup) return;

      const isCurrentlyOpen = parentGroup.classList.contains('open');

      // Close all groups first (accordion behavior)
      document.querySelectorAll('.skills__group').forEach((group) => {
        group.classList.remove('open');
      });

      // Re-open the clicked group if it was closed
      if (!isCurrentlyOpen) {
        parentGroup.classList.add('open');
      }
    });
  });

  /* ==========================================================
   * 12. QUALIFICATION TABS
   * ========================================================== */

  const qualTabs = document.querySelectorAll('.qualification__tab');
  const qualContents = document.querySelectorAll('.qualification__content');

  qualTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetSelector = tab.getAttribute('data-target');
      if (!targetSelector) return;

      const targetContent = document.querySelector(targetSelector);

      // Deactivate all tabs and contents
      qualTabs.forEach((t) => t.classList.remove('active'));
      qualContents.forEach((c) => c.classList.remove('active'));

      // Activate the clicked tab and its content
      tab.classList.add('active');
      if (targetContent) targetContent.classList.add('active');
    });
  });

  /* ==========================================================
   * 13. SERVICES MODALS
   * ========================================================== */

  /**
   * Opens the modal associated with a service card and closes it
   * via close button, backdrop click, or the Escape key.
   */
  const serviceLinks = document.querySelectorAll('.services__link');
  const modalCloseButtons = document.querySelectorAll('.modal__close');

  /** Close every open modal on the page */
  const closeAllModals = () => {
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.remove('active');
    });
  };

  // Open modal
  serviceLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.services__card');
      if (!card) return;

      const modal = card.querySelector('.modal');
      if (modal) modal.classList.add('active');
    });
  });

  // Close modal via close button
  modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.classList.remove('active');
    });
  });

  // Close modal via backdrop click (click on the overlay, not its content)
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      // Only close if the click was directly on the modal overlay
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close all modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  /* ==========================================================
   * 14. SWIPER INITIALIZATION (Portfolio Slider)
   * ========================================================== */

  /**
   * Initialises the Swiper carousel if the Swiper library and
   * the target container both exist on the page.
   */
  if (typeof Swiper !== 'undefined' && document.querySelector('.portfolio__swiper')) {
    const swiper = new Swiper('.portfolio__swiper', {
      cssMode: true,
      loop: true,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  /* ==========================================================
   * 15. CONTACT FORM ENHANCEMENT
   * ========================================================== */

  /**
   * Provides lightweight client-side validation and a simulated
   * success message for the contact form (no backend).
   */
  const contactForm = document.querySelector('.contact__form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = contactForm.querySelectorAll(
        'input[required], textarea[required]'
      );
      let isValid = true;

      inputs.forEach((input) => {
        // Reset state
        input.classList.remove('error', 'success');

        const value = input.value.trim();

        if (!value) {
          input.classList.add('error');
          isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.add('success');
        }
      });

      if (isValid) {
        // Show a styled inline message if a container exists, else alert
        const msgContainer = contactForm.querySelector('.contact__message');

        if (msgContainer) {
          msgContainer.textContent = 'Cảm ơn! Tin nhắn đã được gửi.';
          msgContainer.classList.add('success');

          setTimeout(() => {
            msgContainer.textContent = '';
            msgContainer.classList.remove('success');
          }, 5000);
        } else {
          alert('Cảm ơn! Tin nhắn đã được gửi.');
        }

        // Reset form fields and visual states
        contactForm.reset();
        inputs.forEach((input) => input.classList.remove('success'));
      }
    });

    // Clear error state on input focus
    contactForm.addEventListener(
      'focusin',
      (e) => {
        if (
          e.target.matches('input, textarea') &&
          e.target.classList.contains('error')
        ) {
          e.target.classList.remove('error');
        }
      }
    );
  }
});