const fs = require('fs');
let config = fs.readFileSync('assets/js/blog-config.js', 'utf8');
config = config.replace("'25/03/2026'", "'03/01/2026'");
fs.writeFileSync('assets/js/blog-config.js', config, 'utf8');
console.log('Date fixed');
