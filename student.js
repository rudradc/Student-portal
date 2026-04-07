/* ===== STUDENT PORTAL JS ===== */

const pageTitles = {
  dashboard:     ['Dashboard',          'Welcome back, Rahul 👋'],
  grades:        ['Grades & Results',    'Term 2 — Academic Performance Report'],
  timetable:     ['Timetable',           'Your weekly class schedule — Class X-A'],
  assignments:   ['Assignments',         'Track your pending and completed tasks'],
  daily:         ['Daily Assignments',   'Submit today\'s assignments before 11:59 PM ⏳'],
  quiz:          ['MCQ Quiz',            'Test your knowledge — timed multiple choice questions 🧠'],
  contest:       ['Weekly Contest',      'Every Saturday 7 PM — compete with your classmates 🏆'],
  attendance:    ['Attendance',          'Your attendance record for 2025-26'],
  syllabus:      ['CBSE Syllabus',       'Official curriculum and marking schemes'],
  library:       ['Study Library',       'Course notes, videos and resources'],
  announcements: ['Announcements',       'Latest notices from school'],
};

function showSection(id) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => {
    s.style.display = 'none';
    s.style.opacity = '0';
  });

  // Show target
  const target = document.getElementById('section-' + id);
  if (target) {
    target.style.display = 'block';
    setTimeout(() => { target.style.opacity = '1'; target.style.transition = 'opacity 0.3s ease'; }, 10);
  }

  // Update sidebar active
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  const navBtn = document.getElementById('nav-' + id);
  if (navBtn) navBtn.classList.add('active');

  // Update header
  if (pageTitles[id]) {
    document.getElementById('currentPageTitle').textContent = pageTitles[id][0];
    document.getElementById('currentPageSub').textContent = pageTitles[id][1];
  }

  // Re-animate progress bars on grade/dashboard sections
  if (id === 'grades' || id === 'dashboard') {
    setTimeout(() => {
      document.querySelectorAll('#section-' + id + ' .progress-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-target') || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = target; }, 100);
      });
    }, 100);
  }

  // Close mobile sidebar
  if (window.innerWidth < 900) {
    document.getElementById('sidebar')?.classList.remove('open');
  }

  // Trigger dynamic builders
  if (id === 'quiz'    && typeof window.onShowQuiz    === 'function') window.onShowQuiz();
  if (id === 'contest' && typeof window.onShowContest === 'function') window.onShowContest();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Show dashboard by default
  showSection('dashboard');

  // Add ripple to sidebar items
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('mousedown', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `position:absolute;width:4px;height:4px;background:rgba(255,255,255,0.3);border-radius:50%;pointer-events:none;transform:scale(0);animation:rippleAnim 0.5s ease;left:${e.offsetX}px;top:${e.offsetY}px;`;
      this.style.position = 'relative';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes rippleAnim{to{transform:scale(30);opacity:0}}`;
  document.head.appendChild(style);
});
