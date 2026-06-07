const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\25f95975-6da3-4dcd-a57f-c4dee9541d62\\.system_generated\\steps\\1247\\content.md', 'utf8');

// Use regex to extract headings and paragraphs within the post content
let extracted = [];
const regex = /<(h[23]|p)[^>]*>(.*?)<\/\1>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
    let tag = match[1];
    let text = match[2].replace(/<[^>]+>/g, '').trim();
    if (text.length > 10 && !text.includes('Elementor') && !text.includes('Related Posts')) {
        extracted.push(`<${tag}>${text}</${tag}>`);
    }
}

fs.writeFileSync('extracted_post.html', extracted.join('\n\n'));
console.log('Done extracting.');
