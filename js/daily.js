/* ===== DAILY ASSIGNMENTS JS — EduNexus ===== */
/* Auto-generates subject assignments based on today's timetable.
   All assignments are open from school start until 11:59:59 PM.
   After midnight they become CLOSED (read-only, locked). */

// ============================================================
// TIMETABLE DATA  (indexed 0=Sun,1=Mon...6=Sat)
// ============================================================
const TIMETABLE = {
  1: [ // Monday
    { subject: 'Mathematics', teacher: 'Mr. Gupta',  color: '#6366f1', emoji: '📐' },
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
    { subject: 'Chemistry',   teacher: 'Mr. Rao',    color: '#8b5cf6', emoji: '🧪' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
    { subject: 'Biology',     teacher: 'Ms. Singh',  color: '#06b6d4', emoji: '🔬' },
  ],
  2: [ // Tuesday
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
    { subject: 'Mathematics', teacher: 'Mr. Gupta',  color: '#6366f1', emoji: '📐' },
    { subject: 'Chemistry',   teacher: 'Mr. Rao',    color: '#8b5cf6', emoji: '🧪' },
    { subject: 'Biology',     teacher: 'Ms. Singh',  color: '#06b6d4', emoji: '🔬' },
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
  ],
  3: [ // Wednesday
    { subject: 'Chemistry',   teacher: 'Mr. Rao',    color: '#8b5cf6', emoji: '🧪' },
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
    { subject: 'Biology',     teacher: 'Ms. Singh',  color: '#06b6d4', emoji: '🔬' },
    { subject: 'Mathematics', teacher: 'Mr. Gupta',  color: '#6366f1', emoji: '📐' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
  ],
  4: [ // Thursday
    { subject: 'Mathematics', teacher: 'Mr. Gupta',  color: '#6366f1', emoji: '📐' },
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
    { subject: 'Chemistry',   teacher: 'Mr. Rao',    color: '#8b5cf6', emoji: '🧪' },
    { subject: 'Biology',     teacher: 'Ms. Singh',  color: '#06b6d4', emoji: '🔬' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
  ],
  5: [ // Friday
    { subject: 'Biology',     teacher: 'Ms. Singh',  color: '#06b6d4', emoji: '🔬' },
    { subject: 'Mathematics', teacher: 'Mr. Gupta',  color: '#6366f1', emoji: '📐' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
    { subject: 'Chemistry',   teacher: 'Mr. Rao',    color: '#8b5cf6', emoji: '🧪' },
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
  ],
  6: [ // Saturday
    { subject: 'English',     teacher: 'Ms. Kapoor', color: '#f59e0b', emoji: '📖' },
    { subject: 'History',     teacher: 'Mrs. Mehta', color: '#ec4899', emoji: '📜' },
    { subject: 'Physics',     teacher: 'Mrs. Joshi', color: '#10b981', emoji: '⚗️' },
  ],
};

// ============================================================
// ASSIGNMENT BANK — questions per subject
// ============================================================
const ASSIGNMENT_BANK = {
  Mathematics: [
    { topic: 'Trigonometry', q: 'Solve: sin²θ + cos²θ = 1. Prove this identity and apply it to evaluate sin 30° + cos 60°.', marks: 5 },
    { topic: 'Algebra', q: 'If α and β are roots of x² − 5x + 6 = 0, find the value of α² + β².', marks: 4 },
    { topic: 'Geometry', q: 'In triangle ABC, if AB = 8 cm, BC = 6 cm, and ∠B = 90°, find AC and sin A.', marks: 5 },
    { topic: 'Statistics', q: 'Find the mean and median of the data set: 12, 18, 7, 25, 14, 9, 22, 11.', marks: 4 },
    { topic: 'Quadratics', q: 'Solve 2x² − 7x + 3 = 0 using the quadratic formula. Verify your answer.', marks: 5 },
    { topic: 'Coordinate Geometry', q: 'Find the distance between points A(3, 4) and B(−1, 1). Also find the midpoint.', marks: 4 },
    { topic: 'Polynomials', q: 'Check if x = 2 is a zero of p(x) = x³ − 6x² + 11x − 6. Factor the polynomial completely.', marks: 5 },
  ],
  Physics: [
    { topic: 'Optics', q: 'A convex lens has focal length 20 cm. Calculate the image distance when the object is placed 30 cm from the lens.', marks: 5 },
    { topic: 'Motion', q: 'A car accelerates from 0 to 72 km/h in 10 seconds. Find (i) acceleration, (ii) distance travelled.', marks: 5 },
    { topic: 'Waves', q: 'A sound wave has frequency 440 Hz and speed 340 m/s. Calculate the wavelength and time period.', marks: 4 },
    { topic: 'Electricity', q: 'Three resistors of 4Ω, 6Ω and 12Ω are connected in parallel. Find the equivalent resistance.', marks: 5 },
    { topic: 'Light', q: 'Explain the phenomenon of total internal reflection with a diagram. State the condition required.', marks: 4 },
    { topic: 'Newton\'s Laws', q: 'A 5 kg box is pushed with 30 N on a surface with friction coefficient 0.2. Find the acceleration.', marks: 5 },
    { topic: 'Energy', q: 'Calculate the kinetic energy and potential energy of a 2 kg object moving at 4 m/s at height 5 m.', marks: 4 },
  ],
  Chemistry: [
    { topic: 'Organic Chemistry', q: 'Write the structural formula of ethanol and explain its reaction with sodium metal.', marks: 4 },
    { topic: 'Periodic Table', q: 'Explain why atomic radius decreases across a period. Give examples with Group 2 elements.', marks: 5 },
    { topic: 'Chemical Bonding', q: 'Compare ionic bonding in NaCl and covalent bonding in H₂O. Draw electron dot structures.', marks: 5 },
    { topic: 'Acids & Bases', q: 'A solution has pH = 3. Is it acidic or basic? Find [H⁺] concentration. What happens when diluted?', marks: 4 },
    { topic: 'Reactions', q: 'Balance the equation: Fe + HCl → FeCl₂ + H₂. Identify the type of reaction.', marks: 4 },
    { topic: 'Metals', q: 'Explain the thermite reaction. Write the balanced equation and its industrial application.', marks: 5 },
    { topic: 'Carbon Compounds', q: 'Explain why carbon forms a large number of compounds. Give the homologous series of alkanes.', marks: 4 },
  ],
  English: [
    { topic: 'Essay Writing', q: 'Write a short paragraph (8–10 sentences) on "The Importance of Time Management for Students".', marks: 5 },
    { topic: 'Grammar', q: 'Rewrite in passive voice: (a) The teacher taught us a lesson. (b) She has completed the project.', marks: 4 },
    { topic: 'Comprehension', q: 'Read: "Education is the most powerful weapon you can use to change the world." — Mandela. Write a 5-line reflection.', marks: 4 },
    { topic: 'Literature', q: 'Describe the character of the protagonist in the story you studied this week. Include 3 key traits with evidence.', marks: 5 },
    { topic: 'Vocabulary', q: 'Use these words in sentences: Perseverance, Eloquent, Ambiguous, Substantial, Inevitable.', marks: 4 },
    { topic: 'Letter Writing', q: 'Write an informal letter to your friend describing your experience of the School Science Exhibition.', marks: 5 },
  ],
  History: [
    { topic: 'Modern India', q: 'Explain the role of Mahatma Gandhi in the Non-Cooperation Movement of 1920. What were its outcomes?', marks: 5 },
    { topic: 'World War II', q: 'Describe the key causes of World War II. How did it change the global political order?', marks: 5 },
    { topic: 'Ancient Civilizations', q: 'Compare the Indus Valley Civilization and Mesopotamean Civilization on 4 parameters.', marks: 4 },
    { topic: 'Industrial Revolution', q: 'Explain how the Industrial Revolution changed society and economy in 19th century Britain.', marks: 4 },
    { topic: 'Indian Independence', q: 'Describe the events leading to Indian Independence on August 15, 1947. Who were the key leaders?', marks: 5 },
  ],
  Biology: [
    { topic: 'Cell Biology', q: 'Explain the difference between plant cells and animal cells. Draw a labelled diagram of each.', marks: 5 },
    { topic: 'Photosynthesis', q: 'Write the balanced equation for photosynthesis. Explain where and when each stage occurs.', marks: 5 },
    { topic: 'Human Digestion', q: 'Trace the journey of food from mouth to rectum, naming each organ and its role.', marks: 5 },
    { topic: 'Genetics', q: 'Explain Mendel\'s Law of Segregation using a monohybrid cross. Draw a Punnett square for Tt × Tt.', marks: 4 },
    { topic: 'Ecosystems', q: 'Define food chain and food web. Draw a food web with at least 5 organisms from your local ecosystem.', marks: 4 },
    { topic: 'Reproduction', q: 'Explain asexual reproduction in amoeba and explain binary fission with a diagram.', marks: 4 },
  ],
};

// ============================================================
// STATE
// ============================================================
let submittedAssignments = JSON.parse(localStorage.getItem('dailySubmissions') || '{}');
let countdownInterval = null;

// ============================================================
// UTILITIES
// ============================================================
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((midnight - now) / 1000));
}

function isOpen() {
  return getSecondsUntilMidnight() > 0;
}

function formatCountdown(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function getDayName(day) {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day];
}

function getAssignmentForSubject(subject, dateKey) {
  const bank = ASSIGNMENT_BANK[subject] || [];
  if (!bank.length) return null;
  // Deterministic pick based on date so same question shows all day
  const seed = dateKey.split('-').reduce((a, b) => a + parseInt(b), 0) + subject.length;
  return bank[seed % bank.length];
}

function getSubmissionKey(subject) {
  return `${getTodayKey()}_${subject}`;
}

// ============================================================
// BUILD ASSIGNMENT CARDS
// ============================================================
function buildDailySection() {
  const now = new Date();
  const dayIdx = now.getDay();
  const todaySubjects = TIMETABLE[dayIdx] || [];
  const dateKey = getTodayKey();
  const dayName = getDayName(dayIdx);
  const todayStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const open = isOpen();

  // Update header date label
  const dateLabel = document.getElementById('dailyDateLabel');
  if (dateLabel) dateLabel.textContent = `${todayStr} · ${todaySubjects.length} subject${todaySubjects.length !== 1 ? 's' : ''} today`;

  // Status bar
  const statusBar = document.getElementById('dailyStatusBar');
  if (statusBar) {
    if (todaySubjects.length === 0) {
      statusBar.innerHTML = `<span style="font-size:1.2rem;">🏖️</span><div><strong style="color:#818cf8;">No School Today</strong><p style="font-size:0.78rem;color:var(--text-muted);margin:2px 0 0;">It's ${dayName}. Enjoy your day off! Assignments resume on Monday.</p></div>`;
      statusBar.style.background = 'rgba(99,102,241,0.08)';
      statusBar.style.border = '1px solid rgba(99,102,241,0.2)';
    } else if (open) {
      const secs = getSecondsUntilMidnight();
      const urgentColor = secs < 3600 ? '#f87171' : '#fbbf24';
      statusBar.innerHTML = `<span style="font-size:1.2rem;">🟢</span><div><strong style="color:${urgentColor};">Assignments Open</strong><p style="font-size:0.78rem;color:var(--text-muted);margin:2px 0 0;">All assignments close at 11:59 PM tonight. Submit before the deadline!</p></div>`;
      statusBar.style.background = secs < 3600 ? 'rgba(239,68,68,0.07)' : 'rgba(245,158,11,0.07)';
      statusBar.style.border = secs < 3600 ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(245,158,11,0.2)';
    } else {
      statusBar.innerHTML = `<span style="font-size:1.2rem;">🔒</span><div><strong style="color:#f87171;">Assignments Closed</strong><p style="font-size:0.78rem;color:var(--text-muted);margin:2px 0 0;">Today's deadline has passed. Assignments for tomorrow will open at school start.</p></div>`;
      statusBar.style.background = 'rgba(239,68,68,0.07)';
      statusBar.style.border = '1px solid rgba(239,68,68,0.2)';
    }
  }

  // Build cards
  const grid = document.getElementById('dailyAssignmentsGrid');
  if (!grid) return;

  if (todaySubjects.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
      <div style="font-size:3rem;margin-bottom:16px;">😴</div>
      <div style="font-size:1rem;font-weight:600;color:var(--text-secondary);">No assignments today</div>
      <div style="font-size:0.85rem;margin-top:6px;">It's ${dayName} — enjoy the break!</div>
    </div>`;
    return;
  }

  grid.innerHTML = todaySubjects.map((sub, i) => {
    const asgn = getAssignmentForSubject(sub.subject, dateKey);
    if (!asgn) return '';
    const key = getSubmissionKey(sub.subject);
    const submitted = submittedAssignments[key];
    const cardOpen = open && !submitted;

    return `
    <div class="daily-asgn-card" id="card_${i}" style="
      background:rgba(255,255,255,0.03);
      border:1px solid ${submitted ? 'rgba(16,185,129,0.35)' : open ? `${sub.color}33` : 'rgba(255,255,255,0.06)'};
      border-radius:18px;padding:24px;display:flex;flex-direction:column;gap:14px;
      position:relative;overflow:hidden;transition:all 0.3s ease;
    ">
      <!-- Top glow -->
      <div style="position:absolute;top:-40px;right:-40px;width:100px;height:100px;background:${sub.color};border-radius:50%;filter:blur(40px);opacity:${submitted ? 0.08 : open ? 0.12 : 0.04};pointer-events:none;"></div>

      <!-- Header row -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:46px;height:46px;border-radius:14px;background:${sub.color}22;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;">${sub.emoji}</div>
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:${sub.color};">${sub.subject}</div>
            <div style="font-size:0.73rem;color:var(--text-muted);">${sub.teacher} · ${asgn.marks} marks</div>
          </div>
        </div>
        <div>
          ${submitted
            ? `<span style="font-size:0.72rem;font-weight:700;background:rgba(16,185,129,0.15);color:#34d399;padding:5px 12px;border-radius:100px;white-space:nowrap;">✓ Submitted ${submitted.time}</span>`
            : open
              ? `<span style="font-size:0.72rem;font-weight:700;background:rgba(245,158,11,0.15);color:#fbbf24;padding:5px 12px;border-radius:100px;white-space:nowrap;">⏳ Open</span>`
              : `<span style="font-size:0.72rem;font-weight:700;background:rgba(239,68,68,0.12);color:#f87171;padding:5px 12px;border-radius:100px;white-space:nowrap;">🔒 Closed</span>`
          }
        </div>
      </div>

      <!-- Topic badge -->
      <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${sub.color};background:${sub.color}18;padding:4px 12px;border-radius:100px;width:fit-content;">
        📗 Topic: ${asgn.topic}
      </div>

      <!-- Question -->
      <div style="background:rgba(255,255,255,0.03);border-left:3px solid ${sub.color};padding:12px 16px;border-radius:0 10px 10px 0;">
        <div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;margin-bottom:6px;">QUESTION</div>
        <div style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${asgn.q}</div>
      </div>

      <!-- Answer box -->
      ${submitted
        ? `<div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:14px;">
            <div style="font-size:0.72rem;font-weight:700;color:#34d399;margin-bottom:6px;">YOUR ANSWER (Submitted)</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${submitted.answer}</div>
           </div>`
        : open
          ? `<div>
              <label style="font-size:0.72rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px;">YOUR ANSWER</label>
              <textarea id="ans_${i}" rows="4" placeholder="Write your answer here..." style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text-primary);border-radius:10px;padding:12px 14px;font-family:inherit;font-size:0.875rem;resize:vertical;box-sizing:border-box;transition:border-color 0.2s;" onfocus="this.style.borderColor='${sub.color}'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"></textarea>
             </div>
             <button onclick="submitAssignment(${i}, '${sub.subject}', this)" style="width:100%;padding:12px;border-radius:11px;border:none;background:linear-gradient(135deg,${sub.color},${sub.color}cc);color:white;font-family:inherit;font-size:0.875rem;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px ${sub.color}44'" onmouseout="this.style.transform='';this.style.boxShadow=''">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
               Submit Assignment
             </button>`
          : `<div style="text-align:center;padding:14px;background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.15);border-radius:12px;">
              <div style="font-size:0.85rem;color:#f87171;font-weight:600;">🔒 Submission Closed</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Deadline passed at 11:59 PM</div>
             </div>`
      }
    </div>`;
  }).join('');
}

// ============================================================
// BUILD DASHBOARD WIDGET
// ============================================================
function buildDashWidget() {
  const now = new Date();
  const dayIdx = now.getDay();
  const todaySubjects = TIMETABLE[dayIdx] || [];
  const dateKey = getTodayKey();
  const open = isOpen();

  const list = document.getElementById('dashDailyList');
  if (!list) return;

  if (todaySubjects.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:0.85rem;">😴 No school today — enjoy your day!</div>`;
    return;
  }

  const MAX_SHOW = 3;
  list.innerHTML = todaySubjects.slice(0, MAX_SHOW).map((sub, i) => {
    const asgn = getAssignmentForSubject(sub.subject, dateKey);
    const key = getSubmissionKey(sub.subject);
    const submitted = submittedAssignments[key];

    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid ${submitted ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'};">
      <div style="width:34px;height:34px;border-radius:10px;background:${sub.color}20;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">${sub.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:0.83rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${sub.subject} — ${asgn ? asgn.topic : ''}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);">${asgn ? asgn.marks + ' marks' : ''} · Due tonight 11:59 PM</div>
      </div>
      <div>${submitted
        ? `<span style="font-size:0.68rem;font-weight:700;background:rgba(16,185,129,0.15);color:#34d399;padding:3px 8px;border-radius:100px;">✓ Done</span>`
        : open
          ? `<span style="font-size:0.68rem;font-weight:700;background:rgba(245,158,11,0.15);color:#fbbf24;padding:3px 8px;border-radius:100px;">Open</span>`
          : `<span style="font-size:0.68rem;font-weight:700;background:rgba(239,68,68,0.1);color:#f87171;padding:3px 8px;border-radius:100px;">Closed</span>`
      }</div>
    </div>`;
  }).join('');

  if (todaySubjects.length > MAX_SHOW) {
    list.innerHTML += `<div style="text-align:center;padding:8px;font-size:0.75rem;color:var(--text-muted);">+${todaySubjects.length - MAX_SHOW} more subjects · <span style="color:#818cf8;cursor:pointer;" onclick="showSection('daily')">View all →</span></div>`;
  }
}

// ============================================================
// SUBMIT ASSIGNMENT
// ============================================================
function submitAssignment(cardIndex, subject, btn) {
  if (!isOpen()) return;

  const textarea = document.getElementById(`ans_${cardIndex}`);
  const answer = textarea ? textarea.value.trim() : '';

  if (!answer || answer.length < 10) {
    textarea.style.borderColor = '#f87171';
    textarea.placeholder = '⚠ Please write at least a few sentences as your answer!';
    setTimeout(() => { textarea.style.borderColor = ''; textarea.placeholder = 'Write your answer here...'; }, 2000);
    return;
  }

  // Show confirmation modal
  const modal = document.getElementById('submitModal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:6px;">Confirm Submission 📤</h3>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px;">Are you sure you want to submit your <strong style="color:var(--text-primary);">${subject}</strong> assignment? You cannot edit it after submission.</p>
    <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px 14px;margin-bottom:20px;max-height:120px;overflow-y:auto;">
      <div style="font-size:0.72rem;font-weight:600;color:var(--text-muted);margin-bottom:6px;">YOUR ANSWER PREVIEW</div>
      <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">${answer}</div>
    </div>
    <div style="display:flex;gap:12px;">
      <button onclick="closeModal()" style="flex:1;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--text-secondary);font-family:inherit;font-size:0.875rem;cursor:pointer;">Cancel</button>
      <button onclick="confirmSubmit(${cardIndex}, '${subject}')" style="flex:1;padding:12px;border-radius:10px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-family:inherit;font-size:0.875rem;font-weight:700;cursor:pointer;">✓ Submit Now</button>
    </div>
  `;
  modal.style.display = 'flex';
}

function confirmSubmit(cardIndex, subject) {
  const textarea = document.getElementById(`ans_${cardIndex}`);
  const answer = textarea ? textarea.value.trim() : '';

  // Save to local storage
  const key = getSubmissionKey(subject);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  submittedAssignments[key] = { answer, time: timeStr, subject };
  localStorage.setItem('dailySubmissions', JSON.stringify(submittedAssignments));

  closeModal();
  buildDailySection();
  buildDashWidget();

  // Show toast
  if (typeof showToast === 'function') {
    showToast(`${subject} assignment submitted at ${timeStr}! ✓`, 'success');
  }
}

function closeModal() {
  const modal = document.getElementById('submitModal');
  if (modal) modal.style.display = 'none';
}

// Close modal on background click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('submitModal');
  if (modal && e.target === modal) closeModal();
});

// ============================================================
// COUNTDOWN TIMERS
// ============================================================
function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  function tick() {
    const secs = getSecondsUntilMidnight();
    const formatted = formatCountdown(secs);

    // Main countdown (Daily Assignments page)
    const main = document.getElementById('mainCountdown');
    if (main) {
      main.textContent = formatted;
      // Turn red when < 1 hour
      if (secs < 3600) {
        main.style.color = '#f87171';
        const box = document.getElementById('mainCountdownBox');
        if (box) { box.style.background = 'rgba(239,68,68,0.12)'; box.style.borderColor = 'rgba(239,68,68,0.35)'; }
      } else if (secs < 10800) {
        main.style.color = '#fb923c'; // orange when < 3 hours
      }
    }

    // Dashboard mini countdown
    const dash = document.getElementById('dashCountdown');
    if (dash) {
      if (secs === 0) {
        dash.textContent = '🔒 Closed';
        dash.style.color = '#f87171';
        dash.style.background = 'rgba(239,68,68,0.1)';
      } else {
        dash.textContent = `⏳ ${formatted}`;
        dash.style.color = secs < 3600 ? '#f87171' : '#f59e0b';
      }
    }

    // At midnight — refresh to show locked state
    if (secs === 0) {
      clearInterval(countdownInterval);
      setTimeout(() => { buildDailySection(); buildDashWidget(); }, 1200);
    }
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

// ============================================================
// PAGE TITLE REGISTRATION (called from student.js showSection)
// ============================================================
// Also update student.js pageTitles externally
window.dailyPageTitles = {
  daily: ['Daily Assignments', 'Submit today\'s assignments before 11:59 PM'],
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildDailySection();
  buildDashWidget();
  startCountdown();

  // Refresh builds every minute to keep status accurate
  setInterval(() => {
    buildDailySection();
    buildDashWidget();
  }, 60000);
});
