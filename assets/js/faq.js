/* =============================================
   js/faq.js – Chỉ dùng cho faq.html
   Bao gồm: accordion, category sidebar nav
   ============================================= */

(function () {
  'use strict';

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all in same group
      const group = item.closest('.faq-list');
      group?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Category Sidebar Nav ── */
  const catLinks = document.querySelectorAll('.faq-cat-link[data-group]');

  catLinks.forEach(link => {
    link.addEventListener('click', () => {
      catLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const groupId = link.dataset.group;
      const target  = document.getElementById(groupId);
      if (target) {
        const offset = 90; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Highlight active category on scroll ── */
  const faqGroups = document.querySelectorAll('.faq-group[id]');
  if (faqGroups.length && catLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      faqGroups.forEach(group => {
        if (window.scrollY >= group.offsetTop - 120) {
          current = group.id;
        }
      });

      catLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.group === current);
      });
    }, { passive: true });
  }

})();
