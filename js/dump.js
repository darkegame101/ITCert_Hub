/* =============================================
   js/dump.js – Chỉ dùng cho dump.html
   Bao gồm: accordion mở/đóng vendor sections
   ============================================= */

(function () {
  'use strict';

  /* ── Accordion ── */
  const headers = document.querySelectorAll('.dump-vendor-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen  = header.classList.contains('open');

      // Close all
      headers.forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling?.classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        header.classList.add('open');
        content?.classList.add('open');
      }
    });
  });

  /* Open first by default */
  if (headers.length) {
    headers[0].classList.add('open');
    headers[0].nextElementSibling?.classList.add('open');
  }

})();
