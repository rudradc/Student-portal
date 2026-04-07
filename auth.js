/* ===== AUTH.JS — EduNexus Session Guard ===== */

(function(){
  const ROLE_PAGE  = { student:'student.html', teacher:'teacher.html', parent:'parent.html' };
  const PAGE_ROLE  = {
    'student.html': 'student',
    'teacher.html': 'teacher',
    'parent.html':  'parent',
  };

  // Get current page filename
  const pageName = window.location.pathname.split('/').pop();
  const requiredRole = PAGE_ROLE[pageName];

  // Read session
  function getSession(){
    try { return JSON.parse(sessionStorage.getItem('eduSession')); } catch(e){ return null; }
  }

  const session = getSession();

  if(requiredRole){
    if(!session){
      // Not logged in → redirect to login with role hint
      window.location.href = `login.html?role=${requiredRole}`;
      return;
    }
    if(session.role !== requiredRole){
      // Wrong role → redirect to correct portal
      window.location.href = ROLE_PAGE[session.role] || 'login.html';
      return;
    }
  }

  // ── Inject user info into portal UI ──────────────────────
  document.addEventListener('DOMContentLoaded', ()=>{
    if(!session) return;

    // Update user name in sidebar
    const nameEl = document.querySelector('.user-name');
    if(nameEl) nameEl.textContent = session.name || 'User';

    const roleEl = document.querySelector('.user-role');
    if(roleEl){
      if(session.role==='student') roleEl.textContent = (session.class||'Class X-A') + ' · Student';
      if(session.role==='teacher') roleEl.textContent = 'Mathematics Teacher';
      if(session.role==='parent')  roleEl.textContent = 'Parent · 2 children';
    }

    // Update avatar initials
    const initials = (session.name||'U').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    document.querySelectorAll('.user-avatar').forEach(el=>{ el.textContent = initials; });

    // Inject logout button in sidebar footer
    const footer = document.querySelector('.sidebar-footer');
    if(footer){
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'sidebar-item';
      logoutBtn.innerHTML = `
        <div class="s-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>
        Logout`;
      logoutBtn.style.color = '#f87171';
      logoutBtn.onclick = logout;
      footer.insertBefore(logoutBtn, footer.firstChild);
    }

    // Add session info tooltip to header avatar
    const headerAv = document.querySelector('.portal-header-right .user-avatar');
    if(headerAv){
      headerAv.title = `${session.name} · ${session.role}`;
      headerAv.onclick = ()=> {
        if(typeof showToast === 'function') showToast(`Signed in as ${session.name} (${session.role})`, 'info');
      };
    }
  });

  // ── Parent: check if they can switch to student ──
  window.getSession = getSession;

  // ── Logout ───────────────────────────────────────
  window.logout = function(){
    sessionStorage.removeItem('eduSession');
    window.location.href = 'login.html';
  };

  // ── Expose session globally ───────────────────────
  window.eduSession = session;

})();
