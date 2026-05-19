// Blog data. Edit through blog.html in admin mode (双击 logo 圆点),
// then click "导出 posts.js" to download an updated version and commit it.
window.BLOG_DATA = {
  "version": 1,
  "posts": [
    {
      "id": "fire-calculator-diy",
      "date": "2026-05-19",
      "tags": ["软件", "工具"],
      "title": "为什么我自己写了一个 FIRE 计算器",
      "excerpt": "市面上的 FIRE 计算器要么藏在付费墙后，要么把简单的复利公式包装成 20 个输入框。我想要的就是：年龄、目标、ETF、出数字。",
      "body": "<h3>需求很小</h3>\n<p>我想知道一件事：从现在到目标退休年龄，每年要投多少钱才能到目标金额。就这一个数。</p>\n<p>但搜了一圈 FIRE calculator，大多数都要登录、要填家庭支出、要选风险偏好。我只想做一道算术题。</p>\n<h3>核心就是年金现值公式</h3>\n<p>已经在投的本金 <code>P</code>，年化收益率 <code>r</code>，年数 <code>n</code>，目标 <code>T</code>，那么每年要投的 <code>A</code> 满足：</p>\n<p><code>P(1+r)^n + A · [(1+r)^n − 1]/r · (1+r) = T</code></p>\n<p>剩下的就是把通胀折进去（用实际收益率 <code>(1+r)/(1+i) − 1</code>）、给几个常见 ETF 预设个历史收益率。</p>\n<h3>预设 ETF 历史收益率</h3>\n<ul>\n  <li>VOO / VTI ≈ 10%</li>\n  <li>QQQ / SXRV ≈ 13%</li>\n  <li>VT ≈ 8%</li>\n  <li>SCHD ≈ 11%</li>\n  <li>BND ≈ 4%</li>\n</ul>\n<p>这些是几十年回看的平均数，不是承诺。但作为规划起点够用了。</p>\n<h3>结论</h3>\n<p>很多投资工具是为了让你停留更久而设计的，不是为了让你快速拿到答案。如果你的需求很明确，自己写半天就能搞定一个比 SaaS 干净的版本。</p>"
    },
    {
      "id": "qqq-to-sxrv",
      "date": "2026-05-17",
      "tags": ["经验", "ETF"],
      "title": "为什么我把 QQQ 换成了 SXRV.DE",
      "excerpt": "同一个底层（Nasdaq 100），但在德国上市的 UCITS ETF。对非美居民来说，税务待遇可能完全不一样。",
      "body": "<h3>背景</h3>\n<p>QQQ 是美国上市的 ETF，对非美居民来说有两件事不太友好：</p>\n<ul>\n  <li>美国预扣股息税 30%（有税收协定可能降到 15%）</li>\n  <li>遗产税：超过 6 万美元的美股资产有遗产税风险</li>\n</ul>\n<h3>SXRV.DE 的不同</h3>\n<p>SXRV 是 iShares 的 Nasdaq 100 UCITS ETF，在爱尔兰注册、德国交易所上市。对非美居民：</p>\n<ul>\n  <li>爱尔兰只对美股股息收 15%（基金层面已经扣过），到投资人手里通常更干净</li>\n  <li>累积型（Acc）—— 股息自动再投，不会触发分红课税事件</li>\n  <li>没有美国遗产税敞口</li>\n</ul>\n<h3>代价</h3>\n<p>流动性不如 QQQ，价差稍宽。但持有期是 20 年的话，这点摩擦可以忽略。</p>\n<h3>不是建议</h3>\n<p>每个国家的居民税务情况不一样。我在欧洲，所以这个换仓有意义。在美国本土就完全不用想这件事，直接 QQQ / VTI 就好。</p>"
    },
    {
      "id": "github-actions-price-alerts",
      "date": "2026-05-15",
      "tags": ["软件", "工具"],
      "title": "用 GitHub Actions 做免费的价格提醒",
      "excerpt": "不想再装一个 app，也不想给 Yahoo Finance 邮件列表。用 Actions + yfinance + Gmail SMTP，几十行代码搞定。",
      "body": "<h3>思路</h3>\n<p>定时任务 + 公开免费数据源 + 你已经有的邮箱。三样都是 0 成本。</p>\n<h3>组成</h3>\n<ul>\n  <li><strong>watchlist.json</strong> 配置 ticker、低点、高点</li>\n  <li><strong>Actions</strong> 每周一到周五跑几次 cron</li>\n  <li><strong>yfinance</strong> 拉当前价格</li>\n  <li><strong>Gmail SMTP</strong> 发邮件（用 App Password，不是登录密码）</li>\n  <li><strong>state.json</strong> 记录已经报过警的，避免每次都发</li>\n</ul>\n<h3>踩过的坑</h3>\n<p>第一版没做去重，结果价格在阈值附近震荡的时候一天发了 4 封。加了 <code>below_alerted / above_alerted</code> 状态后，跨越阈值才发一次，回到中间区间才重置。</p>\n<h3>什么时候不适合</h3>\n<p>如果你做日内或需要秒级精度，这套不行。如果你只是关心某支 ETF 跌没跌穿你的加仓线，完全够。</p>"
    }
  ],
  "trash": []
};
