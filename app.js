/**
 * محفظتي - Personal Finance Portal
 * Core Application Logic, Accounts Management, Sadaqah Tab & Mobile UX
 */

// Default Configurations
const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'food', name: 'طعام ومشروبات', icon: '🍔', color: '#f59e0b' },
  { id: 'housing', name: 'سكن وفواتير', icon: '🏠', color: '#3b82f6' },
  { id: 'transport', name: 'مواصلات وبنزين', icon: '🚗', color: '#10b981' },
  { id: 'shopping', name: 'تسوق وملابس', icon: '🛍️', color: '#ec4899' },
  { id: 'health', name: 'صحة وأدوية', icon: '💊', color: '#ef4444' },
  { id: 'education', name: 'تعليم وتطوير', icon: '📚', color: '#8b5cf6' },
  { id: 'entertainment', name: 'ترفيه وخروجات', icon: '🎬', color: '#06b6d4' },
  { id: 'subscriptions', name: 'اشتراكات وخدمات', icon: '📱', color: '#6366f1' },
  { id: 'other_exp', name: 'مصاريف أخرى', icon: '📦', color: '#64748b' }
];

const SADAQAH_CATEGORIES = [
  { id: 'sadaqah_gen', name: 'صدقة عامة', icon: '🤲', color: '#10b981' },
  { id: 'zakat_mal', name: 'زكاة مال مفروضة', icon: '⚖️', color: '#059669' },
  { id: 'feeding', name: 'إطعام طعام ومحتاجين', icon: '🍲', color: '#f59e0b' },
  { id: 'orphan', name: 'كفالة أيتام', icon: '🌱', color: '#8b5cf6' },
  { id: 'medical_aid', name: 'مساعدة علاج ومريض', icon: '🏥', color: '#ef4444' },
  { id: 'sadaqah_jariya', name: 'صدقة جارية', icon: '💧', color: '#06b6d4' },
  { id: 'relief', name: 'تفريج كربة وغارم', icon: '🤝', color: '#3b82f6' }
];

const INCOME_CATEGORIES = [
  { id: 'salary', name: 'راتب شهري', icon: '💼', color: '#10b981' },
  { id: 'freelance', name: 'عمل حر / مشاريع', icon: '💻', color: '#06b6d4' },
  { id: 'investment', name: 'استثمارات وعوائد', icon: '📈', color: '#8b5cf6' },
  { id: 'gift', name: 'هدايا ومكافآت', icon: '🎁', color: '#ec4899' },
  { id: 'other_inc', name: 'دخل آخر', icon: '💰', color: '#f59e0b' }
];

const ACCOUNT_TYPES = {
  bank: { name: 'حساب بنكي', icon: 'landmark', defaultColor: '#3b82f6' },
  wallet: { name: 'محفظة إلكترونية', icon: 'smartphone', defaultColor: '#ef4444' },
  cash: { name: 'بوكيت موني / كاش', icon: 'wallet', defaultColor: '#10b981' },
  investment: { name: 'استثمار / أصول', icon: 'trending-up', defaultColor: '#8b5cf6' },
  other: { name: 'أخرى', icon: 'credit-card', defaultColor: '#64748b' }
};

// Default Accounts
function getDefaultAccounts() {
  return [
    { id: 'acc-1', name: 'حساب بنكي 1 (الأهلي / CIB)', type: 'bank', initialBalance: 15000, color: '#3b82f6' },
    { id: 'acc-2', name: 'حساب بنكي 2', type: 'bank', initialBalance: 5000, color: '#6366f1' },
    { id: 'acc-3', name: 'فودافون كاش', type: 'wallet', initialBalance: 2500, color: '#ef4444' },
    { id: 'acc-4', name: 'بوكيت موني (كاش في المحفظة)', type: 'cash', initialBalance: 1200, color: '#10b981' }
  ];
}

// Sample Seed Transactions
function getSampleTransactions() {
  const now = new Date();
  const year = now.getFullYear();
  const monthStr = String(now.getMonth() + 1).padStart(2, '0');

  return [
    {
      id: 'tx-1',
      type: 'income',
      amount: 25000,
      accountId: 'acc-1',
      category: 'salary',
      date: `${year}-${monthStr}-01`,
      note: 'راتب الشهر الأساسي',
      createdAt: Date.now() - 1000000
    },
    {
      id: 'tx-2',
      type: 'income',
      amount: 4000,
      accountId: 'acc-3',
      category: 'freelance',
      date: `${year}-${monthStr}-03`,
      note: 'مستحقات عمل حر عبر المحفظة',
      createdAt: Date.now() - 900000
    },
    {
      id: 'tx-3',
      type: 'sadaqah',
      amount: 1000,
      accountId: 'acc-3',
      category: 'sadaqah_gen',
      date: `${year}-${monthStr}-04`,
      note: 'صدقة شكر بنية البركة وتفريج كربة',
      createdAt: Date.now() - 850000
    },
    {
      id: 'tx-4',
      type: 'expense',
      amount: 3200,
      accountId: 'acc-1',
      category: 'housing',
      date: `${year}-${monthStr}-02`,
      note: 'إيجار وفواتير الكهرباء والإنترنت',
      createdAt: Date.now() - 750000
    },
    {
      id: 'tx-5',
      type: 'expense',
      amount: 1850,
      accountId: 'acc-1',
      category: 'food',
      date: `${year}-${monthStr}-04`,
      note: 'مشتريات السوبرماركت الأسبوعية',
      createdAt: Date.now() - 600000
    },
    {
      id: 'tx-6',
      type: 'expense',
      amount: 450,
      accountId: 'acc-4',
      category: 'transport',
      date: `${year}-${monthStr}-06`,
      note: 'بنزين وكارتات من الكاش',
      createdAt: Date.now() - 400000
    },
    {
      id: 'tx-7',
      type: 'sadaqah',
      amount: 300,
      accountId: 'acc-4',
      category: 'feeding',
      date: `${year}-${monthStr}-07`,
      note: 'إطعام مسكين وعامل نظافة',
      createdAt: Date.now() - 250000
    }
  ];
}

