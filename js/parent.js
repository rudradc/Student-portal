/* ===== PARENT PORTAL JS ===== */

let currentView = 'parent'; // 'parent' or 'student'

const parentPageTitles = {
  dashboard:     ['Dashboard',          "Parent Portal — Monitoring your child's progress"],
  progress:      ['Academic Progress',  "Detailed report for Rahul Sharma — X-A"],
  attendance:    ['Attendance Report',  "Attendance record for 2025-26 session"],
  fees:          ['Fee Management',     "Track and manage fee payments"],
  events:        ['Events & Calendar',  "Upcoming school events and important dates"],
  messages:      ['Message Teacher',    "Direct communication with teachers"],
  announcements: ['Announcements',      "All school notices and updates"],
};

function showSection(id) {
  if (currentView !== 'parent') return;
  document.querySelectorAll('#parentSections .page-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById('section-' + id);
  if (target) { target.style.display = 'block'; target.style.animation = 'fadeUp 0.35s ease forwards'; }

  // Update sidebar active
  document.querySelectorAll('#parentNav .sidebar-item').forEach(i => i.classList.remove('active'));
  const btn = document.getElementById('nav-' + id);
  if (btn) btn.classList.add('active');

  if (parentPageTitles[id]) {
    document.getElementById('currentPageTitle').textContent = parentPageTitles[id][0];
    document.getElementById('currentPageSub').textContent = parentPageTitles[id][1];
  }

  if (window.innerWidth < 900) document.getElementById('sidebar')?.classList.remove('open');
}

function switchView(view) {
  currentView = view;

  const parentSections = document.getElementById('parentSections');
  const studentArea = document.getElementById('studentViewArea');
  const parentNav = document.getElementById('parentNav');
  const studentNav = document.getElementById('studentNav');
  const body = document.getElementById('parentBody');
  const vsParent = document.getElementById('vsParent');
  const vsStudent = document.getElementById('vsStudent');
  const titleEl = document.getElementById('currentPageTitle');
  const subEl = document.getElementById('currentPageSub');

  if (view === 'student') {
    // Switch to student view
    parentSections.style.display = 'none';
    studentArea.style.display = 'block';
    studentArea.style.animation = 'fadeUp 0.35s ease forwards';
    parentNav.style.display = 'none';
    studentNav.style.display = 'block';
    body.classList.remove('portal-parent');
    body.classList.add('portal-student');
    vsParent.classList.remove('active');
    vsStudent.classList.add('active');
    titleEl.textContent = "Student Dashboard";
    subEl.textContent = "Viewing as Rahul Sharma — Class X-A";
    showStudentSection('sdash');
  } else {
    // Switch back to parent view
    parentSections.style.display = 'block';
    studentArea.style.display = 'none';
    parentNav.style.display = 'block';
    studentNav.style.display = 'none';
    body.classList.remove('portal-student');
    body.classList.add('portal-parent');
    vsStudent.classList.remove('active');
    vsParent.classList.add('active');
    showSection('dashboard');
  }
}

function showStudentSection(id) {
  document.querySelectorAll('#studentViewArea .page-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById('section-' + id);
  if (target) { target.style.display = 'block'; target.style.animation = 'fadeUp 0.35s ease forwards'; }

  document.querySelectorAll('#studentNav .sidebar-item').forEach(i => i.classList.remove('active'));
  const map = { sdash: 0, sgrades: 1, sttable: 2, sassign: 3 };
  const items = document.querySelectorAll('#studentNav .sidebar-item');
  if (map[id] !== undefined && items[map[id]]) items[map[id]].classList.add('active');
}

function selectChild(chip, name) {
  document.querySelectorAll('.student-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');

  const data = {
    Rahul: { grade: '86%', attendance: '92%', pending: '3', rank: '12th', class: 'Class X-A', color: '#818cf8' },
    Divya: { grade: '91%', attendance: '96%', pending: '1', rank: '5th',  class: 'Class VII-B', color: '#34d399' },
  };

  const d = data[name];
  if (!d) return;

  const vals = document.querySelectorAll('#childInfo .stat-card-value');
  if (vals[0]) vals[0].textContent = d.grade;
  if (vals[1]) vals[1].textContent = d.attendance;
  if (vals[2]) vals[2].textContent = d.pending;
  if (vals[3]) vals[3].textContent = d.rank;

  const subs = document.querySelectorAll('#childInfo .stat-card-sub');
  if (subs[1]) subs[1].textContent = name === 'Rahul' ? '47 / 51 days' : '52 / 54 days';
  if (subs[3]) subs[3].textContent = name === 'Rahul' ? 'Out of 45 students' : 'Out of 38 students';

  // Re-animate progress bars
  setTimeout(() => {
    document.querySelectorAll('#childInfo .progress-bar-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  }, 50);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  showSection('dashboard');
});
