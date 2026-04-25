/* nav-component.js — точная копия меню WINNER + Login */
(function() {

const style = document.createElement('style');
style.textContent = `
#sl-header {
  background: #F0F5F2;
  border-bottom: 1px solid #C0D9D0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  font-family: 'Inter', sans-serif;
}
#sl-header *, #sl-header *::before, #sl-header *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}
.sl-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.sl-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.sl-logo img { height: 40px; width: auto; }

/* NAV — точно как у WINNER */
.sl-nav-links {
  display: flex;
  gap: 2px;
  list-style: none;
  align-items: center;
}
.sl-nav-links > li { position: relative; }
.sl-nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: #5E7A70;
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 8px;
  transition: all .2s;
  display: flex;
  align-items: center;
  gap: 5px;
}
.sl-nav-links a:hover { color: #00B972; background: rgba(0,185,114,0.08); }
.sl-nav-links a.sl-active { color: #00B972; font-weight: 700; background: rgba(0,185,114,0.12); }

/* DROPDOWN — фикс закрытия */
.sl-has-dropdown > a::after { content: '▾'; font-size: 11px; opacity: 0.6; }
.sl-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 8px;
  z-index: 200;
  min-width: 280px;
}
.sl-dropdown-inner {
  background: #FFFFFF;
  border: 1px solid #C0D9D0;
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(22,50,46,0.12);
  padding: 8px;
  max-height: 500px;
  overflow-y: auto;
}
.sl-dropdown-menu a {
  display: block;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #5E7A70;
  text-decoration: none;
  transition: all .15s;
  white-space: nowrap;
}
.sl-dropdown-menu a:hover { background: rgba(0,185,114,0.08); color: #00B972; }
.sl-drop-section {
  font-size: 10px;
  font-weight: 700;
  color: #8AACA0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 14px 4px;
  margin-top: 4px;
}
.sl-drop-section:first-child { margin-top: 0; }
.sl-has-dropdown.sl-open .sl-dropdown-menu { display: block; }

/* КНОПКИ — точно как .header-cta у WINNER */
.sl-header-right { display: flex; align-items: center; gap: 12px; }

.sl-btn-login {
  height: 38px;
  padding: 0 20px;
  background: transparent;
  color: #5E7A70;
  font-size: 13px;
  font-weight: 600;
  border-radius: 9px;
  border: 1.5px solid #C0D9D0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all .2s;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
}
.sl-btn-login:hover { color: #00B972; border-color: #00B972; }

.sl-btn-cta {
  height: 38px;
  padding: 0 20px;
  background: #00B972;
  color: white;
  font-size: 13px;
  font-weight: 700;
  border-radius: 9px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all .2s;
  white-space: nowrap;
  border: none;
  font-family: 'Inter', sans-serif;
}
.sl-btn-cta:hover {
  background: #00A060;
  box-shadow: 0 4px 12px rgba(0,185,114,0.25);
  transform: translateY(-1px);
}

/* HAMBURGER */
.sl-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
}
.sl-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #16322E;
  border-radius: 2px;
  transition: all .3s;
}
.sl-mob-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  z-index: 98;
}
.sl-mob-menu {
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-bottom: 1px solid #C0D9D0;
  z-index: 99;
  padding: 16px 24px 24px;
  box-shadow: 0 8px 24px rgba(22,50,46,0.06);
  max-height: 80vh;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
}
.sl-mob-menu.open { display: block; }
.sl-mob-menu nav { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
.sl-mob-menu nav a {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #455854;
  text-decoration: none;
}
.sl-mob-menu nav a:hover { background: rgba(0,185,114,0.08); color: #00B972; }
.sl-mob-section {
  font-size: 11px;
  font-weight: 700;
  color: #8AACA0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 14px 4px;
}
@media (max-width: 768px) {
  .sl-nav-links, .sl-header-right { display: none; }
  .sl-hamburger { display: flex; }
}
`;
document.head.appendChild(style);

document.body.insertAdjacentHTML('afterbegin', `
<header id="sl-header">
  <div class="sl-header-inner">
    <a href="/index.html" class="sl-logo">
      <img src="/images/wisetools-logo.png" alt="Wisetools">
    </a>
    <nav>
      <ul class="sl-nav-links">
        <li><a href="/index.html">Home</a></li>
        <li class="sl-has-dropdown">
          <a href="/wise-business.html">Wise</a>
          <div class="sl-dropdown-menu"><div class="sl-dropdown-inner">
            <div class="sl-drop-section">Wise Business</div>
            <a href="/wise-business.html">💳 Wise Business Account</a>
            <a href="/wise-send-money.html">💸 Send Money Abroad</a>
            <a href="/wise-multi-currency.html">🌍 Multi-Currency Account</a>
            <a href="/wise-iban.html">🏦 Get EU IBAN with Wise</a>
            <a href="/wise-card.html">💳 Wise Debit Card</a>
            <div class="sl-drop-section">Comparisons</div>
            <a href="/wise-vs-bank.html">⚖️ Wise vs Traditional Banks</a>
            <a href="/wise-belgium.html">🇧🇪 Wise in Belgium</a>
            <a href="/wise-germany.html">🇩🇪 Wise in Germany</a>
            <a href="/wise-france.html">🇫🇷 Wise in France</a>
          </div></div>
        </li>
        <li class="sl-has-dropdown">
          <a href="/tools.html">Free Tools</a>
          <div class="sl-dropdown-menu"><div class="sl-dropdown-inner">
            <div class="sl-drop-section">Core Tools</div>
            <a href="/vat-validator.html">🔍 VAT Validator</a>
            <a href="/iban-validator.html">🏦 IBAN Validator</a>
            <a href="/vat-calculator.html">🧮 VAT Calculator</a>
            <a href="/currency-converter.html">💱 Currency Converter</a>
            <a href="/salary-calculator.html">💶 Salary Calculator</a>
            <a href="/password-generator.html">🔐 Password Generator</a>
            <a href="/invoice-number.html">📋 Invoice Number</a>
            <a href="/text-analyzer.html">📝 Text Analyzer</a>
            <a href="/time-converter.html">🕐 EU Time Converter</a>
            <a href="/qr-generator.html">📱 QR Generator</a>
            <a href="/swift-lookup.html">🏛️ BIC / SWIFT Lookup</a>
            <a href="/gdpr-checklist.html">🛡️ GDPR Checklist</a>
            <div class="sl-drop-section">Advanced Tools</div>
            <a href="/oss-ioss-navigator.html">🗺️ OSS/IOSS Navigator</a>
            <a href="/eori-checklist.html">🛂 EORI Checklist</a>
            <a href="/invoice-builder.html">📄 Invoice Builder</a>
            <a href="/eco-labeling.html">🌿 Eco-Labeling</a>
            <a href="/customs-duties.html">🚢 EU Customs Duties</a>
            <a href="/company-check.html">🏢 EU Company Check</a>
          </div></div>
        </li>
        <li><a href="/blog.html">Blog</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="sl-header-right">
      <a href="https://wise.prf.hn/click/camref:1101l5Fj6t/pubref:login/ar:https%3A%2F%2Fwise.com%2Flogin"
         target="_blank" rel="noopener sponsored" class="sl-btn-login">Log in</a>
      <a href="https://wise.prf.hn/l/EJDWMNp/"
         target="_blank" rel="noopener sponsored" class="sl-btn-cta">💳 Open Wise Account</a>
    </div>
    <div class="sl-hamburger" id="sl-hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</header>
<div class="sl-mob-overlay" id="sl-overlay"></div>
<div class="sl-mob-menu" id="sl-mob-menu">
  <nav>
    <a href="/index.html">Home</a>
    <div class="sl-mob-section">Wise</div>
    <a href="/wise-business.html">💳 Wise Business Account</a>
    <a href="/wise-send-money.html">💸 Send Money Abroad</a>
    <a href="/wise-multi-currency.html">🌍 Multi-Currency Account</a>
    <a href="/wise-iban.html">🏦 Get EU IBAN</a>
    <a href="/wise-card.html">💳 Wise Card</a>
    <a href="/wise-vs-bank.html">⚖️ Wise vs Banks</a>
    <div class="sl-mob-section">Free Tools</div>
    <a href="/vat-validator.html">🔍 VAT Validator</a>
    <a href="/iban-validator.html">🏦 IBAN Validator</a>
    <a href="/vat-calculator.html">🧮 VAT Calculator</a>
    <a href="/currency-converter.html">💱 Currency Converter</a>
    <a href="/salary-calculator.html">💶 Salary Calculator</a>
    <a href="/password-generator.html">🔐 Password Generator</a>
    <a href="/invoice-number.html">📋 Invoice Number</a>
    <a href="/text-analyzer.html">📝 Text Analyzer</a>
    <a href="/time-converter.html">🕐 EU Time Converter</a>
    <a href="/qr-generator.html">📱 QR Generator</a>
    <a href="/swift-lookup.html">🏛️ BIC / SWIFT Lookup</a>
    <a href="/gdpr-checklist.html">🛡️ GDPR Checklist</a>
    <a href="/oss-ioss-navigator.html">🗺️ OSS/IOSS Navigator</a>
    <a href="/eori-checklist.html">🛂 EORI Checklist</a>
    <a href="/invoice-builder.html">📄 Invoice Builder</a>
    <a href="/eco-labeling.html">🌿 Eco-Labeling</a>
    <a href="/customs-duties.html">🚢 EU Customs Duties</a>
    <a href="/company-check.html">🏢 EU Company Check</a>
    <a href="/blog.html">Blog</a>
    <a href="/contact.html">Contact</a>
  </nav>
  <a href="https://wise.prf.hn/l/EJDWMNp/" target="_blank" rel="noopener sponsored"
     class="sl-btn-cta" style="justify-content:center;margin-top:8px">💳 Open Wise Account</a>
</div>
`);

const pg = '/' + location.pathname.split('/').pop();
document.querySelectorAll('.sl-nav-links a').forEach(a => {
  if (a.getAttribute('href') === pg) a.classList.add('sl-active');
});

document.querySelectorAll('.sl-has-dropdown').forEach(li => {
  let t;
  li.addEventListener('mouseenter', () => {
    clearTimeout(t);
    document.querySelectorAll('.sl-has-dropdown.sl-open').forEach(el => { if (el !== li) el.classList.remove('sl-open'); });
    li.classList.add('sl-open');
  });
  li.addEventListener('mouseleave', () => { t = setTimeout(() => li.classList.remove('sl-open'), 150); });
});
document.addEventListener('click', e => {
  if (!e.target.closest('.sl-has-dropdown'))
    document.querySelectorAll('.sl-has-dropdown.sl-open').forEach(el => el.classList.remove('sl-open'));
});

const burger = document.getElementById('sl-hamburger');
const mob = document.getElementById('sl-mob-menu');
const ov = document.getElementById('sl-overlay');
function tog() { const o = mob.classList.toggle('open'); ov.style.display = o ? 'block' : 'none'; }
burger.addEventListener('click', tog);
ov.addEventListener('click', tog);

})();