// App State
let appState = {
  transactions: [],
  accounts: [],
  expenseCategories: [],
  settings: {
    currency: 'EGP',
    userName: 'أحمد',
    monthlyBudget: 12000,
    sadaqahTarget: 1500,
    theme: 'dark'
  },
  selectedMonth: '',
  editingTxId: null,
  editingAccId: null
};

// Chart Instances
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
  // 1. Settings
  const savedSettings = localStorage.getItem('mf_settings');
  if (savedSettings) {
    try {
      appState.settings = { ...appState.settings, ...JSON.parse(savedSettings) };
    } catch (e) {
      console.error('Settings parse error', e);
    }
  }

  applyTheme(appState.settings.theme);

  document.getElementById('currencySelect').value = appState.settings.currency || 'EGP';
  document.getElementById('userNameInput').value = appState.settings.userName || '';
  document.getElementById('monthlyBudgetLimitInput').value = appState.settings.monthlyBudget || '';
  document.getElementById('sadaqahMonthlyTargetInput').value = appState.settings.sadaqahTarget || '';
  updateCurrencyDisplay();

  // 2. Accounts
  const savedAccounts = localStorage.getItem('mf_accounts');
  if (savedAccounts) {
    try {
      appState.accounts = JSON.parse(savedAccounts);
    } catch (e) {
      appState.accounts = getDefaultAccounts();
    }
  } else {
    appState.accounts = getDefaultAccounts();
    saveAccounts();
  }

  // 3. Expense Categories
  const savedCats = localStorage.getItem('mf_expense_categories');
  if (savedCats) {
    try {
      appState.expenseCategories = JSON.parse(savedCats);
    } catch (e) {
      appState.expenseCategories = DEFAULT_EXPENSE_CATEGORIES;
    }
  } else {
    appState.expenseCategories = DEFAULT_EXPENSE_CATEGORIES;
    saveCategories();
  }

  // 4. Transactions
  const savedTx = localStorage.getItem('mf_transactions');
  if (savedTx) {
    try {
      appState.transactions = JSON.parse(savedTx);
      // Migrate older tx if accountId missing
      appState.transactions.forEach(tx => {
        if (!tx.accountId && appState.accounts.length > 0) {
          tx.accountId = appState.accounts[0].id;
        }
      });
    } catch (e) {
      appState.transactions = getSampleTransactions();
    }
  } else {
    appState.transactions = getSampleTransactions();
    saveTransactions();
  }

  // Set default selected month
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  appState.selectedMonth = currentMonth;

  // Display top bar date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDateDisplay').textContent = today.toLocaleDateString('ar-EG', dateOptions);
}

// Storage Helpers
function saveTransactions() {
  localStorage.setItem('mf_transactions', JSON.stringify(appState.transactions));
}
function saveAccounts() {
  localStorage.setItem('mf_accounts', JSON.stringify(appState.accounts));
}
function saveCategories() {
  localStorage.setItem('mf_expense_categories', JSON.stringify(appState.expenseCategories));
}
function saveSettings() {
  localStorage.setItem('mf_settings', JSON.stringify(appState.settings));
}

function initLucide() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Account Balances Calculation
function getAccountCurrentBalance(accountId) {
  const acc = appState.accounts.find(a => a.id === accountId);
  if (!acc) return 0;

  let balance = Number(acc.initialBalance || 0);

  appState.transactions.forEach(tx => {
    if (tx.accountId === accountId) {
      const amt = Number(tx.amount || 0);
      if (tx.type === 'income') {
        balance += amt;
      } else {
        // expense or sadaqah
        balance -= amt;
      }
    }
  });

  return balance;
}

function getTotalCurrentWealth() {
  return appState.accounts.reduce((sum, acc) => sum + getAccountCurrentBalance(acc.id), 0);
}

