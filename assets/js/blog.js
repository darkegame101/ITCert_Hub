/* =============================================
   js/blog.js - Controller for Blog
   ============================================= */

(function () {
  'use strict';

  // --- 1. RENDER BLOG LIST (blog.html) ---
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid && typeof BLOG_DATA !== 'undefined') {
    let html = '';
    BLOG_DATA.posts.forEach(post => {
      html += `<div class="post-card" data-cat="${post.category}">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-thumb">
        <div class="post-card-content">
          <div class="post-meta">
            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
            <span><i class="fas fa-user"></i> ${post.author}</span>
          </div>
          <h3><a href="blog-post.html?id=${post.id}" class="post-title-link">${post.title}</a></h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <div style="margin-top:auto">
            <a href="blog-post.html?id=${post.id}" class="btn btn-outline" style="width:100%;text-align:center;">Đọc Tiếp</a>
          </div>
        </div>
      </div>`;
    });
    blogGrid.innerHTML = html;
  }

  // --- 2. RENDER SINGLE POST (blog-post.html) ---
  const postHeader = document.getElementById('blog-post-header');
  const postContent = document.getElementById('blog-post-content');
  if (postHeader && postContent && typeof BLOG_DATA !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = BLOG_DATA.posts.find(p => p.id === postId) || BLOG_DATA.posts[0]; // fallback to first

    // Update page title
    document.title = post.title + " | ITCert Hub";

    // Breadcrumb title update
    const bcTitle = document.getElementById('bc-title');
    if(bcTitle) bcTitle.textContent = post.title;

    postHeader.innerHTML = `
      <div class="container">
        <nav class="breadcrumb">
          <a href="index.html">Trang chủ</a>
          <i class="fas fa-chevron-right"></i>
          <a href="blog.html">Blog</a>
          <i class="fas fa-chevron-right"></i>
          <span>${post.title}</span>
        </nav>
        <div class="sec-label"><i class="fas fa-tag"></i> ${post.category.toUpperCase()}</div>
        <h1>${post.title}</h1>
        <div class="post-meta" style="justify-content:center; margin-top:15px; font-size:15px;">
          <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
          <span><i class="fas fa-user"></i> ${post.author}</span>
        </div>
      </div>
    `;

    postContent.innerHTML = post.content;
  }

  /* ── Category Filter ── */
  const catTabs = document.querySelectorAll('.cat-tab');
  const posts   = document.querySelectorAll('.post-card');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      document.querySelectorAll('.post-card').forEach(post => {
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
      document.querySelectorAll('.post-card').forEach(post => {
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

})();
