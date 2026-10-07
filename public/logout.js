// Floating "Log out" button (bottom right) for the dashboards, so a different key can be tried on the same computer.
(function(){
  const css = document.createElement('style');
  css.textContent = '#jfLogout{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:40;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid rgba(0,0,0,.18);background:#1E2B33;color:#fff;font:600 13px/1 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer}'
    + '#jfLogout:focus-visible{outline:3px solid #E9905F;outline-offset:2px}'
    + '@media (max-width:900px){#jfLogout{bottom:calc(84px + env(safe-area-inset-bottom,0px))}}';
  document.head.appendChild(css);
  const b = document.createElement('button');
  b.type = 'button'; b.id = 'jfLogout'; b.textContent = 'Log out · יציאה';
  const signedIn = () => { try { return !!sessionStorage.getItem('jf60k'); } catch(e){ return false; } };
  b.hidden = !signedIn();
  b.onclick = async () => {
    try { await fetch('/api/logout', { method:'POST' }); } catch(e){}
    try { Object.keys(sessionStorage).filter(k => k.startsWith('jf60')).forEach(k => sessionStorage.removeItem(k)); } catch(e){}
    location.href = '/';
  };
  document.body.appendChild(b);
  // the key is saved only after a successful sign-in, so show the button from then on
  setInterval(() => { b.hidden = !signedIn(); }, 1000);
})();
