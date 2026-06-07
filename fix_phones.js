const fs = require('fs');
const files = ['faq.html', 'dump.html', 'index.html', 'voucher.html', 'blog.html', 'blog-post.html', 'contact.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    content = content.replace(/0912 345 678/g, '038 241 1337');
    content = content.replace(/0912345678/g, '0382411337');
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed', file);
    }
  }
});
