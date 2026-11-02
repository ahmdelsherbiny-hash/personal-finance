/**
 * محفظتي - Personal Finance Portal
 * Core Application Logic & State Management
 */

// Category Configurations
const CATEGORIES = {
  expense: [
    { id: 'food', name: 'طعام ومشروبات', icon: '🍔', color: '#f59e0b' },
    { id: 'housing', name: 'سكن وفواتير', icon: '🏠', color: '#3b82f6' },
    { id: 'transport', name: 'مواصلات وبنزين', icon: '🚗', color: '#10b981' },
    { id: 'shopping', name: 'تسوق وملابس', icon: '🛍️', color: '#ec4899' },
    { id: 'health', name: 'صحة وأدوية', icon: '💊', color: '#ef4444' },
    { id: 'education', name: 'تعليم وتطوير', icon: '📚', color: '#8b5cf6' },
    { id: 'entertainment', name: 'ترفيه وخروجات', icon: '🎬', color: '#06b6d4' },
    { id: 'subscriptions', name: 'اشتراكات وخدمات', icon: '📱', color: '#6366f1' },
    { id: 'other_exp', name: 'مصاريف أخرى', icon: '📦', color: '#64748b' }
  ],
  income: [
    { id: 'salary', name: 'راتب شهري', icon: '💼', color: '#10b981' },
    { id: 'freelance', name: 'عمل حر / مشاريع', icon: '💻', color: '#06b6d4' },
    { id: 'investment', name: 'استثمارات وعوائد', icon: '📈', color: '#8b5cf6' },
    { id: 'gift', name: 'هدايا ومكافآت', icon: '🎁', color: '#ec4899' },
    { id: 'other_inc', name: 'دخل آخر', icon: '💰', color: '#f59e0b' }
  ]
};

const PAYMENT_METHODS = {
  cash: { name: 'كاش (نقدي)', icon: 'banknote' },
  card: { name: 'بطاقة بنكية', icon: 'credit-card' },
  wallet: { name: 'محفظة إلكترونية', icon: 'smartphone' },
  bank: { name: 'تحويل بنكي', icon: 'landmark' },
  other: { name: 'أخرى', icon: 'layers' }
};

// Initial Sample Data (for instant informative view on first run)
function getSampleTransactions() {
  const now = new Date();
  const year = now.getFullYear();
  const monthStr = String(now.getMonth() + 1).padStart(2, '0');

  return [
    {
      id: 'tx-1',
      type: 'income',
      amount: 25000,
      category: 'salary',
      date: `${year}-${monthStr}-01`,
      paymentMethod: 'bank',
      note: 'راتب الشهر الأساسي',
      createdAt: Date.now() - 1000000
    },
    {
      id: 'tx-2',
      type: 'income',
      amount: 4500,
      category: 'freelance',
      date: `${year}-${monthStr}-05`,
      paymentMethod: 'wallet',
      note: 'تصميم موقع ويب لعميل',
      createdAt: Date.now() - 800000
    },
    {
      id: 'tx-3',
      type: 'expense',
      amount: 3200,
      category: 'housing',
      date: `${year}-${monthStr}-02`,
      paymentMethod: 'bank',
      note: 'إيجار وفاتورة الكهرباء والإنترنت',
      createdAt: Date.now() - 750000
    },
    {
      id: 'tx-4',
      type: 'expense',
      amount: 1850,
      category: 'food',
      date: `${year}-${monthStr}-04`,
      paymentMethod: 'card',
      note: 'مشتريات السوبرماركت الأسبوعية',
      createdAt: Date.now() - 600000
    },
    {
      id: 'tx-5',
      type: 'expense',
      amount: 450,
      category: 'transport',
      date: `${year}-${monthStr}-06`,
      paymentMethod: 'cash',
      note: 'تفويلة بنزين وكارتات',
      createdAt: Date.now() - 400000
    },
    {
      id: 'tx-6',
      type: 'expense',
      amount: 720,
      category: 'entertainment',
      date: `${year}-${monthStr}-07`,
      paymentMethod: 'card',
      note: 'عشاء مع الأصدقاء وسينما',
      createdAt: Date.now() - 250000
    },
    {
      id: 'tx-7',
      type: 'expense',
      amount: 350,
      category: 'subscriptions',
      date: `${year}-${monthStr}-08`,
      paymentMethod: 'card',
      note: 'اشتراك نتفليكس وسبوتيفاي',
      createdAt: Date.now() - 100000
    }
  ];
}

