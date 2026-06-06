/* =============================================
   js/voucher.js – Chỉ dùng cho voucher.html
   Bao gồm: vendor tab filter, level filter, search
   ============================================= */

(function () {
  'use strict';

  const cards      = Array.from(document.querySelectorAll('.voucher-card'));
  const vendorTabs = document.querySelectorAll('.vendor-tab');
  const levelTabs  = document.querySelectorAll('.level-tab');
  const searchInput = document.getElementById('voucher-search');
  const resultsInfo = document.getElementById('results-info');

  let activeVendor = 'all';
  let activeLevel  = 'all';
  let searchQuery  = '';

  /* ── Filter Logic ── */
  function applyFilters() {
    let count = 0;

    cards.forEach(card => {
      const vendor = card.dataset.vendor || '';
      const level  = card.dataset.level  || '';
      const text   = card.textContent.toLowerCase();

      const vendorMatch = activeVendor === 'all' || vendor === activeVendor;
      const levelMatch  = activeLevel  === 'all' || level  === activeLevel;
      const searchMatch = searchQuery  === ''    || text.includes(searchQuery);

      const show = vendorMatch && levelMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) count++;
    });

    if (resultsInfo) {
      resultsInfo.innerHTML = `Đang hiển thị <strong>${count}</strong> voucher`;
    }
  }

  /* ── Vendor Tabs ── */
  vendorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vendorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeVendor = tab.dataset.vendor;
      applyFilters();
    });
  });

  /* ── Level Tabs ── */
  levelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      levelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLevel = tab.dataset.level;
      applyFilters();
    });
  });

  /* ── Search ── */
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* ── Initial count display ── */
  applyFilters();

})();
