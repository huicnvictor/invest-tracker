/* Invest Tracker shared i18n
 * Default language: 中文 (zh). Switcher writes to localStorage['it_lang'].
 *
 * Markup conventions:
 *   <span data-i18n="key">中文</span>        — replaces textContent
 *   <input data-i18n-placeholder="key" ...>  — replaces placeholder
 *   <th data-i18n="key">中文</th>            — works for any element with text
 *
 * JS code that builds strings should call window.t('key') to get the
 * currently-active language string. Strings with placeholders use {0}/{name}.
 */
(function () {
  const STORAGE_KEY = 'it_lang';
  const DEFAULT = 'zh';

  const dict = {
    // ── nav (all pages) ───────────────────────────────────
    nav_fire:      { zh: '财务自由', en: 'FIRE' },
    nav_portfolio: { zh: '投资组合',    en: 'Portfolio' },
    nav_alerts:    { zh: '价格提醒',    en: 'Alerts' },
    nav_library:   { zh: '知识库',      en: 'Library' },
    nav_blog:      { zh: '博客',        en: 'Blog' },

    // ── 财务自由 (index.html) ─────────────────────────────
    fire_eyebrow:        { zh: '计算器', en: 'Calculator' },
    fire_h1:             { zh: '财务自由计算器', en: 'Financial Freedom Calculator' },
    fire_lede:           { zh: '按第一定律和第二定律估算：退休时要多少金融资产覆盖开支，现有资产未来能长到多少，缺口多少，每年再存多少能填上。', en: 'Estimate retirement with the two laws: how much financial capital you need, what your current assets will grow to, the gap, and how much you must invest yearly to close it.' },
    fire_plan_title:     { zh: '你的计划', en: 'Your plan' },
    fire_result_title:   { zh: '结果', en: 'Result' },

    fire_currentAge:     { zh: '当前年龄', en: 'Current age' },
    fire_retireAge:      { zh: '退休年龄', en: 'Retirement age' },
    fire_currentAsset:   { zh: '当前金融资产（万）', en: 'Current assets (10k CNY)' },
    fire_returnRate:     { zh: '年化投资回报 (%)', en: 'Annual return (%)' },
    fire_returnHelper:   { zh: '沪深 300 长期约 8%，S&P 500 约 10%，Nasdaq 100 约 13%。', en: 'CSI 300 long-term ~8%, S&P 500 ~10%, Nasdaq 100 ~13%.' },
    fire_inflation:      { zh: '通胀率 (%)', en: 'Inflation rate (%)' },
    fire_withdrawRate:   { zh: '提取率 (%)', en: 'Withdrawal rate (%)' },
    fire_inflationHelper:{ zh: '中国过去 20 年通胀约 4.8%，取 4% 保守估。提取率是 4% 定律。', en: 'China\'s past 20-year inflation ~4.8%. 4% is the classic withdrawal rate.' },
    fire_expenseNow:     { zh: '今年家庭开支（万）', en: 'Household spending this year (10k CNY)' },
    fire_expenseHelper:  { zh: '全家今年的总花销，会按通胀因子放大。', en: 'Your household spending this year. Scaled by the inflation factor.' },
    fire_rentNow:        { zh: '今年房租收入（万）', en: 'Rent income this year (10k CNY)' },
    fire_otherIncome:    { zh: '退休后其他被动收入（万）', en: 'Other passive income at retirement (10k CNY)' },
    fire_incomeHelper:   { zh: '房租按通胀调整。其他被动收入（退休金/社保）按退休后名义值填。', en: 'Rent adjusts with inflation. Other income (pension, social security) is entered as nominal value at retirement.' },
    fire_retireRatio:    { zh: '退休后开支占比 (%)', en: 'Post-retirement spending ratio (%)' },
    fire_ratioHelper:    { zh: '退休后花销通常是退休前的 60-80%。', en: 'Retirement spending is usually 60-80% of pre-retirement.' },
    fire_calc:           { zh: '计算', en: 'Calculate' },
    fire_empty:          { zh: '填好后点「计算」。', en: 'Fill in the plan and click Calculate.' },

    fire_annual_label:   { zh: '每年需要投入 Y', en: 'Annual investment Y' },
    fire_years_label:    { zh: '达成年限 N', en: 'Years N' },
    fire_inf_label:      { zh: '通胀因子 INF', en: 'Inflation factor INF' },
    fire_required_label: { zh: '需要金融资产 F', en: 'Required assets F' },
    fire_gap_label:      { zh: '资产缺口 D', en: 'Gap D' },
    fire_futureAsset_label:{ zh: '现有资产未来值', en: 'Current assets, future value' },
    fire_multiplier_label:{ zh: '累积倍数 P', en: 'Compound multiplier P' },

    fire_formula_title:  { zh: '计算过程', en: 'Step by step' },
    fire_f_inf:          { zh: '通胀因子 INF', en: 'Inflation factor INF' },
    fire_f_expense:      { zh: '未来家庭开支', en: 'Future spending' },
    fire_f_rent:         { zh: '未来房租收入', en: 'Future rent income' },
    fire_f_required:     { zh: '需要金融资产 F', en: 'Required assets F' },
    fire_f_future:       { zh: '现有资产未来值', en: 'Current assets, future value' },
    fire_f_gap:          { zh: '资产缺口 D', en: 'Gap D' },
    fire_f_multi:        { zh: '累积投资倍数 P', en: 'Compound multiplier P' },
    fire_f_annual:       { zh: '每年需投入 Y', en: 'Annual investment Y' },

    fire_breakdown:      { zh: '逐年积累', en: 'Year-by-year accumulation' },
    fire_th_year:        { zh: '年数', en: 'Year' },
    fire_th_age:         { zh: '年龄', en: 'Age' },
    fire_th_contributed: { zh: '累计投入', en: 'Contributed' },
    fire_th_growth:      { zh: '累计收益', en: 'Growth' },
    fire_th_total:       { zh: '总额', en: 'Total' },
    fire_footer_l:       { zh: 'Invest Tracker · 个人工具', en: 'Invest Tracker · personal tool' },
    fire_footer_r:       { zh: '回报和通胀均为长期均值估计，不构成保证。', en: 'Returns and inflation are long-term averages, not guarantees.' },
    fire_warn_age:       { zh: '退休年龄要大于当前年龄。', en: 'Retirement age must be greater than current age.' },
    fire_warn_withdraw:  { zh: '提取率要大于 0。', en: 'Withdrawal rate must be greater than 0.' },
    fire_warn_ontrack:   { zh: '你已经稳了。现有资产的未来价值已经能覆盖需要的金融资产。', en: 'You\'re already on track. Current assets alone will grow to cover the required amount.' },
    fire_warn_covered:   { zh: '房租和被动收入已经能覆盖退休后的开支，不用再积累金融资产。', en: 'Rent and passive income already cover post-retirement spending. No additional assets required.' },
    fire_per_month:      { zh: ' / 月', en: ' / month' },
    fire_yrs:            { zh: '年', en: 'yrs' },
    fire_yr:             { zh: '年', en: 'yr' },

    // ── Portfolio (portfolio.html) ────────────────────────
    port_eyebrow:        { zh: '交易', en: 'Trades' },
    port_h1:             { zh: '投资组合', en: 'Portfolio' },
    port_lede:           { zh: '记录每一笔买卖 — 价格、券商、税率、买入理由。数据存在浏览器本地，记得用「导出」备份。', en: 'Track every buy and sell — entry price, exit price, broker, tax, and the reason you bought. Data is stored locally in your browser; use Export to back it up.' },
    port_sum_open:       { zh: '持仓笔数', en: 'Open positions' },
    port_sum_invested:   { zh: '投入金额', en: 'Total invested' },
    port_sum_realized:   { zh: '已实现盈亏', en: 'Realized P/L' },
    port_sum_unrealized: { zh: '未实现盈亏', en: 'Unrealized P/L' },
    port_filter_all:     { zh: '全部', en: 'All' },
    port_filter_holding: { zh: '持有中', en: 'Holding' },
    port_filter_sold:    { zh: '已卖出', en: 'Sold' },
    port_btn_sync:       { zh: '同步追踪', en: 'Sync tickers' },
    port_btn_import:     { zh: '导入', en: 'Import' },
    port_btn_export:     { zh: '导出', en: 'Export' },
    port_btn_add:        { zh: '+ 添加交易', en: '+ Add trade' },
    port_modal_new:      { zh: '新增交易', en: 'New trade' },
    port_modal_edit:     { zh: '编辑交易', en: 'Edit trade' },
    port_section_what:   { zh: '买的什么', en: 'What you bought' },
    port_section_buy:    { zh: '买入', en: 'Buy' },
    port_section_sell:   { zh: '卖出（可选）', en: 'Sell (optional)' },
    port_section_notes:  { zh: '备注', en: 'Notes' },
    port_f_symbol:       { zh: '股票代码 *', en: 'Ticker symbol *' },
    port_f_symbol_ph:    { zh: 'AAPL, SXRV.DE, BTC-USD', en: 'AAPL, SXRV.DE, BTC-USD' },
    port_f_name:         { zh: '名称（可选）', en: 'Name (optional)' },
    port_f_name_ph:      { zh: '苹果公司', en: 'Apple Inc.' },
    port_f_currency:     { zh: '币种', en: 'Currency' },
    port_f_broker:       { zh: '券商 / App', en: 'Broker / app' },
    port_f_broker_ph:    { zh: 'Trade Republic, IBKR…', en: 'Trade Republic, IBKR…' },
    port_f_tax:          { zh: '税率 (%)', en: 'Tax rate (%)' },
    port_f_buyDate:      { zh: '买入日期 *', en: 'Buy date *' },
    port_f_buyPrice:     { zh: '买入价 *', en: 'Buy price *' },
    port_f_qty:          { zh: '数量 *', en: 'Quantity *' },
    port_f_sellDate:     { zh: '卖出日期', en: 'Sell date' },
    port_f_sellPrice:    { zh: '卖出价', en: 'Sell price' },
    port_f_reason:       { zh: '为什么买？', en: 'Why did you buy?' },
    port_f_reason_ph:    { zh: '投资逻辑、信号、目标价…', en: 'Thesis, signal, target…' },
    port_f_type:         { zh: '买入方式', en: 'Buy type' },
    port_f_type_lump:    { zh: '单次买入', en: 'Lump sum' },
    port_f_type_dca:     { zh: '定投', en: 'DCA (recurring)' },
    port_f_qty_total:    { zh: '累计数量 *', en: 'Total quantity *' },
    port_f_cost_total:   { zh: '累计成本（可选）', en: 'Total cost (optional)' },
    port_f_cost_total_helper: { zh: '填了才能算盈亏，不填只显示当前市值', en: 'Fill to compute P/L; leave blank to only show market value' },
    port_f_broker_select:{ zh: '— 选择 —', en: '— Select —' },
    port_f_broker_other_label: { zh: '自定义券商', en: 'Custom broker' },
    port_f_broker_other_ph: { zh: '填券商名称', en: 'Broker name' },
    port_section_reasons:{ zh: '为什么买（1-4 条）', en: 'Reasons (1-4)' },
    port_reason_text_ph: { zh: '简短描述这个理由…', en: 'Brief description of this reason…' },
    port_btn_add_reason: { zh: '+ 添加理由', en: '+ Add reason' },
    port_btn_add_link:   { zh: '+ 链接', en: '+ Link' },
    port_btn_remove:     { zh: '删除', en: 'Remove' },
    port_btn_move_up:    { zh: '上移', en: 'Move up' },
    port_btn_move_down:  { zh: '下移', en: 'Move down' },
    port_dca_tag:        { zh: '定投', en: 'DCA' },
    port_detail_avg_price:{ zh: '平均成本', en: 'Avg cost' },
    port_detail_total_cost:{ zh: '累计投入', en: 'Total cost' },
    port_detail_type:    { zh: '买入方式', en: 'Type' },
    port_chart_no_buy_date:{ zh: '定投没有具体买入日,曲线不标买入点', en: 'DCA has no single buy date — no marker shown' },
    port_f_track:        { zh: '自动追踪此股票的价格历史（加入 tracked_tickers.json）', en: 'Auto-track this ticker\'s price history (adds to tracked_tickers.json)' },
    port_f_cancel:       { zh: '取消', en: 'Cancel' },
    port_f_save:         { zh: '保存', en: 'Save' },
    port_f_required:     { zh: '必填', en: 'Required' },
    port_empty_none:     { zh: '还没有交易记录', en: 'No trades yet' },
    port_empty_none_sub: { zh: '点击「添加交易」记录第一笔买入。', en: 'Click "Add trade" to log your first buy.' },
    port_empty_filter:   { zh: '此分类下没有记录', en: 'Nothing in this filter' },
    port_empty_filter_sub:{ zh: '试试「全部」标签。', en: 'Try the All tab.' },
    port_status_holding: { zh: '持有中', en: 'Holding' },
    port_status_sold:    { zh: '已卖出', en: 'Sold' },
    port_pl_realized:    { zh: '已实现', en: 'realized' },
    port_pl_unrealized:  { zh: '未实现 · 现价 {price}', en: 'unrealized · {price} now' },
    port_pl_cost:        { zh: '成本 · 等待价格数据', en: 'cost · awaiting price' },
    port_detail_buyPrice:{ zh: '买入价', en: 'Buy price' },
    port_detail_qty:     { zh: '数量', en: 'Quantity' },
    port_detail_cost:    { zh: '成本', en: 'Cost basis' },
    port_detail_tax:     { zh: '税率', en: 'Tax rate' },
    port_detail_sellPrice:{ zh: '卖出价', en: 'Sell price' },
    port_detail_proceeds:{ zh: '卖出所得', en: 'Proceeds' },
    port_detail_gross:   { zh: '毛盈亏', en: 'Gross P/L' },
    port_detail_taxPaid: { zh: '税款', en: 'Tax paid' },
    port_detail_latest:  { zh: '最新价', en: 'Latest price' },
    port_detail_mktValue:{ zh: '市值', en: 'Mkt value' },
    port_detail_unrealized:{ zh: '浮动盈亏', en: 'Unrealized' },
    port_detail_broker:  { zh: '券商', en: 'Broker' },
    port_meta_bought:    { zh: '买入 {date}', en: 'Bought {date}' },
    port_meta_sold:      { zh: '卖出 {date}', en: 'Sold {date}' },
    port_meta_units:     { zh: '{qty} 股', en: '{qty} units' },
    port_reason_empty:   { zh: '没写买入理由。', en: 'No reason recorded.' },
    port_chart_title:    { zh: '价格曲线', en: 'Price history' },
    port_chart_no_data:  { zh: '暂无 {sym} 的价格数据，明天的定时任务会自动抓取。', en: 'No price data yet for {sym}. Tomorrow\'s run will fetch it.' },
    port_chart_no_file:  { zh: '未找到 prices.json，需要先跑一次价格抓取流程。', en: 'prices.json not found. Run the price-fetch workflow.' },
    port_chart_points:   { zh: '{n} 个数据点 · {start} → {end}', en: '{n} points · {start} → {end}' },
    port_chart_buy_at:   { zh: '买入 @ {price}', en: 'Bought @ {price}' },
    port_chart_sell_at:  { zh: '卖出 @ {price}', en: 'Sold @ {price}' },
    port_action_sell:    { zh: '标记为已卖出', en: 'Mark as sold' },
    port_action_edit:    { zh: '编辑', en: 'Edit' },
    port_action_delete:  { zh: '删除', en: 'Delete' },
    port_confirm_delete: { zh: '确认删除这笔交易？', en: 'Delete this trade?' },
    port_confirm_import: { zh: '导入 {n} 条交易？会替换当前数据。', en: 'Import {n} trades? This replaces your current data.' },
    port_alert_parse:    { zh: '文件无法解析：{msg}', en: 'Could not parse file: {msg}' },
    port_sync_title:     { zh: '同步价格追踪', en: 'Sync price history tracking' },
    port_sync_missing:   { zh: '持仓中有 {n} 个股票尚未追踪：{list}', en: '{n} ticker(s) in portfolio aren\'t being tracked yet: {list}' },
    port_sync_extra:     { zh: '追踪列表中有 {n} 个股票已不在持仓里：{list}', en: '{n} tracked ticker(s) no longer in portfolio: {list}' },
    port_sync_synced:    { zh: '所有持仓股票都在追踪中。', en: 'All portfolio tickers are tracked.' },
    port_sync_col_port:  { zh: '持仓股票', en: 'Portfolio tickers' },
    port_sync_col_tracked:{ zh: '已追踪（仓库内）', en: 'Currently tracked (repo)' },
    port_sync_no_port:   { zh: '暂无持仓股票', en: 'no portfolio tickers' },
    port_sync_no_tracked:{ zh: 'tracked_tickers.json 是空的', en: 'tracked_tickers.json is empty' },
    port_sync_copy:      { zh: '复制 JSON', en: 'Copy JSON' },
    port_sync_copied:    { zh: '已复制 ✓', en: 'Copied ✓' },
    port_sync_download:  { zh: '下载 tracked_tickers.json', en: 'Download tracked_tickers.json' },
    port_sync_gh:        { zh: '在 GitHub 编辑 ↗', en: 'Open in GitHub ↗' },
    port_sync_run:       { zh: '运行 workflow ↗', en: 'Run workflow ↗' },
    port_footer_l:       { zh: 'Invest Tracker · 投资组合', en: 'Invest Tracker · Portfolio' },
    port_footer_r:       { zh: '数据保存在浏览器 localStorage，不会同步。', en: 'Data lives in your browser (localStorage). Not synced.' },

    // ── Alerts (alerts.html) ──────────────────────────────
    alerts_eyebrow:      { zh: '实时', en: 'Live' },
    alerts_h1:           { zh: '价格提醒', en: 'Price alerts' },
    alerts_lede:         { zh: '定时任务每个工作日检查 4 次，价格触及你设的低位/高位时邮件到你的收件箱。', en: 'A scheduled job checks these tickers four times per weekday. When a price crosses your low or high, an email goes to your inbox.' },
    alerts_loading:      { zh: '加载中…', en: 'Loading…' },
    alerts_run_btn:      { zh: '立即检查 ↗', en: 'Run check now ↗' },
    alerts_help_title:   { zh: '设置或修改阈值', en: 'Set or change your thresholds' },
    alerts_help_1_pre:   { zh: '在 GitHub 上打开 ', en: 'Open ' },
    alerts_help_1_post:  { zh: '。', en: ' on GitHub.' },
    alerts_help_2:       { zh: '为每个股票填入 low 和 high（不需要的一侧留 null）。', en: 'Fill in low and high numbers for each ticker (leave as null to skip that side).' },
    alerts_help_3:       { zh: '提交。下次定时检查会使用新值。', en: 'Commit. The next scheduled run will use the new values.' },
    alerts_help_4_pre:   { zh: '想立即检查，点击上方的「', en: 'To check immediately, click ' },
    alerts_help_4_post:  { zh: '」。', en: ' above.' },
    alerts_help_run:     { zh: '立即检查', en: 'Run check now' },
    alerts_status_nodata:{ zh: '暂无数据', en: 'No data yet' },
    alerts_status_nothresh:{ zh: '未设阈值', en: 'No thresholds set' },
    alerts_status_above: { zh: '高于高位 · 停手', en: 'Above high · stop' },
    alerts_status_below: { zh: '低于低位 · 买入', en: 'Below low · buy' },
    alerts_status_in:    { zh: '区间内', en: 'In range' },
    alerts_waiting:      { zh: '等待首次检查', en: 'awaiting first check' },
    alerts_unset:        { zh: '未设置', en: 'not set' },
    alerts_last_pre:     { zh: '上次检查 ', en: 'Last checked ' },
    alerts_never:        { zh: '尚未运行过检查。点「立即检查」测试，或等下次定时任务。', en: 'No checks run yet. Click Run check now to test, or wait for the next scheduled slot.' },
    alerts_low_label:    { zh: '低位', en: 'Low' },
    alerts_high_label:   { zh: '高位', en: 'High' },

    // ── Library (library.html) ────────────────────────────
    lib_eyebrow:         { zh: '即将上线', en: 'Coming next' },
    lib_h1:              { zh: '投资知识库', en: 'Investing knowledge base' },
    lib_lede:            { zh: '发视频、文章或书籍的链接给它，会自动加上摘要、标签和来源。', en: 'Send a link to a video, article, or book and it gets added with a short summary, tags, and source.' },
    lib_card_title:      { zh: '这里会有什么', en: 'What goes here' },
    lib_card_p1:         { zh: '丢进 YouTube 视频、博客文章或书名。每条记录会按标签（价值投资、指数、宏观、行为金融…）和来源归类。', en: 'Drop YouTube videos, blog posts, or book titles. Each entry gets categorized by tag (value, index, macro, behavioral…) and source.' },
    lib_card_p2:         { zh: '输出是一个可按标签和来源过滤的浏览页面。', en: 'Output is a single browsable page with filters by tag and source.' },

    // ── Blog (blog.html) ──────────────────────────────────
    blog_logo_title:     { zh: '双击进入管理模式', en: 'Double-click to enter admin mode' },
    blog_h1:             { zh: '投资 & 工具笔记', en: 'Investing & tool notes' },
    blog_lede:           { zh: '记录自己用过的投资软件、踩过的坑、还在打磨的想法。不是建议，是日志。', en: 'A journal of investing apps I\'ve used, mistakes I\'ve made, and ideas I\'m still working on. Not advice — a log.' },
    blog_footer:         { zh: '纯个人记录，不构成任何投资建议。', en: 'Personal notes only. Not investment advice.' },
  };

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyI18n();
  }

  function format(str, params) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? params[k] : '{' + k + '}'));
  }

  function t(key, params) {
    const entry = dict[key];
    if (!entry) return key;
    return format(entry[currentLang()] || entry.zh || key, params);
  }

  function applyI18n() {
    const lang = currentLang();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = dict[key];
      if (entry && entry[lang] != null) el.textContent = entry[lang];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const entry = dict[key];
      if (entry && entry[lang] != null) el.placeholder = entry[lang];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const entry = dict[key];
      if (entry && entry[lang] != null) el.title = entry[lang];
    });

    // active state on lang switch buttons
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // emit event so per-page JS can re-render dynamic content
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  }

  function wireSwitch() {
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.addEventListener('click', () => setLang(b.getAttribute('data-lang')));
    });
    applyI18n();
  }

  // expose
  window.t = t;
  window.currentLang = currentLang;
  window.setLang = setLang;
  window.applyI18n = applyI18n;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireSwitch);
  } else {
    wireSwitch();
  }
})();
