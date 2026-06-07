const fs = require('fs');

let content = fs.readFileSync('blog.html', 'utf8');

// Replace everything inside post-list with empty div
const listRegex = /<div class="post-list">[\s\S]*?<\/div>\s*<!-- Sidebar -->/;
content = content.replace(listRegex, '<div class="post-list" id="blog-grid"></div>\n\n      <!-- Sidebar -->');

fs.writeFileSync('blog.html', content, 'utf8');
console.log('blog.html refactored post-list');
