/* ===== MAIN JS — EduNexus ===== */

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// Role selection on landing page
function selectRole(role) {
  const pages = { student: 'student.html', teacher: 'teacher.html', parent: 'parent.html' };
  if (pages[role]) window.location.href = pages[role];
}

// Sidebar toggle (mobile)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// Close sidebar on overlay click (mobile)
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  if (sidebar && window.innerWidth < 900) {
    if (!sidebar.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

// Add sidebar overlay for mobile
function initMobileOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'sidebarOverlay';
  overlay.style.cssText = `
    display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);
    z-index:99;backdrop-filter:blur(4px);
  `;
  overlay.onclick = () => {
    document.getElementById('sidebar')?.classList.remove('open');
    overlay.style.display = 'none';
  };
  document.body.appendChild(overlay);

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const observer = new MutationObserver(() => {
      overlay.style.display = sidebar.classList.contains('open') && window.innerWidth < 900 ? 'block' : 'none';
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }
}

// Animate progress bars on load
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  bars.forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 300);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const nav = document.getElementById('mainNav');
      const navHeight = nav ? nav.offsetHeight : 80;
      const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Library filter
function filterLib(subject, btn) {
  const cards = document.querySelectorAll('#library-grid .resource-card');
  cards.forEach(c => {
    if (subject === 'all' || c.dataset.subject === subject) {
      c.style.display = '';
      c.style.animation = 'fadeUp 0.3s ease forwards';
    } else {
      c.style.display = 'none';
    }
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// Toast notification
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  const colors = { success: '#10b981', error: '#ef4444', info: '#6366f1', warning: '#f59e0b' };
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:rgba(15,15,25,0.95);border:1px solid ${colors[type]}44;
    color:#f1f5f9;border-radius:12px;padding:14px 20px;
    font-size:0.875rem;font-weight:500;font-family:inherit;
    display:flex;align-items:center;gap:10px;
    box-shadow:0 8px 32px rgba(0,0,0,0.4);
    animation:slideInToast 0.3s ease;max-width:340px;
  `;
  toast.innerHTML = `<span style="color:${colors[type]};font-size:1.1rem;">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>${msg}`;
  document.body.appendChild(toast);
  const style = document.createElement('style');
  style.textContent = `@keyframes slideInToast{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(8px)'; toast.style.transition = '0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileOverlay();
  setTimeout(animateProgressBars, 600);

  // Button click toasts (for form submissions)
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Post') || btn.textContent.includes('Save') || btn.textContent.includes('Upload') || btn.textContent.includes('Send') || btn.textContent.includes('Pay')) {
      btn.addEventListener('click', () => {
        if (btn.textContent.includes('Pay')) return;
        showToast(btn.textContent.trim() + ' — successful!', 'success');
      });
    }
  });
});
