/**
 * ==============================================================================
 * ATHARAV BALOTA — PERSONAL PORTFOLIO
 * SCRIPT.JS: Clean Modern Professional Theme Engine
 * Pure Vanilla JavaScript (No Frameworks or External Libraries)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const initMobileNav = () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const drawer = document.getElementById('mobileDrawer');
    const navLinks = drawer ? drawer.querySelectorAll('a') : [];

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
    });

    // Auto-close when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      }
    });
  };

  /* --------------------------------------------------------------------------
     2. SMOOTH SCROLLSPY & ACTIVE LINK HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* --------------------------------------------------------------------------
     3. EMAIL COPY TO CLIPBOARD WITH TOAST FEEDBACK
     -------------------------------------------------------------------------- */
  const initEmailCopy = () => {
    const copyBtn = document.getElementById('copyEmailBtn');
    const emailVal = document.getElementById('emailVal');
    const toast = document.getElementById('copyToast');
    const iconText = document.getElementById('copyIconText');

    if (!copyBtn || !emailVal) return;

    let toastTimer = null;

    copyBtn.addEventListener('click', async () => {
      const textToCopy = emailVal.textContent.trim();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback
          const tempArea = document.createElement('textarea');
          tempArea.value = textToCopy;
          document.body.appendChild(tempArea);
          tempArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempArea);
        }

        // Update button text
        if (iconText) iconText.textContent = 'Copied!';
        copyBtn.style.background = '#10B981';
        copyBtn.style.color = '#ffffff';

        // Show toast
        if (toast) {
          toast.classList.add('show');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            if (iconText) iconText.textContent = 'Copy';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2400);
        }

      } catch (err) {
        console.warn('Could not copy email automatically:', err);
      }
    });
  };

  /* --------------------------------------------------------------------------
     4. SCROLL REVEAL ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const initScrollAnimations = () => {
    const animElements = document.querySelectorAll(
      '.about-card, .venture-card, .timeline-card, .skill-card-modern, .edu-clean-card, .pursuit-card'
    );

    if (!animElements.length) return;

    if (!('IntersectionObserver' in window)) {
      animElements.forEach(el => el.style.opacity = '1');
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.08}s`;
      observer.observe(el);
    });

    // Helper class to trigger view
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(styleEl);
  };

  /* --------------------------------------------------------------------------
     5. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const initBackToTop = () => {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /* --------------------------------------------------------------------------
     6. INITIALIZATION
     -------------------------------------------------------------------------- */
  initMobileNav();
  initScrollSpy();
  initEmailCopy();
  initScrollAnimations();
  initBackToTop();
});
