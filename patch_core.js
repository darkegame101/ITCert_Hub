const fs = require('fs');

let coreJs = fs.readFileSync('assets/js/core.js', 'utf8');

// The original logic is:
//   if (typeof ITCERT_CONFIG !== 'undefined') {
//     document.querySelectorAll('[data-config]').forEach(el => {
//       const key = el.dataset.config; ...

// We will replace this block with a function and then call the function.
const originalBlock = `  /*  Dynamic Contact Configuration Mapping  */
  if (typeof ITCERT_CONFIG !== 'undefined') {
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.dataset.config;
      if (ITCERT_CONFIG[key]) {
        if (el.tagName === 'A') {
          el.href = ITCERT_CONFIG[key];
        } else {
          el.textContent = ITCERT_CONFIG[key];
        }
      }
    });
  }`;

const newBlock = `  /*  Dynamic Contact Configuration Mapping  */
  window.applySocialLinks = function() {
    if (typeof ITCERT_CONFIG !== 'undefined') {
      document.querySelectorAll('[data-config]').forEach(el => {
        const key = el.dataset.config;
        if (ITCERT_CONFIG[key]) {
          if (el.tagName === 'A') {
            if (!el.hasAttribute('target')) el.setAttribute('target', '_blank'); // ensure target blank for social
            el.href = ITCERT_CONFIG[key];
          } else {
            el.textContent = ITCERT_CONFIG[key];
          }
        }
      });
    }
  };
  
  // Call it initially
  window.applySocialLinks();`;

// The actual comment in core.js has a weird character `` because of previous encoding issues or it's just a bullet point. Let's use regex to be safe.
const regex = /\/\* [^\n]+ Dynamic Contact Configuration Mapping [^\n]+ \*\/\s+if \(typeof ITCERT_CONFIG !== 'undefined'\) \{\s+document\.querySelectorAll\('\[data-config\]'\)\.forEach\(el => \{\s+const key = el\.dataset\.config;\s+if \(ITCERT_CONFIG\[key\]\) \{\s+if \(el\.tagName === 'A'\) \{\s+el\.href = ITCERT_CONFIG\[key\];\s+\} else \{\s+el\.textContent = ITCERT_CONFIG\[key\];\s+\}\s+\}\s+\}\);\s+\}/;

if (regex.test(coreJs)) {
    coreJs = coreJs.replace(regex, newBlock);
    fs.writeFileSync('assets/js/core.js', coreJs, 'utf8');
    console.log('core.js patched!');
} else {
    console.log('Regex did not match. Let me check the exact string.');
}
