const fs = require('fs');
function fixEncoding(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        // This converts the UTF-8 decoded string (which contains ANSI garble) back into raw bytes
        let buffer = Buffer.from(content, 'binary');
        // Then decodes those bytes properly as UTF-8
        let fixed = buffer.toString('utf8');
        
        // Let's do a sanity check: does it still contain the garbled letters?
        if (fixed.includes('Ä')) {
            console.log('Failed to fix', filePath, '- might need a different approach.');
        } else {
            fs.writeFileSync(filePath, fixed, 'utf8');
            console.log('Fixed', filePath);
        }
    } catch(e) {
        console.error(e);
    }
}
fixEncoding('assets/js/voucher.js');
fixEncoding('assets/js/blog.js');
fixEncoding('assets/js/blog-config.js');
