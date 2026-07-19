/* =====================================================
   VIP ACCESS — Scripts (JS puro, sem dependências)
   ===================================================== */

// Ano dinâmico no rodapé
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Contador de visitantes online (simulado) ---------- */
(function initOnlineCounter() {
  const el = document.getElementById('onlineCount');
  if (!el) return;
  let n = 2800 + Math.floor(Math.random() * 120);
  el.textContent = n.toLocaleString('pt-BR');
  setInterval(() => {
    // varia entre -3 e +5 a cada 3s
    n += Math.floor(Math.random() * 9) - 3;
    if (n < 2600) n = 2600;
    if (n > 3200) n = 3200;
    el.textContent = n.toLocaleString('pt-BR');
  }, 3000);
})();

/* ---------- Contador regressivo (24h rolling) ---------- */
(function initCountdown() {
  const h = document.getElementById('cdH');
  const m = document.getElementById('cdM');
  const s = document.getElementById('cdS');
  if (!h || !m || !s) return;

  // deadline: hoje 23:59:59
  function nextDeadline() {
    const d = new Date();
    d.setHours(23, 59, 59, 0);
    if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1);
    return d.getTime();
  }
  let end = nextDeadline();

  function tick() {
    let diff = end - Date.now();
    if (diff <= 0) { end = nextDeadline(); diff = end - Date.now(); }
    const hh = Math.floor(diff / 3600000);
    const mm = Math.floor((diff % 3600000) / 60000);
    const ss = Math.floor((diff % 60000) / 1000);
    h.textContent = String(hh).padStart(2, '0');
    m.textContent = String(mm).padStart(2, '0');
    s.textContent = String(ss).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------- Sticky CTA aparece após rolar ---------- */
(function initStickyCta() {
  const sticky = document.getElementById('stickyCta');
  if (!sticky) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) sticky.classList.add('show');
    else sticky.classList.remove('show');
  }, { passive: true });
})();

/* ---------- Botão comprar (placeholder) ----------
   Altere o conteúdo desta função para integrar
   com seu gateway (Stripe, Pix, Hotmart, etc).
   Basta trocar o window.location por seu link real.
------------------------------------------------------- */
(function initCheckout() {
  const btn = document.getElementById('btnComprar');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // 👉 SUBSTITUA a URL abaixo pelo seu link de checkout
    const CHECKOUT_URL = 'https://seu-checkout.com/produto-vip';
    window.location.href = CHECKOUT_URL;
  });
})();

/* ---------- Fade-in em elementos ao entrar na tela ---------- */
(function initReveal() {
  const els = document.querySelectorAll('.bcard, .tcard, .gcard, .whats-in__box, .faq details');
  if (!('IntersectionObserver' in window)) return;
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();