// App State
let appState = {
  transactions: [],
  settings: {
    currency: 'EGP',
    userName: 'أحمد',
    monthlyBudget: 12000,
    theme: 'dark'
  },
  selectedMonth: '', // 'YYYY-MM'
  editingTxId: null
};

// Chart instances
let categoryChart = null;
let dailyChart = null;
let monthlyTrendChart = null;
let paymentMethodsChart = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  initLucide();
  populateMonthFilter();
  renderAll();
});

// Load Data from LocalStorage
function loadData() {
  const savedSettings = localStorage.getItem('mf_settings');
  if (savedSettings) {
    try {
      appState.settings = { ...appState.settings, ...JSON.parse(savedSettings) };
    } catch (e) {
      console.error('Settings parse error', e);
    }
  }

  // Apply Theme
  applyTheme(appState.settings.theme);

  // Apply Settings to UI
  document.getElementById('currencySelect').value = appState.settings.currency;
  document.getElementById('userNameInput').value = appState.settings.userName || '';
  document.getElementById('monthlyBudgetLimitInput').value = appState.settings.monthlyBudget || '';
  updateCurrencyDisplay();

  const savedTx = localStorage.getItem('mf_transactions');
  if (savedTx) {
    try {
      appState.transactions = JSON.parse(savedTx);
    } catch (e) {
      console.error('Transactions parse error', e);
      appState.transactions = getSampleTransactions();
    }
  } else {
    // First time visitor: seed realistic sample transactions
    appState.transactions = getSampleTransactions();
    saveTransactions();
  }

  // Set default selected month to current month
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  appState.selectedMonth = currentMonth;

  // Display top bar date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDateDisplay').textContent = today.toLocaleDateString('ar-EG', dateOptions);
}

function saveTransactions() {
  localStorage.setItem('mf_transactions', JSON.stringify(appState.transactions));
}

function saveSettings() {
  localStorage.setItem('mf_settings', JSON.stringify(appState.settings));
}

