/* =============================================
   js/dump.js – Chỉ dùng cho dump.html
   Bao gồm: accordion mở/đóng vendor sections,
            xem thử PDF preview qua Modal nhúng
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

  /* ── PDF Preview Modal Logic ── */
  const previewOverlay      = document.getElementById('preview-overlay');
  const previewTitle        = document.getElementById('preview-title');
  const previewIframe       = document.getElementById('preview-iframe');
  const previewIframeLoader = document.getElementById('preview-iframe-loader');
  const previewFallback     = document.getElementById('preview-fallback');
  const fallbackCode        = document.getElementById('fallback-code');
  const previewClose        = document.getElementById('preview-close');
  const closeFooterBtn      = document.getElementById('preview-btn-close-footer');
  const previewButtons      = document.querySelectorAll('.btn-preview');

  function openPreviewModal(code, name) {
    previewTitle.textContent = `${name} (${code}) – Bản Xem Thử`;
    previewFallback.classList.add('hidden');
    previewIframe.classList.add('hidden');
    previewIframeLoader.classList.remove('hidden');
    previewIframe.src = '';
    
    // Construct PDF path (expected folder: pdf/)
    const pdfUrl = `pdf/${code}-preview.pdf`;

    // Show modal and lock page scroll
    previewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Verify if PDF file exists on the server to prevent standard browser iframe 404 page
    fetch(pdfUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          // File exists, load it into the iframe
          previewIframe.src = pdfUrl;
          previewIframe.onload = () => {
            previewIframeLoader.classList.add('hidden');
            previewIframe.classList.remove('hidden');
          };
        } else {
          // File does not exist (404/etc), show custom fallback
          showFallback(code);
        }
      })
      .catch(() => {
        // Fallback for network issues / local dev without server
        if (window.location.protocol === 'file:') {
          previewIframe.src = pdfUrl;
          previewIframe.onload = () => {
            previewIframeLoader.classList.add('hidden');
            previewIframe.classList.remove('hidden');
          };
        } else {
          showFallback(code);
        }
      });
  }

  function showFallback(code) {
    fallbackCode.textContent = code;
    previewIframeLoader.classList.add('hidden');
    previewIframe.classList.add('hidden');
    previewFallback.classList.remove('hidden');
  }

  function closePreviewModal() {
    previewOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset source to stop any current loading
    previewIframe.src = '';
  }

  // Event listeners for open
  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.dataset.code;
      const name = btn.dataset.name;
      if (code && name) {
        openPreviewModal(code, name);
      }
    });
  });

  // Event listeners for close
  previewClose?.addEventListener('click', closePreviewModal);
  closeFooterBtn?.addEventListener('click', closePreviewModal);

  // Close when clicking outside modal box
  previewOverlay?.addEventListener('click', (e) => {
    if (e.target === previewOverlay) {
      closePreviewModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewOverlay?.classList.contains('open')) {
      closePreviewModal();
    }
  });

})();
