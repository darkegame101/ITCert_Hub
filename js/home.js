/* =============================================
   js/home.js – Chỉ dùng cho index.html
   Bao gồm: counter animation, vendor tabs, form
   ============================================= */

(function () {
  'use strict';

  /* ── Animated Counter ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString('vi-VN');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(el => obs.observe(el));
  }

  /* ── Home Vendor Tabs (voucher table preview) ── */
  const hvtBtns  = document.querySelectorAll('.hvt-btn');
  const vTables  = document.querySelectorAll('.vendor-table');

  hvtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const vendor = btn.dataset.vendor;

      hvtBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      vTables.forEach(t => {
        t.style.display = (t.dataset.vendor === vendor) ? '' : 'none';
      });
    });
  });

  /* ── Contact Form (if on homepage) ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const origText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-check"></i> Đã gửi thành công!';
      btn.style.background = '#00a550';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = origText;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  }

})();