function initLucide() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation Tabs
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
      // Close mobile sidebar if open
      document.querySelector('.sidebar').classList.remove('mobile-open');
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('mobile-open');
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      applyTheme(newTheme);
      appState.settings.theme = newTheme;
      saveSettings();
      // Rerender charts for theme-specific colors
      renderCharts();
    });
  }

  // Month Filter Change
  const monthFilter = document.getElementById('monthFilter');
  monthFilter.addEventListener('change', (e) => {
    appState.selectedMonth = e.target.value;
    renderAll();
  });

  // View All Transactions Button on Dashboard
  const viewAllTxBtn = document.getElementById('viewAllTxBtn');
  if (viewAllTxBtn) {
    viewAllTxBtn.addEventListener('click', () => {
      switchTab('transactions');
    });
  }

  // Modal Open / Close
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const backdrop = document.getElementById('txModalBackdrop');

  openAddModalBtn.addEventListener('click', () => openAddModal());
  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Transaction Type radio change inside modal
  const typeRadios = document.querySelectorAll('input[name="txType"]');
  typeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      populateCategoryOptions(radio.value);
    });
  });

  // Form Submit
  const txForm = document.getElementById('txForm');
  txForm.addEventListener('submit', handleFormSubmit);

  // Table filters & Search
  document.getElementById('txSearchInput').addEventListener('input', renderTransactionsTable);
  document.getElementById('txTypeFilter').addEventListener('change', renderTransactionsTable);
  document.getElementById('txCategoryFilter').addEventListener('change', renderTransactionsTable);

  // Export CSV
  document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);

  // Settings: Save General
  document.getElementById('saveGeneralSettingsBtn').addEventListener('click', () => {
    appState.settings.currency = document.getElementById('currencySelect').value;
    appState.settings.userName = document.getElementById('userNameInput').value.trim();
    saveSettings();
    updateCurrencyDisplay();
    renderAll();
    showToast('تم حفظ الإعدادات بنجاح', 'success');
  });

  // Budget Limit Save
  document.getElementById('saveBudgetLimitBtn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('monthlyBudgetLimitInput').value);
    if (!isNaN(val) && val >= 0) {
      appState.settings.monthlyBudget = val;
      saveSettings();
      renderBudgets();
      showToast('تم تحديث الميزانية الشهرية', 'success');
    } else {
      showToast('يرجى إدخال رقم صحيح للميزانية', 'error');
    }
  });

  // Backup & Restore
  document.getElementById('downloadBackupBtn').addEventListener('click', downloadBackup);
  document.getElementById('restoreBackupInput').addEventListener('change', handleRestoreFile);
  document.getElementById('loadSampleDataBtn').addEventListener('click', () => {
    if (confirm('هل أنت متأكد من استعادة البيانات التجريبية؟ لن يتم مسح بياناتك الحالية وسيتم دمجها.')) {
      appState.transactions = [...getSampleTransactions(), ...appState.transactions];
      saveTransactions();
      populateMonthFilter();
      renderAll();
      showToast('تم تحميل البيانات التجريبية', 'success');
    }
  });

  document.getElementById('clearAllDataBtn').addEventListener('click', () => {
    if (confirm('تحذير: هل أنت متأكد تماماً من رغبتك في مسح جميع المعاملات نهائياً؟')) {
      appState.transactions = [];
      saveTransactions();
      populateMonthFilter();
      renderAll();
      showToast('تم مسح جميع البيانات', 'info');
    }
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));

  const navBtn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  const targetPane = document.getElementById(`tab-${tabId}`);

  if (navBtn) navBtn.classList.add('active');
  if (targetPane) targetPane.classList.add('active');

  // Update Page Title
  const titles = {
    dashboard: 'لوحة التحكم',
    transactions: 'سجل المعاملات',
    analytics: 'التقارير والتحليلات',
    budgets: 'الميزانيات والأهداف',
    settings: 'الإعدادات والبيانات'
  };
  document.getElementById('pageTitle').textContent = titles[tabId] || 'محفظتي';

  // Resize charts if switching to a tab with charts
  if (tabId === 'dashboard' || tabId === 'analytics') {
    setTimeout(renderCharts, 100);
  }
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }
}

function updateCurrencyDisplay() {
  const curr = appState.settings.currency || 'EGP';
  document.getElementById('currencySymbolText').textContent = curr;
  document.getElementById('modalCurrencySymbol').textContent = curr;
}

