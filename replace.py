import re

with open('e:/ITCert Hub/voucher.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace vendor tabs
tabs_pattern = re.compile(r'<div class="vendor-tabs">.*?</div>', re.DOTALL)
new_tabs = '''<div class="vendor-tabs">
      <button class="vendor-tab active" data-vendor="all">
        <i class="fas fa-th-large"></i> T?t C?
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
    </div>'''
content = tabs_pattern.sub(new_tabs, content)

# Replace voucher grid
grid_pattern = re.compile(r'<div class="voucher-grid">.*?</div><!-- /\.voucher-grid -->', re.DOTALL)
new_grid = '<div id="voucher-grid" class="voucher-grid">\n      <!-- JS will render vouchers here -->\n    </div><!-- /.voucher-grid -->'
content = grid_pattern.sub(new_grid, content)

# Replace scripts
script_pattern = re.compile(r'<script src="js/config\.js"></script>\s*<script src="js/core\.js"></script>\s*<script src="js/voucher\.js"></script>', re.DOTALL)
new_scripts = '<script src="js/config.js"></script>\n<script src="js/products-config.js"></script>\n<script src="js/core.js"></script>\n<script src="js/voucher.js"></script>'
content = script_pattern.sub(new_scripts, content)

with open('e:/ITCert Hub/voucher.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement done!")
