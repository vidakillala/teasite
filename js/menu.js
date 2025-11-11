// Тримайте файл і підключіть <script src="js/menu.js" defer></script> перед закриваючим </body>
(function(){
  const btn = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
  if (!btn) return;

  let panel = document.getElementById('mobile-panel');
  if (!panel) {
    panel = document.createElement('nav');
    panel.className = 'mobile-panel';
    panel.id = 'mobile-panel';
    panel.innerHTML = '<div class="panel-inner"></div>';
    document.body.appendChild(panel);
  }
  const inner = panel.querySelector('.panel-inner');

  function cloneAndClean(node) {
    if (!node) return null;
    const c = node.cloneNode(true);
    c.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
    return c;
  }

  function setupSubmenus(root) {
    if (!root) return;
    root.querySelectorAll('.has-submenu').forEach(h => {
      const a = h.querySelector('a');
      const sub = h.querySelector('.submenu');
      if (!a || !sub) return;
      // hide submenu by default in panel
      sub.style.display = 'none';
      h.classList.remove('open');
      a.setAttribute('aria-expanded', 'false');
      // toggle on click of the parent link itself
      a.addEventListener('click', function(e){
        // if link points to real page, allow navigation; we assume catalog uses href="#" — intercept when href is "#" or empty
        const href = a.getAttribute('href') || '';
        const isDummy = href === '#' || href.trim() === '';
        if (!isDummy) return; // allow normal navigation
        e.preventDefault();
        const opened = h.classList.toggle('open');
        sub.style.display = opened ? 'block' : 'none';
        a.setAttribute('aria-expanded', opened ? 'true' : 'false');
      }, { passive: false });
    });
  }

  function populatePanel() {
    inner.innerHTML = '';
    const brandWrap = document.createElement('div');
    brandWrap.className = 'panel-brand';
    const logo = document.querySelector('.site-logo') ? document.querySelector('.site-logo').cloneNode(true) : null;
    if (logo) { logo.style.height = '36px'; brandWrap.appendChild(logo); }
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.type = 'button';
    closeBtn.textContent = 'Закрити';
    closeBtn.addEventListener('click', closeMenu);
    closeBtn.style.marginLeft = 'auto';
    brandWrap.appendChild(closeBtn);
    inner.appendChild(brandWrap);

    const left = document.querySelector('.header-left');
    const right = document.querySelector('.header-right');

    const leftClone = cloneAndClean(left);
    const rightClone = cloneAndClean(right);

    // prepare submenus in clones
    setupSubmenus(leftClone);
    setupSubmenus(rightClone);

    if (leftClone) { leftClone.style.display = 'block'; inner.appendChild(leftClone); }
    if (rightClone) { rightClone.style.display = 'block'; rightClone.style.marginTop = '12px'; inner.appendChild(rightClone); }

    if (!leftClone && !rightClone) {
      const fallback = document.createElement('div');
      fallback.innerHTML = '<a href="index.html">Головна</a><a href="products.html">Каталог</a>';
      inner.appendChild(fallback);
    }
  }

  function openMenu() {
    populatePanel();
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded','true');
    setTimeout(()=> panel.querySelector('a,button')?.focus(), 150);
  }
  function closeMenu() {
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded','false');
  }

  btn.addEventListener('click', function(e){
    const isOpen = document.body.classList.contains('nav-open');
    if (isOpen) closeMenu(); else openMenu();
  });

  document.addEventListener('click', function(e){
    if (!document.body.classList.contains('nav-open')) return;
    if (e.target.closest('.mobile-panel') || e.target.closest('#nav-toggle')) return;
    closeMenu();
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeMenu();
  });

  // замість поточного panel.addEventListener('click', ...)
  panel.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if (!a) return;
    const href = (a.getAttribute('href') || '').trim();
    const isDummy = href === '' || href === '#';
    // закриваємо панель тільки якщо це реальне посилання (перехід на іншу сторінку)
    if (!isDummy) {
      setTimeout(closeMenu, 120);
    }
  });

})();