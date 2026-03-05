'use strict';

/* ════════════════════════════════════
   LOADER — SVG draws itself, then exits
════════════════════════════════════ */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      startHero();
    }, 1800);
  });
})();

/* ════════════════════════════════════
   CURSOR — pen nib follows mouse
════════════════════════════════════ */
(function () {
  const nib = document.getElementById('cursorNib');
  if (!nib) return;

  document.addEventListener('mousemove', e => {
    nib.style.left = e.clientX + 'px';
    nib.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .feat-card, .menu-card, .review-card, .pol, .info-note').forEach(el => {
    el.addEventListener('mouseenter', () => nib.classList.add('big'));
    el.addEventListener('mouseleave', () => nib.classList.remove('big'));
  });
})();

/* ════════════════════════════════════
   NAV — scroll class + mobile toggle
════════════════════════════════════ */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }
})();

/* ════════════════════════════════════
   HERO SEQUENCE — draw SVG paths then
   reveal tagline, sub, buttons
════════════════════════════════════ */
function startHero() {
  // Animate hero image zoom-in
  const img = document.getElementById('heroImg');
  if (img) img.classList.add('loaded');

  // Draw SVG letter paths one by one
  const hpaths = document.querySelectorAll('.hpath');
  hpaths.forEach(p => p.classList.add('drawn'));

  // Tagline
  const tagline = document.getElementById('heroTagline');
  if (tagline) tagline.classList.add('visible');

  // Sub & buttons
  const sub = document.getElementById('heroSub');
  const btns = document.getElementById('heroBtns');
  if (sub) { sub.style.transition = 'opacity .7s ease 1.6s, transform .8s cubic-bezier(.34,1.56,.64,1) 1.6s'; sub.classList.add('visible'); }
  if (btns) btns.classList.add('visible');

  // Drop hero stamps
  setTimeout(() => stampAll('#hs1, #hs2'), 1400);
}

/* ════════════════════════════════════
   STAMPS — slam down with rotation
════════════════════════════════════ */
function stampAll(selector) {
  document.querySelectorAll(selector).forEach(el => el.classList.add('stamped'));
}

/* ════════════════════════════════════
   INTERSECTION OBSERVER
   Handles: bounce-reveal, stamps,
   polaroids, doodle underlines
════════════════════════════════════ */
(function () {
  // BOUNCE REVEALS
  const bounceEls = document.querySelectorAll('.bounce-reveal');
  const bounceObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      bounceObs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  bounceEls.forEach(el => bounceObs.observe(el));

  // STAMPS
  const stampEls = document.querySelectorAll('.stamp:not(#hs1):not(#hs2)');
  const stampObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('stamped'), 150);
      stampObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  stampEls.forEach(el => stampObs.observe(el));

  // POLAROIDS — fall and land
  const polEls = document.querySelectorAll('.pol');
  const polObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('landed');
      polObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  polEls.forEach(el => polObs.observe(el));

  // DOODLE UNDERLINES — draw when parent visible
  const doodleEls = document.querySelectorAll('.doodle-under');
  const doodleObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('drawn');
      doodleObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  doodleEls.forEach(el => doodleObs.observe(el));

  // NAV LOGO draw on page load
  const navDrawPaths = document.querySelectorAll('.nav-draw');
  navDrawPaths.forEach(p => p.classList.add('drawn'));

})();

/* ════════════════════════════════════
   MENU FILTER — bouncy active state
════════════════════════════════════ */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.menu-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            if (card.classList.contains('hidden')) card.style.display = 'none';
          }, 420);
        }
      });
    });
  });
})();