function formatMoney(amount) {
  const curr = appState.settings.currency || 'EGP';
  return `${Number(amount).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;
}

// Populate Months Filter
function populateMonthFilter() {
  const select = document.getElementById('monthFilter');
  const monthsSet = new Set();

  // Current month
  const today = new Date();
  const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  monthsSet.add(currentMonthStr);

  appState.transactions.forEach(tx => {
    if (tx.date) {
      monthsSet.add(tx.date.substring(0, 7));
    }
  });

  const sortedMonths = Array.from(monthsSet).sort().reverse();
  select.innerHTML = '';

  sortedMonths.forEach(m => {
    const [year, month] = m.split('-');
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, 1);
    const label = dateObj.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });

    const option = document.createElement('option');
    option.value = m;
    option.textContent = label;
    if (m === appState.selectedMonth) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  if (!sortedMonths.includes(appState.selectedMonth) && sortedMonths.length > 0) {
    appState.selectedMonth = sortedMonths[0];
  }
}

// Populate Category Options in Modal & Filter
function populateCategoryOptions(type = 'expense', selectedCategory = '') {
  const select = document.getElementById('txCategory');
  select.innerHTML = '';

  const list = CATEGORIES[type] || [];
  list.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = `${cat.icon} ${cat.name}`;
    if (cat.id === selectedCategory) opt.selected = true;
    select.appendChild(opt);
  });

  // Also populate transactions tab category filter
  const filterSelect = document.getElementById('txCategoryFilter');
  const allCats = [...CATEGORIES.expense, ...CATEGORIES.income];
  let filterHtml = '<option value="all">كل الفئات</option>';
  allCats.forEach(c => {
    filterHtml += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
  });
  filterSelect.innerHTML = filterHtml;
}

// Modal Handlers
function openAddModal(editTxId = null) {
  const backdrop = document.getElementById('txModalBackdrop');
  const form = document.getElementById('txForm');
  form.reset();

  const todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('txDate').value = todayStr;

  if (editTxId) {
    appState.editingTxId = editTxId;
    const tx = appState.transactions.find(t => t.id === editTxId);
    if (tx) {
      document.getElementById('modalTitle').textContent = 'تعديل المعاملة';
      document.querySelector(`input[name="txType"][value="${tx.type}"]`).checked = true;
      populateCategoryOptions(tx.type, tx.category);
      document.getElementById('txAmount').value = tx.amount;
      document.getElementById('txDate').value = tx.date;
      document.getElementById('txPaymentMethod').value = tx.paymentMethod || 'cash';
      document.getElementById('txNote').value = tx.note || '';
    }
  } else {
    appState.editingTxId = null;
    document.getElementById('modalTitle').textContent = 'إضافة معاملة جديدة';
    document.querySelector('input[name="txType"][value="expense"]').checked = true;
    populateCategoryOptions('expense');
  }

  backdrop.classList.add('open');
  initLucide();
}

function closeModal() {
  const backdrop = document.getElementById('txModalBackdrop');
  backdrop.classList.remove('open');
  appState.editingTxId = null;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const type = document.querySelector('input[name="txType"]:checked').value;
  const amount = parseFloat(document.getElementById('txAmount').value);
  const category = document.getElementById('txCategory').value;
  const date = document.getElementById('txDate').value;
  const paymentMethod = document.getElementById('txPaymentMethod').value;
  const note = document.getElementById('txNote').value.trim();

  if (isNaN(amount) || amount <= 0) {
    showToast('يرجى إدخال مبلغ صحيح أكبر من الصفر', 'error');
    return;
  }

  if (appState.editingTxId) {
    // Update
    const idx = appState.transactions.findIndex(t => t.id === appState.editingTxId);
    if (idx !== -1) {
      appState.transactions[idx] = {
        ...appState.transactions[idx],
        type,
        amount,
        category,
        date,
        paymentMethod,
        note
      };
      showToast('تم تعديل المعاملة بنجاح', 'success');
    }
  } else {
    // New
    const newTx = {
      id: 'tx-' + Date.now(),
      type,
      amount,
      category,
      date,
      paymentMethod,
      note,
      createdAt: Date.now()
    };
    appState.transactions.unshift(newTx);
    showToast('تمت إضافة المعاملة بنجاح', 'success');
  }

  saveTransactions();
  closeModal();
  populateMonthFilter();
  renderAll();
}

function deleteTransaction(id) {
  if (confirm('هل أنت متأكد من حذف هذه المعاملة؟')) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    saveTransactions();
    populateMonthFilter();
    renderAll();
    showToast('تم حذف المعاملة', 'info');
  }
}

// Render Everything
function renderAll() {
  const filtered = getFilteredMonthTransactions();
  renderStats(filtered);
  renderRecentDashboardList(filtered);
  renderTransactionsTable();
  renderCharts();
  renderBudgets();
  initLucide();
}

function getFilteredMonthTransactions() {
  if (!appState.selectedMonth) return appState.transactions;
  return appState.transactions.filter(tx => tx.date && tx.date.startsWith(appState.selectedMonth));
}

// 1. Stats Rendering
function renderStats(monthTx) {
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  const todayStr = new Date().toISOString().split('T')[0];
  let todaySpent = 0;

  monthTx.forEach(tx => {
    const amt = Number(tx.amount);
    if (tx.type === 'income') {
      totalIncome += amt;
      incomeCount++;
    } else {
      totalExpense += amt;
      expenseCount++;
      if (tx.date === todayStr) {
        todaySpent += amt;
      }
    }
  });

  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netBalance / totalIncome) * 100)) : 0;

  // Days in selected month for average
  const [year, month] = appState.selectedMonth.split('-');
  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
  const dailyAvg = totalExpense > 0 ? (totalExpense / daysInMonth) : 0;

  document.getElementById('netBalanceVal').textContent = formatMoney(netBalance);
  document.getElementById('netBalanceVal').style.color = netBalance >= 0 ? 'var(--income)' : 'var(--expense)';
  document.getElementById('savingsRateVal').textContent = `معدل الادخار: ${savingsRate}%`;

  document.getElementById('totalIncomeVal').textContent = formatMoney(totalIncome);
  document.getElementById('incomeCountVal').textContent = `${incomeCount} عملية واردة`;

  document.getElementById('totalExpenseVal').textContent = formatMoney(totalExpense);
  document.getElementById('expenseCountVal').textContent = `${expenseCount} عملية صرف`;

  document.getElementById('dailyAvgVal').textContent = formatMoney(dailyAvg);
  document.getElementById('todaySpentVal').textContent = `صرف اليوم: ${formatMoney(todaySpent)}`;
}

// Helper: Get category info
function getCategoryInfo(type, catId) {
  const list = CATEGORIES[type] || [];
  const found = list.find(c => c.id === catId);
  return found || { id: catId, name: catId, icon: '🏷️', color: '#64748b' };
}

// 2. Recent Transactions (Dashboard Preview)
function renderRecentDashboardList(monthTx) {
  const container = document.getElementById('dashboardRecentList');
  const recents = [...monthTx].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  if (recents.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        لا توجد معاملات مسجلة في هذا الشهر حتى الآن.
      </div>`;
    return;
  }

  container.innerHTML = recents.map(tx => {
    const cat = getCategoryInfo(tx.type, tx.category);
    const isIncome = tx.type === 'income';
    const sign = isIncome ? '+' : '-';
    const amountClass = isIncome ? 'income' : 'expense';
    const dateFormatted = new Date(tx.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });

    return `
      <div class="tx-row-item">
        <div class="tx-item-left">
          <div class="category-icon-box" style="background: ${cat.color}20; color: ${cat.color};">
            <span>${cat.icon}</span>
          </div>
          <div class="tx-meta-info">
            <span class="tx-title">${tx.note || cat.name}</span>
            <div class="tx-sub">
              <span>${cat.name}</span>
              <span>•</span>
              <span>${dateFormatted}</span>
            </div>
          </div>
        </div>
        <div class="tx-amount ${amountClass}">
          ${sign} ${formatMoney(tx.amount)}
        </div>
      </div>
    `;
  }).join('');
}