function getTotalInitialWealth() {
  return appState.accounts.reduce((sum, acc) => sum + Number(acc.initialBalance || 0), 0);
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation tabs (desktop sidebar & mobile bottom nav)
  const allNavButtons = document.querySelectorAll('.nav-item, .bottom-nav-item');
  allNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        switchTab(tabId);
        closeMobileSidebar();
      }
    });
  });

  // Mobile Menu Toggle & Overlay
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('active');
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      applyTheme(newTheme);
      appState.settings.theme = newTheme;
      saveSettings();
      renderCharts();
    });
  }

  // Month Filter Change
  const monthFilter = document.getElementById('monthFilter');
  monthFilter.addEventListener('change', (e) => {
    appState.selectedMonth = e.target.value;
    renderAll();
  });

  // Open Add Transaction modal buttons
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const mobileFabBtn = document.getElementById('mobileFabBtn');
  if (openAddModalBtn) openAddModalBtn.addEventListener('click', () => openAddModal());
  if (mobileFabBtn) mobileFabBtn.addEventListener('click', () => openAddModal());

  // Close modals
  document.getElementById('closeModalBtn').addEventListener('click', closeTxModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeTxModal);
  document.getElementById('txModalBackdrop').addEventListener('click', (e) => {
    if (e.target === document.getElementById('txModalBackdrop')) closeTxModal();
  });

  // Modal Transaction Type Radios
  const typeRadios = document.querySelectorAll('input[name="txType"]');
  typeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      populateCategoryOptions(radio.value);
    });
  });

  // Submit Transaction Form
  document.getElementById('txForm').addEventListener('submit', handleTxFormSubmit);

  // Table filters & Search
  document.getElementById('txSearchInput').addEventListener('input', renderTransactionsTable);
  document.getElementById('txTypeFilter').addEventListener('change', renderTransactionsTable);
  document.getElementById('txAccountFilter').addEventListener('change', renderTransactionsTable);
  document.getElementById('txCategoryFilter').addEventListener('change', renderTransactionsTable);

  // CSV Export
  document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);

  // View All Transactions Button on Dashboard
  const viewAllTxBtn = document.getElementById('viewAllTxBtn');
  if (viewAllTxBtn) {
    viewAllTxBtn.addEventListener('click', () => switchTab('transactions'));
  }

  // Account Modal
  document.getElementById('closeAccountModalBtn').addEventListener('click', closeAccountModal);
  document.getElementById('cancelAccountModalBtn').addEventListener('click', closeAccountModal);
  document.getElementById('accountForm').addEventListener('submit', handleAccountFormSubmit);
  document.getElementById('accountModalBackdrop').addEventListener('click', (e) => {
    if (e.target === document.getElementById('accountModalBackdrop')) closeAccountModal();
  });

  // Category Modal
  document.getElementById('closeCategoryModalBtn').addEventListener('click', closeCategoryModal);
  document.getElementById('cancelCategoryModalBtn').addEventListener('click', closeCategoryModal);
  document.getElementById('categoryForm').addEventListener('submit', handleCategoryFormSubmit);
  document.getElementById('categoryModalBackdrop').addEventListener('click', (e) => {
    if (e.target === document.getElementById('categoryModalBackdrop')) closeCategoryModal();
  });

  // Settings Save
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

  // Sadaqah Target Save
  document.getElementById('saveSadaqahTargetBtn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('sadaqahMonthlyTargetInput').value);
    if (!isNaN(val) && val >= 0) {
      appState.settings.sadaqahTarget = val;
      saveSettings();
      renderSadaqahTab();
      showToast('تم حفظ هدف الصدقة الشهري، تقبل الله منك!', 'success');
    } else {
      showToast('يرجى إدخال مبلغ صحيح', 'error');
    }
  });

  // Backup & Restore
  document.getElementById('downloadBackupBtn').addEventListener('click', downloadBackup);
  document.getElementById('restoreBackupInput').addEventListener('change', handleRestoreFile);
  document.getElementById('loadSampleDataBtn').addEventListener('click', () => {
    if (confirm('هل ترغب في إعادة تحميل بيانات تجريبية مع الاحتفاظ بالبيانات السابقة؟')) {
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

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('active');
}

function switchTab(tabId) {
  // Update navs
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
  });

  // Update tabs
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');

  const titles = {
    dashboard: 'لوحة التحكم',
    accounts: 'حساباتي وأرصدتي',
    transactions: 'سجل المعاملات',
    sadaqah: 'الصدقات والزكاة',
    analytics: 'التقارير والتحليلات',
    budgets: 'الميزانية الشهرية',
    settings: 'الإعدادات والفئات'
  };
  document.getElementById('pageTitle').textContent = titles[tabId] || 'محفظتي';

  // Render specific views on tab switch
  if (tabId === 'dashboard' || tabId === 'analytics') {
    setTimeout(renderCharts, 100);
  }
  if (tabId === 'accounts' || tabId === 'settings') {
    renderAccountsView();
  }
  if (tabId === 'sadaqah') {
    renderSadaqahTab();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  document.getElementById('accCurrencySymbol').textContent = curr;
}

function formatMoney(amount) {
  const curr = appState.settings.currency || 'EGP';
  return `${Number(amount || 0).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;
}

// Populate Month Selector Filter
function populateMonthFilter() {
  const select = document.getElementById('monthFilter');
  const monthsSet = new Set();

  const today = new Date();
  const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  monthsSet.add(currentMonthStr);

  appState.transactions.forEach(tx => {
    if (tx.date) monthsSet.add(tx.date.substring(0, 7));
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
    if (m === appState.selectedMonth) option.selected = true;
    select.appendChild(option);
  });

  if (!sortedMonths.includes(appState.selectedMonth) && sortedMonths.length > 0) {
    appState.selectedMonth = sortedMonths[0];
  }
}

// Category & Account Options Helpers
function getCategoriesForType(type) {
  if (type === 'income') return INCOME_CATEGORIES;
  if (type === 'sadaqah') return SADAQAH_CATEGORIES;
  return appState.expenseCategories;
}

function getCategoryInfo(type, catId) {
  const all = [...appState.expenseCategories, ...SADAQAH_CATEGORIES, ...INCOME_CATEGORIES];
  const found = all.find(c => c.id === catId);
  return found || { id: catId, name: catId, icon: '🏷️', color: '#64748b' };
}

function populateCategoryOptions(type = 'expense', selectedCategory = '') {
  const select = document.getElementById('txCategory');
  select.innerHTML = '';

  const list = getCategoriesForType(type);
  list.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = `${cat.icon} ${cat.name}`;
    if (cat.id === selectedCategory) opt.selected = true;
    select.appendChild(opt);
  });

  // Also update filter dropdown in transactions tab
  const filterSelect = document.getElementById('txCategoryFilter');
  const allCats = [...appState.expenseCategories, ...SADAQAH_CATEGORIES, ...INCOME_CATEGORIES];
  let filterHtml = '<option value="all">كل الفئات</option>';
  allCats.forEach(c => {
    filterHtml += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
  });
  filterSelect.innerHTML = filterHtml;
}

function populateAccountOptions(selectedAccountId = '') {
  const select = document.getElementById('txAccount');
  select.innerHTML = '';

  appState.accounts.forEach(acc => {
    const opt = document.createElement('option');
    opt.value = acc.id;
    const curBal = getAccountCurrentBalance(acc.id);
    opt.textContent = `${acc.name} (رصيد: ${formatMoney(curBal)})`;
    if (acc.id === selectedAccountId) opt.selected = true;
    select.appendChild(opt);
  });

  // Also update filter dropdown in transactions tab
  const filterSelect = document.getElementById('txAccountFilter');
  let filterHtml = '<option value="all">كل الحسابات</option>';
  appState.accounts.forEach(a => {
    filterHtml += `<option value="${a.id}">${a.name}</option>`;
  });
  filterSelect.innerHTML = filterHtml;
}

// Modal: Add / Edit Transaction
function openAddModal(forcedType = null, editTxId = null) {
  const backdrop = document.getElementById('txModalBackdrop');
  const form = document.getElementById('txForm');
  form.reset();

  const todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('txDate').value = todayStr;
  populateAccountOptions();

  if (editTxId) {
    appState.editingTxId = editTxId;
    const tx = appState.transactions.find(t => t.id === editTxId);
    if (tx) {
      document.getElementById('modalTitle').textContent = 'تعديل المعاملة';
      const typeRadio = document.querySelector(`input[name="txType"][value="${tx.type}"]`);
      if (typeRadio) typeRadio.checked = true;
      populateCategoryOptions(tx.type, tx.category);
      populateAccountOptions(tx.accountId);
      document.getElementById('txAmount').value = tx.amount;
      document.getElementById('txDate').value = tx.date;
      document.getElementById('txNote').value = tx.note || '';
    }
  } else {
    appState.editingTxId = null;
    document.getElementById('modalTitle').textContent = 'إضافة معاملة جديدة';
    const typeToUse = forcedType || 'expense';
    const typeRadio = document.querySelector(`input[name="txType"][value="${typeToUse}"]`);
    if (typeRadio) typeRadio.checked = true;
    populateCategoryOptions(typeToUse);
  }

  backdrop.classList.add('open');
  initLucide();
}

function closeTxModal() {
  document.getElementById('txModalBackdrop').classList.remove('open');
  appState.editingTxId = null;
}

function handleTxFormSubmit(e) {
  e.preventDefault();

  const type = document.querySelector('input[name="txType"]:checked').value;
  const amount = parseFloat(document.getElementById('txAmount').value);
  const accountId = document.getElementById('txAccount').value;
  const category = document.getElementById('txCategory').value;
  const date = document.getElementById('txDate').value;
  const note = document.getElementById('txNote').value.trim();

  if (isNaN(amount) || amount <= 0) {
    showToast('يرجى إدخال مبلغ صحيح أكبر من الصفر', 'error');
    return;
  }

  if (!accountId) {
    showToast('يرجى اختيار الحساب المتأثر بالمعاملة', 'error');
    return;
  }

  if (appState.editingTxId) {
    const idx = appState.transactions.findIndex(t => t.id === appState.editingTxId);
    if (idx !== -1) {
      appState.transactions[idx] = {
        ...appState.transactions[idx],
        type,
        amount,
        accountId,
        category,
        date,
        note
      };
      showToast('تم تعديل المعاملة بنجاح', 'success');
    }
  } else {
    const newTx = {
      id: 'tx-' + Date.now(),
      type,
      amount,
      accountId,
      category,
      date,
      note,
      createdAt: Date.now()
    };
    appState.transactions.unshift(newTx);
    if (type === 'sadaqah') {
      showToast('تقبل الله صدقتك وبارك لك في مالك 🤲', 'success');
    } else {
      showToast('تم تسجيل المعاملة بنجاح', 'success');
    }
  }

  saveTransactions();
  closeTxModal();
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

// Modal: Accounts Manager
function openAccountModal(accId = null) {
  const backdrop = document.getElementById('accountModalBackdrop');
  const form = document.getElementById('accountForm');
  form.reset();

  if (accId) {
    appState.editingAccId = accId;
    const acc = appState.accounts.find(a => a.id === accId);
    if (acc) {
      document.getElementById('accountModalTitle').textContent = 'تعديل الحساب';
      document.getElementById('accName').value = acc.name;
      document.getElementById('accType').value = acc.type;
      document.getElementById('accInitialBalance').value = acc.initialBalance;
      document.getElementById('accColor').value = acc.color || '#3b82f6';
    }
  } else {
    appState.editingAccId = null;
    document.getElementById('accountModalTitle').textContent = 'إضافة حساب جديد';
    document.getElementById('accColor').value = '#3b82f6';
  }

  backdrop.classList.add('open');
  initLucide();
}

function closeAccountModal() {
  document.getElementById('accountModalBackdrop').classList.remove('open');
  appState.editingAccId = null;
}

function handleAccountFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('accName').value.trim();
  const type = document.getElementById('accType').value;
  const initialBalance = parseFloat(document.getElementById('accInitialBalance').value);
  const color = document.getElementById('accColor').value;

  if (!name) {
    showToast('يرجى إدخال اسم الحساب', 'error');
    return;
  }

  if (isNaN(initialBalance)) {
    showToast('يرجى إدخال رصيد افتتاحي صحيح', 'error');
    return;
  }

  if (appState.editingAccId) {
    const idx = appState.accounts.findIndex(a => a.id === appState.editingAccId);
    if (idx !== -1) {
      appState.accounts[idx] = {
        ...appState.accounts[idx],
        name,
        type,
        initialBalance,
        color
      };
      showToast('تم تعديل الحساب بنجاح', 'success');
    }
  } else {
    const newAcc = {
      id: 'acc-' + Date.now(),
      name,
      type,
      initialBalance,
      color
    };
    appState.accounts.push(newAcc);
    showToast('تمت إضافة الحساب بنجاح', 'success');
  }

  saveAccounts();
  closeAccountModal();
  renderAll();
}

function deleteAccount(accId) {
  if (appState.accounts.length <= 1) {
    showToast('يجب الاحتفاظ بحساب واحد على الأقل!', 'error');
    return;
  }

  // Check if transactions use this account
  const used = appState.transactions.filter(t => t.accountId === accId).length;
  const confirmMsg = used > 0
    ? `تحذير: هذا الحساب مرتبط بـ ${used} معاملة. حذفه قد يربك إحصائيات المعاملات السابقة. هل ترغب فعلاً في حذفه؟`
    : 'هل أنت متأكد من حذف هذا الحساب؟';

  if (confirm(confirmMsg)) {
    appState.accounts = appState.accounts.filter(a => a.id !== accId);
    saveAccounts();
    renderAll();
    showToast('تم حذف الحساب', 'info');
  }
}

// Modal: Category Manager
function openCategoryModal() {
  document.getElementById('categoryForm').reset();
  document.getElementById('categoryModalBackdrop').classList.add('open');
  initLucide();
}

function closeCategoryModal() {
  document.getElementById('categoryModalBackdrop').classList.remove('open');
}

function handleCategoryFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('catName').value.trim();
  const icon = document.getElementById('catIcon').value.trim() || '🏷️';
  const color = document.getElementById('catColor').value;

  if (!name) {
    showToast('يرجى إدخال اسم الفئة', 'error');
    return;
  }

  const newCat = {
    id: 'cat_' + Date.now(),
    name,
    icon,
    color
  };

  appState.expenseCategories.push(newCat);
  saveCategories();
  closeCategoryModal();
  renderCategoriesSettings();
  showToast('تمت إضافة الفئة بنجاح', 'success');
}

function deleteCategory(catId) {
  if (appState.expenseCategories.length <= 1) {
    showToast('يجب الاحتفاظ بفئة واحدة على الأقل!', 'error');
    return;
  }

  if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
    appState.expenseCategories = appState.expenseCategories.filter(c => c.id !== catId);
    saveCategories();
    renderCategoriesSettings();
    showToast('تم حذف الفئة', 'info');
  }
}

// Render Master
function renderAll() {
  const filtered = getFilteredMonthTransactions();
  renderStats(filtered);
  renderDashboardAccountsChips();
  renderRecentDashboardList(filtered);
  renderAccountsView();
  renderTransactionsTable();
  renderSadaqahTab();
  renderCharts();
  renderBudgets();
  renderCategoriesSettings();
  initLucide();
}

function getFilteredMonthTransactions() {
  if (!appState.selectedMonth) return appState.transactions;
  return appState.transactions.filter(tx => tx.date && tx.date.startsWith(appState.selectedMonth));
}

// 1. Dashboard Stats
function renderStats(monthTx) {
  let totalIncome = 0;
  let totalExpense = 0;
  let totalSadaqah = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  monthTx.forEach(tx => {
    const amt = Number(tx.amount);
    if (tx.type === 'income') {
      totalIncome += amt;
      incomeCount++;
    } else if (tx.type === 'expense') {
      totalExpense += amt;
      expenseCount++;
    } else if (tx.type === 'sadaqah') {
      totalSadaqah += amt;
    }
  });

  const totalCurrentWealth = getTotalCurrentWealth();
  const netSavedThisMonth = totalIncome - totalExpense - totalSadaqah;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netSavedThisMonth / totalIncome) * 100)) : 0;
  const sadaqahRatio = totalIncome > 0 ? ((totalSadaqah / totalIncome) * 100).toFixed(1) : 0;

  document.getElementById('netBalanceVal').textContent = formatMoney(totalCurrentWealth);
  document.getElementById('savingsRateVal').textContent = `توفير الشهر: ${formatMoney(netSavedThisMonth)} (${savingsRate}%)`;

  document.getElementById('totalIncomeVal').textContent = formatMoney(totalIncome);
  document.getElementById('incomeCountVal').textContent = `${incomeCount} عملية واردة`;

  document.getElementById('totalExpenseVal').textContent = formatMoney(totalExpense);
  document.getElementById('expenseCountVal').textContent = `${expenseCount} عملية صرف`;

  document.getElementById('dashSadaqahVal').textContent = formatMoney(totalSadaqah);
  document.getElementById('dashSadaqahRatio').textContent = `نسبة ${sadaqahRatio}% من الدخل`;
}

// 2. Dashboard Accounts Chip Grid
function renderDashboardAccountsChips() {
  const container = document.getElementById('dashboardAccountsList');
  if (!container) return;

  container.innerHTML = appState.accounts.map(acc => {
    const curBal = getAccountCurrentBalance(acc.id);
    const typeInfo = ACCOUNT_TYPES[acc.type] || ACCOUNT_TYPES.other;
    return `
      <div class="account-chip" onclick="switchTab('accounts')">
        <div class="acc-chip-info">
          <div class="acc-chip-icon" style="background: ${acc.color}20; color: ${acc.color};">
            <i data-lucide="${typeInfo.icon}"></i>
          </div>
          <div>
            <div class="acc-chip-name">${acc.name}</div>
            <div class="acc-chip-type">${typeInfo.name}</div>
          </div>
        </div>
        <div class="acc-chip-balance" style="color: ${curBal >= 0 ? 'var(--text-primary)' : 'var(--expense)'};">
          ${formatMoney(curBal)}
        </div>
      </div>
    `;
  }).join('');
}

// 3. Accounts Tab View
function renderAccountsView() {
  const container = document.getElementById('accountsCardsContainer');
  const tableBody = document.getElementById('settingsAccountsTableBody');
  const totalWealth = getTotalCurrentWealth();
  const initialWealth = getTotalInitialWealth();

  if (document.getElementById('totalWealthVal')) {
    document.getElementById('totalWealthVal').textContent = formatMoney(totalWealth);
    document.getElementById('totalInitialWealthVal').textContent = formatMoney(initialWealth);
  }

  // Cards on Accounts Tab
  if (container) {
    container.innerHTML = appState.accounts.map(acc => {
      const curBal = getAccountCurrentBalance(acc.id);
      const typeInfo = ACCOUNT_TYPES[acc.type] || ACCOUNT_TYPES.other;
      const netDiff = curBal - acc.initialBalance;
      const diffSign = netDiff >= 0 ? '+' : '';

      return `
        <div class="account-card-full">
          <div class="account-card-header">
            <div class="acc-title-group">
              <div class="acc-icon-box" style="background: ${acc.color};">
                <i data-lucide="${typeInfo.icon}"></i>
              </div>
              <div>
                <div class="acc-name-text">${acc.name}</div>
                <div class="acc-type-text">${typeInfo.name}</div>
              </div>
            </div>
            <div class="action-btns">
              <button class="action-btn-mini" onclick="openAccountModal('${acc.id}')" title="تعديل">
                <i data-lucide="edit-3"></i>
              </button>
              <button class="action-btn-mini delete" onclick="deleteAccount('${acc.id}')" title="حذف">
                <i data-lucide="trash"></i>
              </button>
            </div>
          </div>

          <div class="account-balances-box">
            <div class="stat-label">الرصيد الفعلي الحالي:</div>
            <div class="acc-current-val" style="color: ${curBal >= 0 ? 'var(--text-primary)' : 'var(--expense)'};">
              ${formatMoney(curBal)}
            </div>
            <div class="acc-initial-sub">
              الرصيد الافتتاحي: <strong>${formatMoney(acc.initialBalance)}</strong>
              <span style="margin-right:0.5rem; color:${netDiff >= 0 ? 'var(--income)' : 'var(--expense)'};">
                (${diffSign}${formatMoney(netDiff)})
              </span>
            </div>
          </div>

          <div class="acc-card-footer">
            <button class="btn btn-outline btn-sm" onclick="openAddModal('expense')">
              <i data-lucide="minus"></i> صرف منه
            </button>
            <button class="btn btn-outline btn-sm" onclick="openAddModal('income')">
              <i data-lucide="plus"></i> إيداع فيه
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Table on Settings Tab
  if (tableBody) {
    tableBody.innerHTML = appState.accounts.map(acc => {
      const curBal = getAccountCurrentBalance(acc.id);
      const typeInfo = ACCOUNT_TYPES[acc.type] || ACCOUNT_TYPES.other;
      return `
        <tr>
          <td>
            <strong style="color: ${acc.color};">●</strong> ${acc.name}
          </td>
          <td>${typeInfo.name}</td>
          <td>${formatMoney(acc.initialBalance)}</td>
          <td style="font-weight:700;">${formatMoney(curBal)}</td>
          <td class="actions-col">
            <div class="action-btns">
              <button class="action-btn-mini" onclick="openAccountModal('${acc.id}')" title="تعديل">
                <i data-lucide="edit-3"></i>
              </button>
              <button class="action-btn-mini delete" onclick="deleteAccount('${acc.id}')" title="حذف">
                <i data-lucide="trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Update Zakat calculation liquid total
  if (document.getElementById('zakatTotalLiquid')) {
    const liquidTotal = Math.max(0, totalWealth);
    const zakatDue = liquidTotal * 0.025;
    document.getElementById('zakatTotalLiquid').textContent = formatMoney(liquidTotal);
    document.getElementById('zakatDueVal').textContent = formatMoney(zakatDue);
  }
}

// 4. Sadaqah Tab View
function renderSadaqahTab() {
  const monthTx = getFilteredMonthTransactions();
  const allSadaqahTx = appState.transactions.filter(t => t.type === 'sadaqah');
  const monthSadaqahTx = monthTx.filter(t => t.type === 'sadaqah');

  const monthTotal = monthSadaqahTx.reduce((s, t) => s + Number(t.amount), 0);
  const allTimeTotal = allSadaqahTx.reduce((s, t) => s + Number(t.amount), 0);

  const monthIncome = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const sadaqahRatio = monthIncome > 0 ? ((monthTotal / monthIncome) * 100).toFixed(1) : 0;

  const target = appState.settings.sadaqahTarget || 0;

  if (document.getElementById('sadaqahMonthVal')) {
    document.getElementById('sadaqahMonthVal').textContent = formatMoney(monthTotal);
    document.getElementById('sadaqahMonthCount').textContent = `${monthSadaqahTx.length} عملية صدقة هذا الشهر`;
    document.getElementById('sadaqahAllTimeVal').textContent = formatMoney(allTimeTotal);
    document.getElementById('sadaqahRatioVal').textContent = `${sadaqahRatio}%`;
    document.getElementById('sadaqahGoalVal').textContent = formatMoney(target);

    // Goal progress bar
    const progressBar = document.getElementById('sadaqahProgressBar');
    const progressText = document.getElementById('sadaqahProgressText');
    const remainingText = document.getElementById('sadaqahProgressRemaining');

    if (target > 0) {
      const pct = Math.min(Math.round((monthTotal / target) * 100), 100);
      const actualPct = ((monthTotal / target) * 100).toFixed(0);
      progressBar.style.width = `${pct}%`;
      progressText.textContent = `تم تحقيق ${actualPct}% من هدف الصدقة (${formatMoney(monthTotal)} / ${formatMoney(target)})`;
      
      const rem = Math.max(0, target - monthTotal);
      remainingText.textContent = rem > 0 ? `المتبقي للهدف: ${formatMoney(rem)}` : '🎉 ما شاء الله! تم إنجاز نية الصدقة بالكامل!';
    } else {
      progressBar.style.width = '0%';
      progressText.textContent = 'لم يتم تحديد هدف شهري بعد';
      remainingText.textContent = '';
    }
  }

  // Sadaqah History List
  const historyList = document.getElementById('sadaqahHistoryList');
  if (historyList) {
    if (allSadaqahTx.length === 0) {
      historyList.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted);">
          لم يتم تسجيل أي صدقات حتى الآن. انقر على "تسجيل صدقة جديدة" أعلاه لتوثيق عطائك.
        </div>
      `;
      return;
    }

    // Sort descending
    const sorted = [...allSadaqahTx].sort((a, b) => new Date(b.date) - new Date(a.date));

    historyList.innerHTML = sorted.map(tx => {
      const cat = getCategoryInfo('sadaqah', tx.category);
      const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: 'حساب غير محدد' };
      const dateFormatted = new Date(tx.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });

      return `
        <div class="tx-row-item">
          <div class="tx-item-left">
            <div class="category-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
              <span>${cat.icon}</span>
            </div>
            <div class="tx-meta-info">
              <span class="tx-title">${tx.note || cat.name}</span>
              <div class="tx-sub">
                <span>${cat.name}</span>
                <span>•</span>
                <span>${acc.name}</span>
                <span>•</span>
                <span>${dateFormatted}</span>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div class="tx-amount sadaqah">
              - ${formatMoney(tx.amount)}
            </div>
            <button class="action-btn-mini delete" onclick="deleteTransaction('${tx.id}')" title="حذف">
              <i data-lucide="trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

// 5. Recent Transactions (Dashboard Preview)
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
    const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: '' };
    const isIncome = tx.type === 'income';
    const sign = isIncome ? '+' : '-';
    const amountClass = isIncome ? 'income' : (tx.type === 'sadaqah' ? 'sadaqah' : 'expense');
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
              ${acc.name ? `<span>• ${acc.name}</span>` : ''}
              <span>• ${dateFormatted}</span>
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

// 6. Transactions Table & Mobile Cards
function renderTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  const mobileContainer = document.getElementById('mobileTxCardsContainer');
  const emptyState = document.getElementById('noTransactionsState');
  const table = document.getElementById('transactionsTable');

  const query = document.getElementById('txSearchInput').value.toLowerCase().trim();
  const typeFilter = document.getElementById('txTypeFilter').value;
  const accountFilter = document.getElementById('txAccountFilter').value;
  const categoryFilter = document.getElementById('txCategoryFilter').value;

  let filtered = [...appState.transactions];

  if (appState.selectedMonth) {
    filtered = filtered.filter(tx => tx.date && tx.date.startsWith(appState.selectedMonth));
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter(tx => tx.type === typeFilter);
  }

  if (accountFilter !== 'all') {
    filtered = filtered.filter(tx => tx.accountId === accountFilter);
  }

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(tx => tx.category === categoryFilter);
  }

  if (query) {
    filtered = filtered.filter(tx => {
      const cat = getCategoryInfo(tx.type, tx.category);
      const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: '' };
      return (
        (tx.note && tx.note.toLowerCase().includes(query)) ||
        cat.name.toLowerCase().includes(query) ||
        acc.name.toLowerCase().includes(query) ||
        String(tx.amount).includes(query)
      );
    });
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (mobileContainer) mobileContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    table.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  table.classList.remove('hidden');

  // Render Table for Desktop
  tbody.innerHTML = filtered.map(tx => {
    const cat = getCategoryInfo(tx.type, tx.category);
    const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: 'غير محدد' };
    const isIncome = tx.type === 'income';
    const isSadaqah = tx.type === 'sadaqah';
    const typeLabel = isIncome ? 'دخل' : (isSadaqah ? 'صدقة' : 'مصروف');
    const typeTagClass = isIncome ? 'income' : (isSadaqah ? 'sadaqah' : 'expense');
    const sign = isIncome ? '+' : '-';

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
        <td>${acc.name}</td>
        <td>${tx.note || '<span style="color:var(--text-muted);">-</span>'}</td>
        <td>${tx.date}</td>
        <td style="font-weight:800; direction:ltr; text-align:right;" class="${typeTagClass}">
          ${sign} ${formatMoney(tx.amount)}
        </td>
        <td class="actions-col">
          <div class="action-btns">
            <button class="action-btn-mini" onclick="openAddModal(null, '${tx.id}')" title="تعديل">
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

  // Render Mobile Cards
  if (mobileContainer) {
    mobileContainer.innerHTML = filtered.map(tx => {
      const cat = getCategoryInfo(tx.type, tx.category);
      const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: 'غير محدد' };
      const isIncome = tx.type === 'income';
      const isSadaqah = tx.type === 'sadaqah';
      const typeTagClass = isIncome ? 'income' : (isSadaqah ? 'sadaqah' : 'expense');
      const sign = isIncome ? '+' : '-';

      return `
        <div class="mobile-tx-card">
          <div class="mobile-tx-card-top">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <span style="font-size:1.3rem;">${cat.icon}</span>
              <div>
                <strong style="font-size:0.95rem;">${tx.note || cat.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${cat.name} • ${acc.name}</div>
              </div>
            </div>
            <div class="tx-amount ${typeTagClass}">
              ${sign} ${formatMoney(tx.amount)}
            </div>
          </div>
          <div class="mobile-tx-card-bottom">
            <span>${tx.date}</span>
            <div class="action-btns">
              <button class="action-btn-mini" onclick="openAddModal(null, '${tx.id}')" title="تعديل">
                <i data-lucide="edit-3"></i>
              </button>
              <button class="action-btn-mini delete" onclick="deleteTransaction('${tx.id}')" title="حذف">
                <i data-lucide="trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  initLucide();
}

// 7. Categories Settings View
function renderCategoriesSettings() {
  const container = document.getElementById('settingsCategoriesList');
  if (!container) return;

  container.innerHTML = appState.expenseCategories.map(cat => {
    return `
      <div class="category-manage-tag" style="border-right: 4px solid ${cat.color};">
        <span class="cat-emoji">${cat.icon}</span>
        <span>${cat.name}</span>
        <button class="cat-delete-btn" onclick="deleteCategory('${cat.id}')" title="حذف الفئة">
          <i data-lucide="x"></i>
        </button>
      </div>
    `;
  }).join('');

  initLucide();
}

// 8. Charts Rendering
function renderCharts() {
  const monthTx = getFilteredMonthTransactions();
  const isDark = document.body.classList.contains('dark-theme');
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

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

  // Doughnut Chart
  const doughnutCtx = document.getElementById('categoryDoughnutChart');
  if (doughnutCtx) {
    if (categoryChart) categoryChart.destroy();

    if (catData.length === 0) {
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

  // Daily Spending Chart
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

  // Monthly Comparison Trend (Last 6 Months)
  const trendCtx = document.getElementById('monthlyTrendChart');
  if (trendCtx) {
    if (monthlyTrendChart) monthlyTrendChart.destroy();

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
          else if (t.type === 'expense' || t.type === 'sadaqah') exp += Number(t.amount);
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
          { label: 'الدخل', data: trendIncome, backgroundColor: '#10b981', borderRadius: 6 },
          { label: 'المصروف والصدقات', data: trendExpense, backgroundColor: '#ef4444', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { family: 'Cairo', weight: 'bold' } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatMoney(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'Cairo' } } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } } }
        }
      }
    });
  }

  // Account Spending Distribution
  const payCtx = document.getElementById('paymentMethodsChart');
  if (payCtx) {
    if (paymentMethodsChart) paymentMethodsChart.destroy();

    const accTotals = {};
    const accLabels = [];
    const accColors = [];

    appState.accounts.forEach(a => {
      accTotals[a.id] = 0;
      accLabels.push(a.name);
      accColors.push(a.color || '#3b82f6');
    });

    monthTx.filter(t => t.type !== 'income').forEach(t => {
      if (accTotals[t.accountId] !== undefined) {
        accTotals[t.accountId] += Number(t.amount);
      }
    });

    paymentMethodsChart = new Chart(payCtx, {
      type: 'pie',
      data: {
        labels: accLabels,
        datasets: [{
          data: Object.values(accTotals),
          backgroundColor: accColors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Cairo' } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatMoney(ctx.parsed)}`
            }
          }
        }
      }
    });
  }

  // Detailed Breakdown List
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

