/* ============================================================
   WISE PILOT AI WIDGET — wisetools.org
   Embed: <script src="mafioso-widget.js" defer></script>
   ============================================================ */

(function () {
  const WORKER_URL = 'https://mafioso.esem39.workers.dev';

  /* ── STYLES ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --maf-green: #00b950;
      --maf-green-h: #00d45c;
      --maf-green-dim: rgba(0,185,80,0.12);
      --maf-green-glow: rgba(0,185,80,0.3);
      --maf-bg: #f0fdf4;
      --maf-bg2: #ffffff;
      --maf-surface: rgba(0,185,80,0.06);
      --maf-border: rgba(0,185,80,0.2);
      --maf-border2: rgba(0,185,80,0.4);
      --maf-tx: #1A1A2E;
      --maf-tx2: rgba(26,26,46,0.65);
      --maf-tx3: rgba(26,26,46,0.4);
      --maf-dark: #064e3b;
    }

    #maf-bubble {
      position: fixed; bottom: 28px; right: 28px; z-index: 99999;
      width: 62px; height: 62px;
      background: linear-gradient(135deg, var(--maf-green), #008c3a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 24px var(--maf-green-glow), 0 0 0 0 var(--maf-green-glow);
      transition: transform .25s, box-shadow .25s;
      animation: maf-pulse 3s ease-in-out infinite;
    }
    #maf-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 40px var(--maf-green-glow);
      animation: none;
    }
    #maf-bubble svg { width: 28px; height: 28px; }
    @keyframes maf-pulse {
      0%,100% { box-shadow: 0 4px 24px var(--maf-green-glow), 0 0 0 0 rgba(0,185,80,0.4); }
      50% { box-shadow: 0 4px 24px var(--maf-green-glow), 0 0 0 10px rgba(0,185,80,0); }
    }

    #maf-badge {
      position: fixed; bottom: 84px; right: 28px; z-index: 99999;
      background: var(--maf-green); color: #fff;
      font-size: 11px; font-weight: 700; font-family: 'Inter', sans-serif;
      padding: 4px 10px; border-radius: 100px;
      opacity: 0; transform: translateY(6px);
      transition: all .3s; pointer-events: none;
      white-space: nowrap;
    }
    #maf-badge.show { opacity: 1; transform: translateY(0); }

    #maf-window {
      position: fixed; bottom: 108px; right: 28px; z-index: 99998;
      width: 420px; height: 700px;
      background: var(--maf-bg2);
      border: 1.5px solid var(--maf-border2);
      border-radius: 20px;
      display: flex; flex-direction: column;
      box-shadow: 0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,185,80,0.08);
      overflow: hidden;
      opacity: 0; transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity .3s, transform .3s;
      font-family: 'Inter', sans-serif;
    }
    #maf-window.open {
      opacity: 1; transform: translateY(0) scale(1);
      pointer-events: all;
    }
    #maf-window::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--maf-green), transparent);
    }

    /* HEADER */
    #maf-header {
      padding: 16px 18px;
      background: linear-gradient(135deg, #064e3b, #065f46);
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
    }
    #maf-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--maf-green);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
      box-shadow: 0 0 16px var(--maf-green-glow);
    }
    #maf-header-info { flex: 1; }
    #maf-header-name {
      font-size: 15px; font-weight: 800; color: #fff;
      letter-spacing: 0.3px;
    }
    #maf-header-status {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: rgba(255,255,255,0.65);
    }
    #maf-status-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
      box-shadow: 0 0 6px rgba(74,222,128,0.6);
      animation: maf-blink 2s ease-in-out infinite;
    }
    @keyframes maf-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
    #maf-close {
      width: 30px; height: 30px; border-radius: 8px;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.7); font-size: 16px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .15s; flex-shrink: 0;
    }
    #maf-close:hover { background: rgba(255,255,255,0.2); color: #fff; }

    /* MESSAGES */
    #maf-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
      background: var(--maf-bg);
    }
    #maf-messages::-webkit-scrollbar { width: 4px; }
    #maf-messages::-webkit-scrollbar-track { background: transparent; }
    #maf-messages::-webkit-scrollbar-thumb { background: var(--maf-border); border-radius: 2px; }

    .maf-msg {
      display: flex; flex-direction: column; max-width: 88%;
      animation: maf-fadein .3s ease;
    }
    @keyframes maf-fadein { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .maf-msg.bot { align-self: flex-start; }
    .maf-msg.user { align-self: flex-end; }

    .maf-bubble-msg {
      padding: 10px 14px; border-radius: 14px;
      font-size: 13px; line-height: 1.6;
    }
    .maf-msg.bot .maf-bubble-msg {
      background: #fff;
      border: 1px solid var(--maf-border);
      color: var(--maf-tx);
      border-bottom-left-radius: 4px;
    }
    .maf-msg.user .maf-bubble-msg {
      background: linear-gradient(135deg, var(--maf-green), #008c3a);
      color: #fff; font-weight: 600;
      border-bottom-right-radius: 4px;
    }
    .maf-msg-time {
      font-size: 10px; color: var(--maf-tx3);
      margin-top: 4px; padding: 0 4px;
    }
    .maf-msg.user .maf-msg-time { text-align: right; }

    /* TYPING */
    #maf-typing {
      display: none; align-self: flex-start;
      padding: 10px 14px;
      background: #fff; border: 1px solid var(--maf-border);
      border-radius: 14px; border-bottom-left-radius: 4px;
    }
    #maf-typing.show { display: flex; gap: 4px; align-items: center; }
    .maf-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--maf-green);
      animation: maf-bounce 1.2s ease-in-out infinite;
    }
    .maf-dot:nth-child(2) { animation-delay: .2s; }
    .maf-dot:nth-child(3) { animation-delay: .4s; }
    @keyframes maf-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }

    /* INPUT */
    #maf-input-wrap {
      padding: 10px 12px 14px;
      display: flex; gap: 8px; align-items: flex-end;
      border-top: 1px solid var(--maf-border);
      flex-shrink: 0; background: #fff;
    }
    #maf-input {
      flex: 1; background: var(--maf-bg);
      border: 1.5px solid var(--maf-border);
      border-radius: 10px; padding: 9px 12px;
      font-size: 13px; font-family: 'Inter', sans-serif;
      color: var(--maf-tx); outline: none; resize: none;
      max-height: 100px; min-height: 38px;
      transition: border-color .15s;
      line-height: 1.5;
    }
    #maf-input:focus { border-color: var(--maf-green); }
    #maf-input::placeholder { color: var(--maf-tx3); }
    #maf-send {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--maf-green), #008c3a);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .2s;
    }
    #maf-send:hover { box-shadow: 0 4px 16px var(--maf-green-glow); transform: scale(1.05); }
    #maf-send svg { width: 16px; height: 16px; }
    #maf-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    #maf-mic {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: var(--maf-green-dim); border: 1.5px solid var(--maf-border);
      color: var(--maf-tx2); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .2s;
    }
    #maf-mic:hover { border-color: var(--maf-green); color: var(--maf-green); }
    #maf-mic.recording {
      background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.5);
      color: #ef4444; animation: maf-rec 1s ease-in-out infinite;
    }
    @keyframes maf-rec { 0%,100%{opacity:1} 50%{opacity:0.5} }

    .maf-msg.bot .maf-bubble-msg a {
      color: var(--maf-green-dark, #008c3a);
      font-weight: 700;
      text-decoration: underline;
    }
    .maf-msg.bot .maf-bubble-msg a:hover {
      color: var(--maf-green);
    }

    /* POWERED */
    #maf-powered {
      text-align: center; padding: 6px;
      font-size: 10px; color: var(--maf-tx3);
      font-family: 'Inter', sans-serif;
      flex-shrink: 0; background: #fff;
    }

    /* MOBILE — FULL SCREEN */
    @media(max-width: 480px) {
      #maf-window {
        width: 100vw; height: 100%;
        right: 0; bottom: 0; top: 0;
        border-radius: 0;
        border: none;
      }
      #maf-bubble { right: 16px; bottom: 20px; }
      #maf-badge { right: 16px; }
      #maf-input-wrap {
        padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
      }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ────────────────────────────────────────────────── */
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="maf-badge">Ask WISE Pilot 💚</div>

    <div id="maf-bubble" title="Ask WISE Pilot">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </div>

    <div id="maf-window">
      <div id="maf-header">
        <div id="maf-avatar">💚</div>
        <div id="maf-header-info">
          <div id="maf-header-name">WISE Pilot</div>
          <div id="maf-header-status">
            <div id="maf-status-dot"></div>
            <span>EU Business Assistant</span>
          </div>
        </div>
        <button id="maf-close">✕</button>
      </div>

      <div id="maf-messages">
        <div class="maf-msg bot">
          <div class="maf-bubble-msg">Hi! I'm WISE Pilot — your EU business assistant. Ask me about VAT, IBAN, Wise Business, customs duties, GDPR, or any tool on wisetools.org. 💚</div>
          <div class="maf-msg-time">${getTime()}</div>
        </div>
        <div id="maf-typing"><div class="maf-dot"></div><div class="maf-dot"></div><div class="maf-dot"></div></div>
      </div>

      <div id="maf-input-wrap">
        <textarea id="maf-input" placeholder="Ask WISE Pilot anything..." rows="1"></textarea>
        <button id="maf-mic" title="Voice input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <button id="maf-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div id="maf-powered">Powered by WISE Pilot AI · wisetools.org</div>
    </div>
  `;
  document.body.appendChild(container);

  /* ── REFS ────────────────────────────────────────────────── */
  const bubble   = document.getElementById('maf-bubble');
  const win      = document.getElementById('maf-window');
  const closeBtn = document.getElementById('maf-close');
  const messages = document.getElementById('maf-messages');
  const input    = document.getElementById('maf-input');
  const sendBtn  = document.getElementById('maf-send');
  const typing   = document.getElementById('maf-typing');
  const badge    = document.getElementById('maf-badge');
  const micBtn   = document.getElementById('maf-mic');

  let isOpen = false;
  let history = [];
  let recognition = null;
  let isRecording = false;

  /* ── VOICE INPUT ─────────────────────────────────────────── */
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      input.value = e.results[0][0].transcript;
      autoResize(); stopRecording(); sendMessage();
    };
    recognition.onerror = () => stopRecording();
    recognition.onend = () => stopRecording();
    micBtn.addEventListener('click', () => {
      if (isRecording) { stopRecording(); return; }
      isRecording = true;
      micBtn.classList.add('recording');
      recognition.lang = navigator.language || 'en-US';
      recognition.start();
    });
  } else {
    micBtn.style.display = 'none';
  }

  function stopRecording() {
    isRecording = false;
    micBtn.classList.remove('recording');
    try { recognition && recognition.stop(); } catch(e) {}
  }

  /* ── BADGE AUTO-SHOW ─────────────────────────────────────── */
  setTimeout(() => {
    if (!isOpen) badge.classList.add('show');
  }, 4000);

  /* ── HELPERS ─────────────────────────────────────────────── */
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `maf-msg ${role}`;
    // For bot messages render HTML (links), for user escape it
    const content = role === 'bot'
      ? text.replace(/\n/g, '<br>')
      : text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    div.innerHTML = `
      <div class="maf-bubble-msg">${content}</div>
      <div class="maf-msg-time">${getTime()}</div>
    `;
    // Make links open in same tab (no target="_blank" override needed for internal)
    div.querySelectorAll('a').forEach(a => {
      if (!a.href.includes('wise.prf.hn')) {
        a.removeAttribute('target');
      }
    });
    messages.insertBefore(div, typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function setTyping(show) {
    typing.classList.toggle('show', show);
    sendBtn.disabled = show;
    messages.scrollTop = messages.scrollHeight;
  }

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }

  /* ── TOGGLE ──────────────────────────────────────────────── */
  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    badge.classList.remove('show');
    if (isOpen) setTimeout(() => input.focus(), 300);
  }

  bubble.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  /* ── SEND ────────────────────────────────────────────────── */
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    addMessage(text, 'user');
    history.push({ role: 'user', content: text });
    input.value = '';
    input.style.height = 'auto';
    setTyping(true);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || data.reply || 'Something went wrong. Try again.';
      history.push({ role: 'assistant', content: reply });
      setTyping(false);
      addMessage(reply, 'bot');
    } catch (e) {
      setTyping(false);
      addMessage('Connection error. Please try again.', 'bot');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  input.addEventListener('input', autoResize);

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

})();

// ===== MOBILE MENU FIX =====
window.toggleMenu = function() {
  const m = document.getElementById('mob-menu');
  const o = document.getElementById('overlay');
  if (!m) return;
  const open = m.classList.toggle('open');
  if (o) o.style.display = open ? 'block' : 'none';
};
