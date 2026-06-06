const fs = require('fs');

let content = fs.readFileSync('voucher.html', 'utf8');

// Replace vendor tabs
const tabsRegex = /<div class="vendor-tabs">[\s\S]*?<\/div>/;
const newTabs = `<div class="vendor-tabs">
      <button class="vendor-tab active" data-vendor="all">
        <i class="fas fa-th-large"></i> Tất Cả
      </button>
      <button class="vendor-tab" data-vendor="aws">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" class="vendor-logo-inline"> AWS
      </button>
      <button class="vendor-tab" data-vendor="microsoft">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg" alt="Microsoft" class="vendor-logo-inline"> Microsoft
      </button>
      <button class="vendor-tab" data-vendor="google cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" class="vendor-logo-inline"> Google
      </button>
      <button class="vendor-tab" data-vendor="comptia">
        <img src="https://www.comptia.org/_next/image/?url=https%3A%2F%2Fimages4.cmp.optimizely.com%2F8623b0fab71111efac96d615e91762a5&w=128&q=90" alt="CompTIA" class="vendor-logo-inline"> CompTIA
      </button>
      <button class="vendor-tab" data-vendor="salesforce">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce" class="vendor-logo-inline"> Salesforce
      </button>
      <button class="vendor-tab" data-vendor="snowflake">
        <i class="fas fa-snowflake" style="color:#29B5E8;"></i> Snowflake
      </button>
      <button class="vendor-tab" data-vendor="oracle">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" class="vendor-logo-inline"> Oracle
      </button>
      <button class="vendor-tab" data-vendor="fortinet">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Fortinet_logo.svg" alt="Fortinet" class="vendor-logo-inline"> Fortinet
      </button>
      <button class="vendor-tab" data-vendor="the secops group">
        <i class="fas fa-user-secret" style="color:#00B4D8;"></i> SecOps Group
      </button>
      <button class="vendor-tab" data-vendor="ine security">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/INE_logo.svg" alt="INE" class="vendor-logo-inline"> INE
      </button>
      <button class="vendor-tab" data-vendor="cisco">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" class="vendor-logo-inline"> Cisco
      </button>
    </div>`;
content = content.replace(tabsRegex, newTabs);

// Replace voucher grid
const gridRegex = /<div class="voucher-grid">[\s\S]*?<\/div><!-- \/\.voucher-grid -->/;
const newGrid = `<div id="voucher-grid" class="voucher-grid"></div><!-- /.voucher-grid -->`;
content = content.replace(gridRegex, newGrid);

// Replace scripts
const scriptRegex = /<script src="js\/config\.js"><\/script>\s*<script src="js\/core\.js"><\/script>\s*<script src="js\/voucher\.js"><\/script>/;
const newScripts = `<script src="js/config.js"></script>\n<script src="js/products-config.js"></script>\n<script src="js/core.js"></script>\n<script src="js/voucher.js"></script>`;
content = content.replace(scriptRegex, newScripts);

fs.writeFileSync('voucher.html', content, 'utf8');
console.log('Update complete using Node.js!');
