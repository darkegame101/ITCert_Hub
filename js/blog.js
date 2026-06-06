/* =============================================
   js/blog.js – Dùng cho blog.html & blog-post.html
   Bao gồm: category filter, search, pagination
   ============================================= */

(function () {
  'use strict';

  /* ── Category Filter ── */
  const catTabs = document.querySelectorAll('.cat-tab');
  const posts   = document.querySelectorAll('.post-card[data-cat]');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      posts.forEach(post => {
        const show = cat === 'all' || post.dataset.cat === cat;
        post.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Blog Search ── */
  const blogSearch = document.getElementById('blog-search');
  if (blogSearch) {
    blogSearch.addEventListener('input', () => {
      const query = blogSearch.value.trim().toLowerCase();
      posts.forEach(post => {
        const match = post.textContent.toLowerCase().includes(query);
        post.style.display = match ? '' : 'none';
      });
    });
  }

  /* ── Newsletter Form ── */
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      btn.innerHTML = '<i class="fas fa-check"></i> Đã đăng ký!';
      btn.style.background = '#00a550';
      btn.disabled = true;
    });
  }

  /* ── FAQ Accordion (blog-post.html may have inline FAQ) ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

})();
