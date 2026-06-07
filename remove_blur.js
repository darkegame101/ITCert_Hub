const fs = require('fs');

let layout = fs.readFileSync('assets/css/layout.css', 'utf8');
layout = layout.replace(/filter: brightness\(1\.1\) contrast\(1\.02\);\s*/, '');
layout = layout.replace(/filter: brightness\(1\.25\) contrast\(1\.05\);\s*/, '');
layout = layout.replace(/backdrop-filter: blur\(12px\);\s*/, '');
layout = layout.replace(/-webkit-backdrop-filter: blur\(12px\);\s*/, '');
fs.writeFileSync('assets/css/layout.css', layout, 'utf8');

let voucher = fs.readFileSync('assets/css/voucher.css', 'utf8');
voucher = voucher.replace(/backdrop-filter: blur\(12px\);\s*/, '');
voucher = voucher.replace(/-webkit-backdrop-filter: blur\(12px\);\s*/, '');
fs.writeFileSync('assets/css/voucher.css', voucher, 'utf8');
console.log('Filters removed successfully');
