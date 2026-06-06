/* =============================================
   js/core.js – Logic dùng ở TẤT CẢ các trang
   Bao gồm: sticky header, mobile nav, back-to-top,
            scroll animations (IntersectionObserver)
   ============================================= */

(function () {
  'use strict';

  /* ── Sticky Header ── */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Mobile Nav (hamburger + panel) ── */
  const hamburger  = document.getElementById('hamburger');
  const navPanel   = document.getElementById('nav-panel');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose   = document.getElementById('nav-close');

  function openNav() {
    navPanel?.classList.add('open');
    navOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navPanel?.classList.remove('open');
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openNav);
  navClose?.addEventListener('click', closeNav);
  navOverlay?.addEventListener('click', closeNav);

  /* Close nav when a link is clicked */
  navPanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ── Back to Top ── */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Scroll Animations (fade-in class) ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid items
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0) * 1 || 0);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    fadeEls.forEach((el, i) => {
      // Auto stagger siblings in same parent grid
      el.dataset.delay = (i % 4) * 80;
      obs.observe(el);
    });
  }

  /* ── Active nav link highlight ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Dynamic Contact Configuration Mapping ── */
  if (typeof ITCERT_CONFIG !== 'undefined') {
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.dataset.config;
      if (ITCERT_CONFIG[key]) {
        if (el.tagName === 'A') {
          el.href = ITCERT_CONFIG[key];
        } else {
          el.textContent = ITCERT_CONFIG[key];
        }
      }
    });
  }

  /* ── Support Widget Chat Popup ── */
  const trigger = document.getElementById('support-trigger');
  const popup = document.getElementById('support-popup');
  const closeBtn = document.getElementById('support-close');

  if (trigger && popup) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = popup.classList.toggle('open');
      
      const openIcon = trigger.querySelector('.chat-open-icon');
      const closeIcon = trigger.querySelector('.chat-close-icon');
      if (openIcon && closeIcon) {
        openIcon.style.display = isOpen ? 'none' : '';
        closeIcon.style.display = isOpen ? '' : 'none';
      }
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.remove('open');
      const openIcon = trigger.querySelector('.chat-open-icon');
      const closeIcon = trigger.querySelector('.chat-close-icon');
      if (openIcon && closeIcon) {
        openIcon.style.display = '';
        closeIcon.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && !trigger.contains(e.target)) {
        popup.classList.remove('open');
        const openIcon = trigger.querySelector('.chat-open-icon');
        const closeIcon = trigger.querySelector('.chat-close-icon');
        if (openIcon && closeIcon) {
          openIcon.style.display = '';
          closeIcon.style.display = 'none';
        }
      }
    });
  }

})();
