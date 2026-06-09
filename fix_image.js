const fs = require('fs');
let content = fs.readFileSync('assets/js/blog-config.js', 'utf8');
content = content.replace('nospacedevice.jpg', 'nospacedevice.png');
fs.writeFileSync('assets/js/blog-config.js', content, 'utf8');
console.log('Fixed image path');