// 3. Transactions Table
function renderTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  const emptyState = document.getElementById('noTransactionsState');
  const table = document.getElementById('transactionsTable');

  const query = document.getElementById('txSearchInput').value.toLowerCase().trim();
  const typeFilter = document.getElementById('txTypeFilter').value;
  const categoryFilter = document.getElementById('txCategoryFilter').value;

  let filtered = [...appState.transactions];

  // Month filter applies if not 'all'
  if (appState.selectedMonth) {
    filtered = filtered.filter(tx => tx.date && tx.date.startsWith(appState.selectedMonth));
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter(tx => tx.type === typeFilter);
  }

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(tx => tx.category === categoryFilter);
  }

  if (query) {
    filtered = filtered.filter(tx => {
      const cat = getCategoryInfo(tx.type, tx.category);
      return (
        (tx.note && tx.note.toLowerCase().includes(query)) ||
        cat.name.toLowerCase().includes(query) ||
        String(tx.amount).includes(query)
      );
    });
  }

  // Sort by date descending
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    table.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  table.classList.remove('hidden');

  tbody.innerHTML = filtered.map(tx => {
    const cat = getCategoryInfo(tx.type, tx.category);
    const isIncome = tx.type === 'income';
    const typeLabel = isIncome ? 'دخل' : 'مصروف';
    const typeTagClass = isIncome ? 'income' : 'expense';
    const sign = isIncome ? '+' : '-';
    const methodInfo = PAYMENT_METHODS[tx.paymentMethod] || PAYMENT_METHODS.other;

    return `
      <tr>
        <td>
          <span class="type-tag ${typeTagClass}">${typeLabel}</span>
        </td>
        <td>
          <span style="display:inline-flex; align-items:center; gap:0.4rem;">
            <span>${cat.icon}</span>
            <strong>${cat.name}</strong>
          </span>
        </td>
        <td>${tx.note || '<span style="color:var(--text-muted);">-</span>'}</td>
        <td>${methodInfo.name}</td>
        <td>${tx.date}</td>
        <td style="font-weight:800; direction:ltr; text-align:right;" class="${typeTagClass}">
          ${sign} ${formatMoney(tx.amount)}
        </td>
        <td class="actions-col">
          <div class="action-btns">
            <button class="action-btn-mini" onclick="openAddModal('${tx.id}')" title="تعديل">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="action-btn-mini delete" onclick="deleteTransaction('${tx.id}')" title="حذف">
              <i data-lucide="trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  initLucide();
}

// 4. Charts Rendering
function renderCharts() {
  const monthTx = getFilteredMonthTransactions();
  const isDark = document.body.classList.contains('dark-theme');
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  // Category Doughnut Chart
  const expenseTx = monthTx.filter(t => t.type === 'expense');
  const categoryTotals = {};

  expenseTx.forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + Number(tx.amount);
  });

  const catKeys = Object.keys(categoryTotals);
  const catLabels = [];
  const catData = [];
  const catColors = [];

  catKeys.forEach(key => {
    const info = getCategoryInfo('expense', key);
    catLabels.push(info.name);
    catData.push(categoryTotals[key]);
    catColors.push(info.color);
  });

  // Render Category Doughnut
  const doughnutCtx = document.getElementById('categoryDoughnutChart');
  if (doughnutCtx) {
    if (categoryChart) categoryChart.destroy();

    if (catData.length === 0) {
      // Empty state chart
      categoryChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['لا توجد مصاريف'],
          datasets: [{ data: [1], backgroundColor: [isDark ? '#1e293b' : '#e2e8f0'] }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { tooltip: { enabled: false } }
        }
      });
      document.getElementById('chartLegendCustom').innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem;">سجل أول مصروف لعرض النسب</span>';
    } else {
      categoryChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: catLabels,
          datasets: [{
            data: catData,
            backgroundColor: catColors,
            borderWidth: 0,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${formatMoney(ctx.parsed)}`
              }
            }
          }
        }
      });

      // Custom Legend
      const totalExpense = catData.reduce((a, b) => a + b, 0);
      document.getElementById('chartLegendCustom').innerHTML = catLabels.map((lbl, i) => {
        const pct = Math.round((catData[i] / totalExpense) * 100);
        return `
          <span class="legend-pill">
            <span class="legend-dot" style="background: ${catColors[i]};"></span>
            <span>${lbl}</span>
            <strong>${pct}%</strong>
          </span>
        `;
      }).join('');
    }
  }

  // Daily Spending Bar Chart
  const barCtx = document.getElementById('dailySpendingBarChart');
  if (barCtx) {
    if (dailyChart) dailyChart.destroy();

    const [year, month] = appState.selectedMonth.split('-');
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const daysLabels = [];
    const dailyExpenses = new Array(daysInMonth).fill(0);

    for (let d = 1; d <= daysInMonth; d++) {
      daysLabels.push(`${d}`);
    }

    expenseTx.forEach(tx => {
      if (tx.date) {
        const dayNum = parseInt(tx.date.split('-')[2], 10);
        if (dayNum >= 1 && dayNum <= daysInMonth) {
          dailyExpenses[dayNum - 1] += Number(tx.amount);
        }
      }
    });

    dailyChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: daysLabels,
        datasets: [{
          label: 'المصروف',
          data: dailyExpenses,
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `يوم ${items[0].label} من الشهر`,
              label: (ctx) => `المصروف: ${formatMoney(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 } }
          }
        }
      }
    });
  }

  // 6-Month Comparison Trend Chart (in Analytics tab)
  const trendCtx = document.getElementById('monthlyTrendChart');
  if (trendCtx) {
    if (monthlyTrendChart) monthlyTrendChart.destroy();

    // Compute last 6 months
    const last6Months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push(mStr);
    }

    const trendIncome = [];
    const trendExpense = [];
    const monthNames = [];

    last6Months.forEach(m => {
      const [y, mn] = m.split('-');
      const dObj = new Date(parseInt(y), parseInt(mn) - 1, 1);
      monthNames.push(dObj.toLocaleDateString('ar-EG', { month: 'short' }));

      let inc = 0;
      let exp = 0;
      appState.transactions.forEach(t => {
        if (t.date && t.date.startsWith(m)) {
          if (t.type === 'income') inc += Number(t.amount);
          else exp += Number(t.amount);
        }
      });
      trendIncome.push(inc);
      trendExpense.push(exp);
    });

    monthlyTrendChart = new Chart(trendCtx, {
      type: 'bar',
      data: {
        labels: monthNames,
        datasets: [
          {
            label: 'الدخل',
            data: trendIncome,
            backgroundColor: '#10b981',
            borderRadius: 6
          },
          {
            label: 'المصروف',
            data: trendExpense,
            backgroundColor: '#ef4444',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { family: 'Cairo', weight: 'bold' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatMoney(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { family: 'Cairo' } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
          }
        }
      }
    });
  }

  // Payment Methods Breakdown (in Analytics tab)
  const payCtx = document.getElementById('paymentMethodsChart');
  if (payCtx) {
    if (paymentMethodsChart) paymentMethodsChart.destroy();

    const payTotals = { cash: 0, card: 0, wallet: 0, bank: 0, other: 0 };
    monthTx.forEach(t => {
      const m = t.paymentMethod || 'cash';
      if (payTotals[m] !== undefined) payTotals[m] += Number(t.amount);
      else payTotals.other += Number(t.amount);
    });

    paymentMethodsChart = new Chart(payCtx, {
      type: 'pie',
      data: {
        labels: ['كاش', 'بطاقة بنكية', 'محفظة إلكترونية', 'تحويل بنكي', 'أخرى'],
        datasets: [{
          data: Object.values(payTotals),
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, font: { family: 'Cairo' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatMoney(ctx.parsed)}`
            }
          }
        }
      }
    });
  }

  // Render Detailed Category Breakdown List (Analytics Tab)
  renderDetailedCategoryBreakdown(catKeys, categoryTotals);
}

