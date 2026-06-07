const fs = require('fs');

// 1. UPDATE BLOG.JS WITH PROPER TEMPLATE & SIDEBAR LOGIC
let blogJs = fs.readFileSync('assets/js/blog.js', 'utf8');

const newGridLogic = `  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid && typeof BLOG_DATA !== 'undefined') {
    let html = '';
    BLOG_DATA.posts.forEach(post => {
      // If it's a logo, contain it with padding, otherwise cover it.
      const isLogo = post.thumbnail.includes('logo.png');
      const imgStyle = isLogo ? 'width:100%; height:100%; object-fit:contain; padding:20px;' : 'width:100%; height:100%; object-fit:cover;';
      const catLabel = post.category.toUpperCase();
      
      html += \`<article class="post-card fade-in" data-cat="\${post.category}">
        <div class="post-thumb" style="width:300px; min-height:200px; overflow:hidden; position:relative; background:#f8f9fa;">
          <img src="\${post.thumbnail}" alt="\${post.title}" style="\${imgStyle}">
          <span class="post-cat-tag cat-\${post.category}" style="position:absolute; top:10px; left:10px; background:var(--primary); color:white; padding:4px 10px; border-radius:4px; font-size:12px; font-weight:bold;">\${catLabel}</span>
        </div>
        <div class="post-body" style="padding: 20px; display:flex; flex-direction:column;">
          <div class="post-meta" style="margin-bottom:10px; color:#6b7280; font-size:13px; display:flex; gap:15px;">
            <span><i class="fas fa-calendar-alt"></i> \${post.date}</span>
            <span><i class="fas fa-user"></i> \${post.author}</span>
          </div>
          <h3 style="margin:0 0 10px 0; font-size:20px; line-height:1.4;"><a href="blog-post.html?id=\${post.id}" class="post-title-link" style="color:var(--dark); text-decoration:none;">\${post.title}</a></h3>
          <p class="post-excerpt" style="color:#4b5563; font-size:14px; line-height:1.6; margin-bottom:20px; flex-grow:1;">\${post.excerpt}</p>
          <div class="post-footer" style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #e5e7eb; padding-top:15px; margin-top:auto;">
            <div class="post-author" style="display:flex; align-items:center; gap:10px;">
              <div class="post-author-av" style="width:30px; height:30px; background:var(--primary); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold;">AD</div>
              <span style="font-size:14px; font-weight:600;">\${post.author}</span>
            </div>
            <a href="blog-post.html?id=\${post.id}" class="post-readmore" style="color:var(--primary); font-weight:600; text-decoration:none; font-size:14px;">Đọc Tiếp <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </article>\`;
    });
    blogGrid.innerHTML = html;
  }`;

blogJs = blogJs.replace(/const blogGrid = document\.getElementById\('blog-grid'\);[\s\S]*?if \(postHeader && postContent/, newGridLogic + '\n\n  // --- 2. RENDER SINGLE POST (blog-post.html) ---\n  const postHeader = document.getElementById(\'blog-post-header\');\n  const postContent = document.getElementById(\'blog-post-content\');\n  if (postHeader && postContent');

// Append Sidebar Logic
blogJs += `\n
  /* ── RENDER SIDEBAR POPULAR POSTS ── */
  const popularLists = document.querySelectorAll('.popular-list');
  if (popularLists.length > 0 && typeof BLOG_DATA !== 'undefined') {
    let sidebarHtml = '';
    BLOG_DATA.posts.slice(0, 4).forEach((post, index) => {
      sidebarHtml += \`<div class="popular-item">
        <span class="pop-num">0\${index + 1}</span>
        <div><div class="pop-title"><a href="blog-post.html?id=\${post.id}">\${post.title}</a></div><div class="pop-meta">\${post.date}</div></div>
      </div>\`;
    });
    popularLists.forEach(list => {
      list.innerHTML = sidebarHtml;
    });
  }
`;

fs.writeFileSync('assets/js/blog.js', blogJs, 'utf8');

// 2. REMOVE HARDCODED SIDEBAR POSTS IN BLOG.HTML
let blogHtml = fs.readFileSync('blog.html', 'utf8');
const sbRegex = /<div class="popular-list">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
blogHtml = blogHtml.replace(sbRegex, '<div class="popular-list"></div>\n          </div>\n        </div>');
fs.writeFileSync('blog.html', blogHtml, 'utf8');

// 3. REMOVE HARDCODED SIDEBAR POSTS IN BLOG-POST.HTML
let blogPostHtml = fs.readFileSync('blog-post.html', 'utf8');
blogPostHtml = blogPostHtml.replace(sbRegex, '<div class="popular-list"></div>\n          </div>\n        </div>');
fs.writeFileSync('blog-post.html', blogPostHtml, 'utf8');

console.log('Fixed styles and sidebars');