// 9. Budgets
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
    statusMsg.innerHTML = `<span style="color:var(--expense)">⚠️ لقد تجاوزت الميزانية المحددة بمقدار ${formatMoney(over)}! يرجى مراجعة الصرف.</span>`;
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

// 10. CSV Export
function exportToCSV() {
  const filtered = getFilteredMonthTransactions();
  if (filtered.length === 0) {
    showToast('لا توجد معاملات لتصديرها في هذا الشهر', 'error');
    return;
  }

  const headers = ['المعرف', 'النوع', 'الفئة', 'الحساب', 'المبلغ', 'العملة', 'التاريخ', 'ملاحظات'];
  const rows = filtered.map(tx => {
    const cat = getCategoryInfo(tx.type, tx.category);
    const acc = appState.accounts.find(a => a.id === tx.accountId) || { name: 'غير محدد' };
    const typeLabel = tx.type === 'income' ? 'دخل' : (tx.type === 'sadaqah' ? 'صدقة' : 'مصروف');
    return [
      `"${tx.id}"`,
      `"${typeLabel}"`,
      `"${cat.name}"`,
      `"${acc.name}"`,
      tx.amount,
      `"${appState.settings.currency}"`,
      `"${tx.date}"`,
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

// 11. Backup & Restore
function downloadBackup() {
  const backupData = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    settings: appState.settings,
    accounts: appState.accounts,
    expenseCategories: appState.expenseCategories,
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
        if (data.accounts) appState.accounts = data.accounts;
        if (data.expenseCategories) appState.expenseCategories = data.expenseCategories;
        if (data.settings) appState.settings = { ...appState.settings, ...data.settings };
        
        saveAccounts();
        saveCategories();
        saveSettings();
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

// Toast
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
window.switchTab = switchTab;
window.openAddModal = openAddModal;
window.deleteTransaction = deleteTransaction;
window.openAccountModal = openAccountModal;
window.deleteAccount = deleteAccount;
window.openCategoryModal = openCategoryModal;
window.deleteCategory = deleteCategory;