function renderDetailedCategoryBreakdown(keys, totals) {
  const container = document.getElementById('categoryBreakdownDetailedList');
  if (!container) return;

  const totalExpense = Object.values(totals).reduce((a, b) => a + b, 0);

  if (keys.length === 0 || totalExpense === 0) {
    container.innerHTML = '<p class="text-muted" style="text-align:center; padding:1.5rem;">لا توجد مصاريف مسجلة في هذا الشهر.</p>';
    return;
  }

  const sortedKeys = [...keys].sort((a, b) => totals[b] - totals[a]);

  container.innerHTML = sortedKeys.map(key => {
    const info = getCategoryInfo('expense', key);
    const amount = totals[key];
    const pct = ((amount / totalExpense) * 100).toFixed(1);

    return `
      <div class="cat-breakdown-item">
        <div class="cat-breakdown-meta">
          <div class="cat-breakdown-title">
            <span>${info.icon}</span>
            <span>${info.name}</span>
          </div>
          <div>
            <strong>${formatMoney(amount)}</strong>
            <span style="color:var(--text-muted); font-size:0.8rem; margin-right:0.4rem;">(${pct}%)</span>
          </div>
        </div>
        <div class="cat-breakdown-bar-track">
          <div class="cat-breakdown-bar-fill" style="width: ${pct}%; background: ${info.color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

// 5. Budgets Rendering
function renderBudgets() {
  const budget = appState.settings.monthlyBudget || 0;
  const monthTx = getFilteredMonthTransactions();
  const totalExpense = monthTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

  const budgetInfo = document.getElementById('budgetSpentInfo');
  const percentInfo = document.getElementById('budgetPercentInfo');
  const progressBar = document.getElementById('budgetProgressBar');
  const statusMsg = document.getElementById('budgetStatusMsg');

  if (budget <= 0) {
    budgetInfo.textContent = `تم صرف ${formatMoney(totalExpense)}`;
    percentInfo.textContent = 'الميزانية غير محددة';
    progressBar.style.width = '0%';
    statusMsg.innerHTML = '<span style="color:var(--text-muted)">حدد حداً أقصى شهرياً للميزانية من الحقل بالأعلى لتفعيل مراقبة الهدف.</span>';
    return;
  }

  const percent = Math.min(Math.round((totalExpense / budget) * 100), 100);
  const actualRatio = ((totalExpense / budget) * 100).toFixed(1);

  budgetInfo.textContent = `تم صرف ${formatMoney(totalExpense)} من أصل ${formatMoney(budget)}`;
  percentInfo.textContent = `${actualRatio}%`;
  progressBar.style.width = `${percent}%`;

  if (totalExpense > budget) {
    progressBar.style.background = 'var(--expense)';
    const over = totalExpense - budget;
    statusMsg.innerHTML = `<span style="color:var(--expense)">⚠️ لقد تجاوزت الميزانية المحددة بمقدار ${formatMoney(over)}! يرجى كبح المصاريف غير الضرورية.</span>`;
  } else if (totalExpense >= budget * 0.8) {
    progressBar.style.background = 'var(--warning)';
    const remaining = budget - totalExpense;
    statusMsg.innerHTML = `<span style="color:var(--warning)">⚡ تنبيه: اقتربت من سقف الميزانية، المتبقي فقط ${formatMoney(remaining)}.</span>`;
  } else {
    progressBar.style.background = 'var(--income)';
    const remaining = budget - totalExpense;
    statusMsg.innerHTML = `<span style="color:var(--income)">✅ أداء ممتاز! أنت داخل حدود الميزانية والمتبقي لديك هو ${formatMoney(remaining)}.</span>`;
  }
}

// 6. CSV Export with BOM (Arabic Support)
function exportToCSV() {
  const filtered = getFilteredMonthTransactions();
  if (filtered.length === 0) {
    showToast('لا توجد معاملات لتصديرها في هذا الشهر', 'error');
    return;
  }

  const headers = ['المعرف', 'النوع', 'الفئة', 'المبلغ', 'العملة', 'التاريخ', 'طريقة الدفع', 'ملاحظات'];
  const rows = filtered.map(tx => {
    const cat = getCategoryInfo(tx.type, tx.category);
    const pay = PAYMENT_METHODS[tx.paymentMethod] || PAYMENT_METHODS.other;
    return [
      `"${tx.id}"`,
      `"${tx.type === 'income' ? 'دخل' : 'مصروف'}"`,
      `"${cat.name}"`,
      tx.amount,
      `"${appState.settings.currency}"`,
      `"${tx.date}"`,
      `"${pay.name}"`,
      `"${(tx.note || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${appState.selectedMonth || 'all'}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('تم تحميل ملف CSV بنجاح', 'success');
}

// 7. Backup & Restore
function downloadBackup() {
  const backupData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    settings: appState.settings,
    transactions: appState.transactions
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `finance_portal_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  showToast('تم تحميل ملف النسخة الاحتياطية', 'success');
}

function handleRestoreFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data && Array.isArray(data.transactions)) {
        appState.transactions = data.transactions;
        if (data.settings) {
          appState.settings = { ...appState.settings, ...data.settings };
          saveSettings();
        }
        saveTransactions();
        populateMonthFilter();
        renderAll();
        showToast('تمت استعادة البيانات بنجاح!', 'success');
      } else {
        showToast('الملف غير صالح أو لا يحتوي على معاملات', 'error');
      }
    } catch (err) {
      showToast('حدث خطأ أثناء قراءة الملف', 'error');
    }
  };
  reader.readAsText(file);
}

// 8. Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  initLucide();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Global scope export for inline onclick handlers
window.openAddModal = openAddModal;
window.deleteTransaction = deleteTransaction;
