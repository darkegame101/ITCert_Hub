/* =============================================
   js/voucher.js – Dùng cho voucher.html
   Bao gồm: Dynamic MVC Rendering, vendor tab filter, level filter, search
   ============================================= */

(function () {
  'use strict';

  const voucherGrid = document.getElementById('voucher-grid');
  const vendorTabs = document.querySelectorAll('.vendor-tab');
  const levelTabs  = document.querySelectorAll('.level-tab');
  const searchInput = document.getElementById('voucher-search');
  const resultsInfo = document.getElementById('results-info');

  let activeVendor = 'all';
  let activeLevel  = 'all';
  let searchQuery  = '';

  // Get data from config
  const vouchersData = (typeof VN_DATA !== 'undefined') ? VN_DATA.vouchers : [];

  const vendorLogos = {
      'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg',
      'Google Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
      'CompTIA': 'https://www.comptia.org/_next/image/?url=https%3A%2F%2Fimages4.cmp.optimizely.com%2F8623b0fab71111efac96d615e91762a5&w=128&q=90',
      'Salesforce': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
      'Oracle': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      'Red Hat': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg',
      'Fortinet': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Fortinet_logo.svg',
      'Cloud Native': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Kubernetes_logo.svg',
      'INE Security': 'https://upload.wikimedia.org/wikipedia/commons/0/05/INE_logo.svg',
      'Cisco': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg'
  };

  /* ── Render Logic (View) ── */
  function renderVouchers(vouchers) {
      if (!voucherGrid) return;
      voucherGrid.innerHTML = '';

      vouchers.forEach(v => {
          const logo = vendorLogos[v.vendor] || 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
          
          const levelClass = v.level ? 'level-' + v.level.toLowerCase() : 'level-associate';
          const originalPrice = v.original || '';
          
          let html = `
            <div class="voucher-card" data-vendor="${v.vendor.toLowerCase()}" data-level="${v.level.toLowerCase()}">
              <div class="voucher-card-stripe" style="background-color: ${v.color || '#333'}"></div>
              <div class="voucher-card-header">
                <div class="voucher-vendor-info">
                  <div class="vendor-icon"><img src="${logo}" alt="${v.vendor}" style="width:18px; height:18px; object-fit:contain;"></div>
                  <div class="vendor-label">${v.vendor}</div>
                </div>
                <div class="card-badges"><span class="level-badge ${levelClass}">${v.level}</span></div>
              </div>
              <div class="voucher-card-body">
                <div class="voucher-exam-code">${v.code}</div>
                <div class="voucher-name" style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; height: 48px;">${v.name.replace(' - Voucher Giảm Giá 100%', '').trim()}</div>
                <div class="voucher-meta">
                  <div class="voucher-meta-item"><i class="fas fa-clock"></i> Hiệu lực 180 ngày</div>
                  <div class="voucher-meta-item"><i class="fas fa-globe"></i> Thi tại hãng / VUE</div>
                </div>
                <div class="voucher-price-block mt-3">
                  <span class="price-old" style="font-size: 11px;">${originalPrice.replace(' (~', '<br>(~').replace(')', ')')}</span>
                  <span class="price-current">${v.price}</span>
                </div>
              </div>
              <div class="voucher-card-footer">
                <a href="#" class="btn btn-messenger" target="_blank" data-config="messenger"><i class="fab fa-facebook-messenger"></i> Messenger</a>
                <a href="#" class="btn btn-zalo" data-config="zalo"><i class="fas fa-comments"></i> Zalo</a>
              </div>
            </div>
          `;
          voucherGrid.insertAdjacentHTML('beforeend', html);
      });

      // Update social links via config
      if (typeof window.applySocialLinks === 'function') {
          window.applySocialLinks();
      }
  }

  /* ── Filter Logic (Controller) ── */
  function applyFilters() {
    let filtered = vouchersData.filter(v => {
      const vendorMatch = activeVendor === 'all' || v.vendor.toLowerCase() === activeVendor;
      const levelMatch  = activeLevel  === 'all' || v.level.toLowerCase()  === activeLevel;
      const searchMatch = searchQuery  === ''    || v.name.toLowerCase().includes(searchQuery) || v.code.toLowerCase().includes(searchQuery);

      return vendorMatch && levelMatch && searchMatch;
    });

    renderVouchers(filtered);

    if (resultsInfo) {
      resultsInfo.innerHTML = `Đang hiển thị <strong>${filtered.length}</strong> voucher`;
    }
  }

  /* ── Events ── */
  vendorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vendorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeVendor = tab.dataset.vendor.toLowerCase();
      applyFilters();
    });
  });

  levelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      levelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLevel = tab.dataset.level.toLowerCase();
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* ── Initial Render ── */
  applyFilters();

})();