/* ════════════════════════════════════
   RESERVATION TABS
════════════════════════════════════ */
(function () {
  const tabs = document.querySelectorAll('.res-tab');
  const panels = document.querySelectorAll('.res-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ════════════════════════════════════
   WHATSAPP RESERVATION
════════════════════════════════════ */
(function () {
  const btn = document.getElementById('sendWaRes');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name   = document.getElementById('wa-name')?.value || '';
    const date   = document.getElementById('wa-date')?.value || '';
    const time   = document.getElementById('wa-time')?.value || '';
    const guests = document.getElementById('wa-guests')?.value || '2 guests';
    const msg = `Hello Nishan Cafe! 🙏\n\nReservation request:\n\n👤 Name: ${name}\n📅 Date: ${date}\n🕐 Time: ${time}\n👥 Guests: ${guests}\n\nPlease confirm! Thank you ☕`;
    window.open(`https://wa.me/9779848303515?text=${encodeURIComponent(msg)}`, '_blank');
  });
})();

/* ════════════════════════════════════
   CART
════════════════════════════════════ */
(function () {
  const cartBtn     = document.getElementById('cartBtn');
  const sidebar     = document.getElementById('cartSidebar');
  const closeBtn    = document.getElementById('closeCart');
  const overlay     = document.getElementById('cartOverlay');
  const itemsEl     = document.getElementById('cartItems');
  const badge       = document.getElementById('cartBadge');
  const totalEl     = document.getElementById('cartTotal');
  const foot        = document.getElementById('cartFoot');
  const waBtn       = document.getElementById('orderWa');
  const emBtn       = document.getElementById('orderEm');

  if (!cartBtn) return;

  let cart = {};

  const open  = () => { sidebar.classList.add('open');  overlay.classList.add('active'); };
  const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

  cartBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay)  overlay.addEventListener('click', close);

  function render() {
    const entries = Object.entries(cart);
    const total   = entries.reduce((s, [, i]) => s + i.price * i.qty, 0);
    const qty     = entries.reduce((s, [, i]) => s + i.qty, 0);

    if (badge)   badge.textContent = qty;
    if (totalEl) totalEl.textContent = 'Rs. ' + total;

    if (!entries.length) {
      if (itemsEl) itemsEl.innerHTML = '<p class="cart-empty">Nothing yet — add something! ☕</p>';
      if (foot) foot.style.display = 'none';
      return;
    }

    if (foot) foot.style.display = 'flex';
    if (itemsEl) {
      itemsEl.innerHTML = entries.map(([key, item]) => `
        <div class="cart-item">
          <span class="cart-item-name">${item.name}</span>
          <div class="cart-item-controls">
            <button data-action="dec" data-key="${key}">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button data-action="inc" data-key="${key}">+</button>
          </div>
          <span class="cart-item-price">Rs. ${item.price * item.qty}</span>
        </div>
      `).join('');

      itemsEl.querySelectorAll('[data-action]').forEach(b => {
        b.addEventListener('click', () => {
          const k = b.getAttribute('data-key');
          if (b.getAttribute('data-action') === 'inc') {
            cart[k].qty++;
          } else {
            cart[k].qty--;
            if (cart[k].qty <= 0) delete cart[k];
          }
          render();
        });
      });
    }
  }

  // Add to cart
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-cart');
    if (!btn) return;

    const name  = btn.getAttribute('data-item');
    const price = +btn.getAttribute('data-price');
    const key   = name.replace(/\s+/g, '_');

    if (cart[key]) cart[key].qty++;
    else cart[key] = { name, price, qty: 1 };

    // Stamp-style feedback
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = 'var(--caramel)';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 900);

    render();
    open();
  });

  // WhatsApp order
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const lines = Object.values(cart).map(i => `${i.name} x${i.qty} = Rs.${i.price * i.qty}`).join('\n');
      const total = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
      const msg = `Hello Nishan Cafe! 🙏\n\nMy order:\n\n${lines}\n\n💰 Total: Rs. ${total}\n\nPlease confirm! ☕`;
      window.open(`https://wa.me/9779848303515?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Email order
  if (emBtn) {
    emBtn.addEventListener('click', () => {
      const lines = Object.values(cart).map(i => `${i.name} x${i.qty} = Rs.${i.price * i.qty}`).join('%0A');
      const total = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
      window.location.href = `mailto:hello@nishancafe.com?subject=Order from Nishan Cafe Website&body=Hello!%0A%0AMy order:%0A${lines}%0A%0ATotal: Rs. ${total}%0A%0AThank you! ☕`;
    });
  }
})();
