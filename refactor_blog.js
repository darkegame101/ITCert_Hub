const fs = require('fs');

let content = fs.readFileSync('blog.html', 'utf8');

// Replace everything inside blog-grid with empty div
const gridRegex = /<div class="blog-grid">([\s\S]*?)<\/div>\s*<!-- \/\.blog-grid -->/;
content = content.replace(gridRegex, '<div class="blog-grid" id="blog-grid"></div>\n      <!-- /.blog-grid -->');

// Add the blog-config.js before blog.js
const jsRegex = /<script src="assets\/js\/blog\.js"><\/script>/;
content = content.replace(jsRegex, '<script src="assets/js/blog-config.js"></script>\n<script src="assets/js/blog.js"></script>');

fs.writeFileSync('blog.html', content, 'utf8');
console.log('blog.html refactored');
