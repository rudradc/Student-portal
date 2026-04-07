/* ===== QUIZ.JS — MCQ Quiz + Weekly Contest ===== */
/* MCQ Quiz: subject picker → 10 Qs, 30 s/Q, live timer, score
   Weekly Contest: Saturday 7 PM–7:30 PM, 20 Qs, 30 min total,
                   score = correct×10 + time-bonus, leaderboard  */

// =========================================================
// MCQ QUESTION BANK  (6 subjects × 10 questions each)
// =========================================================
const MCQ_BANK = {
  Mathematics: [
    { q:'What is sin 90°?', opts:['0','1','√2/2','∞'], ans:1 },
    { q:'The sum of angles in a triangle is:', opts:['90°','180°','270°','360°'], ans:1 },
    { q:'√144 = ?', opts:['11','12','13','14'], ans:1 },
    { q:'What is the value of π (approx)?', opts:['3.14','2.71','1.61','4.12'], ans:0 },
    { q:'Which is a prime number?', opts:['9','15','17','21'], ans:2 },
    { q:'LCM of 4 and 6 is:', opts:['8','10','12','24'], ans:2 },
    { q:'Solve: 2x + 3 = 11. x = ?', opts:['3','4','5','6'], ans:1 },
    { q:'Area of a circle with r = 7 (π ≈ 22/7):', opts:['44','88','154','308'], ans:2 },
    { q:'(-3)² = ?', opts:['-9','9','-6','6'], ans:1 },
    { q:'The slope of a horizontal line is:', opts:['1','-1','∞','0'], ans:3 },
  ],
  Physics: [
    { q:'Unit of force is:', opts:['Joule','Watt','Newton','Pascal'], ans:2 },
    { q:'Speed of light in vacuum (approx):', opts:['3×10⁶ m/s','3×10⁸ m/s','3×10¹⁰ m/s','3×10⁴ m/s'], ans:1 },
    { q:'Which type of lens converges light?', opts:['Concave','Convex','Plano','Diverging'], ans:1 },
    { q:'SI unit of electric current is:', opts:['Volt','Ohm','Ampere','Watt'], ans:2 },
    { q:'A body in uniform motion has acceleration of:', opts:['1','Zero','Constant','Variable'], ans:1 },
    { q:'Which force holds planets in orbit?', opts:['Magnetic','Nuclear','Gravitational','Friction'], ans:2 },
    { q:'Energy stored in a stretched spring is:', opts:['Kinetic','Chemical','Potential','Thermal'], ans:2 },
    { q:'Ohm\'s law: V = ?', opts:['IR','I/R','R/I','I²R'], ans:0 },
    { q:'Sound cannot travel through:', opts:['Water','Air','Wood','Vacuum'], ans:3 },
    { q:'The image formed by a plane mirror is:', opts:['Real, inverted','Virtual, erect','Real, erect','Virtual, inverted'], ans:1 },
  ],
  Chemistry: [
    { q:'Chemical symbol for Gold is:', opts:['Go','Gd','Au','Ag'], ans:2 },
    { q:'pH of pure water at 25°C:', opts:['0','7','14','1'], ans:1 },
    { q:'Which gas is produced when metals react with acid?', opts:['Oxygen','CO₂','Hydrogen','Nitrogen'], ans:2 },
    { q:'Valency of Carbon is:', opts:['2','3','4','6'], ans:2 },
    { q:'The atomic number of Oxygen is:', opts:['6','7','8','9'], ans:2 },
    { q:'NaCl is an example of:', opts:['Covalent bond','Ionic bond','Metallic bond','Hydrogen bond'], ans:1 },
    { q:'Which is NOT a noble gas?', opts:['Helium','Neon','Argon','Nitrogen'], ans:3 },
    { q:'Rusting of iron is a:', opts:['Physical change','Chemical change','Nuclear change','No change'], ans:1 },
    { q:'Formula of water is:', opts:['HO','H₂O','H₂O₂','HO₂'], ans:1 },
    { q:'Burning of candle is a -- reaction:', opts:['Endothermic','Exothermic','Neutral','Physical'], ans:1 },
  ],
  English: [
    { q:'Identify the noun: "Bravery is a virtue."', opts:['Bravery','is','a','virtue'], ans:0 },
    { q:'Opposite of "Ancient" is:', opts:['Old','Modern','Big','Fast'], ans:1 },
    { q:'Which is a conjunction?', opts:['And','Happy','Quickly','Blue'], ans:0 },
    { q:'"She sings beautifully." — beautifully is a:', opts:['Noun','Verb','Adjective','Adverb'], ans:3 },
    { q:'Passive voice of "She reads a book":', opts:['A book was read','A book is read by her','A book read her','None'], ans:1 },
    { q:'Synonym of "Enormous":', opts:['Tiny','Huge','Round','Slow'], ans:1 },
    { q:'Which is a proper noun?', opts:['City','River','Delhi','Mountain'], ans:2 },
    { q:'Plural of "Child" is:', opts:['Childs','Children','Childen','Childer'], ans:1 },
    { q:'"I go to school." — Tense is:', opts:['Past','Present','Future','Perfect'], ans:1 },
    { q:'Which sentence is correct?', opts:['He don\'t know','He doesn\'t knows','He doesn\'t know','He not knows'], ans:2 },
  ],
  History: [
    { q:'India gained independence in:', opts:['1945','1946','1947','1948'], ans:2 },
    { q:'Who wrote "Discovery of India"?', opts:['Gandhi','Nehru','Patel','Bose'], ans:1 },
    { q:'The Battle of Plassey was fought in:', opts:['1757','1857','1947','1756'], ans:0 },
    { q:'First President of India was:', opts:['Nehru','Gandhi','Patel','Rajendra Prasad'], ans:3 },
    { q:'World War II ended in:', opts:['1943','1944','1945','1946'], ans:2 },
    { q:'The French Revolution began in:', opts:['1776','1789','1799','1804'], ans:1 },
    { q:'The United Nations was founded in:', opts:['1944','1945','1946','1947'], ans:1 },
    { q:'Who was known as the "Iron Man of India"?', opts:['Gandhi','Nehru','Patel','Bose'], ans:2 },
    { q:'The Magna Carta was signed in:', opts:['1215','1315','1415','1515'], ans:0 },
    { q:'Which civilization built the Great Wall?', opts:['Egyptian','Roman','Chinese','Greek'], ans:2 },
  ],
  Biology: [
    { q:'The powerhouse of the cell is:', opts:['Nucleus','Ribosome','Mitochondria','Chloroplast'], ans:2 },
    { q:'Photosynthesis occurs in:', opts:['Roots','Stem','Chloroplast','Mitochondria'], ans:2 },
    { q:'DNA stands for:', opts:['Deoxyribonucleic Acid','Diribonucleic Acid','Deoxyribose Acid','Diaribose Acid'], ans:0 },
    { q:'Which blood group is universal donor?', opts:['A','B','AB','O'], ans:3 },
    { q:'The largest organ of the human body is:', opts:['Liver','Brain','Heart','Skin'], ans:3 },
    { q:'Malaria is caused by:', opts:['Bacteria','Virus','Protozoan','Fungus'], ans:2 },
    { q:'Plant cells have -- that animal cells lack:', opts:['Nucleus','Cell wall','Mitochondria','Ribosome'], ans:1 },
    { q:'Insulin is produced by:', opts:['Liver','Kidney','Pancreas','Heart'], ans:2 },
    { q:'The basic unit of life is:', opts:['Organ','Tissue','Cell','Atom'], ans:2 },
    { q:'Pollination is done by:', opts:['Roots','Leaves','Pollen','Seeds'], ans:2 },
  ],
};

// =========================================================
// CLASS LEADERBOARD — mock classmates + dynamic current user
// =========================================================
const BASE_LEADERBOARD = [
  { name:'Priya Mehta',   avatar:'PM', score:198, time:1420, rank:1 },
  { name:'Aarav Patel',   avatar:'AP', score:185, time:1560, rank:2 },
  { name:'Ananya Joshi',  avatar:'AJ', score:174, time:1245, rank:3 },
  { name:'Vikram Singh',  avatar:'VS', score:162, time:1689, rank:4 },
  { name:'Sneha Rao',     avatar:'SR', score:150, time:1800, rank:5 },
  { name:'Dev Kumar',     avatar:'DK', score:138, time:1750, rank:6 },
  { name:'Riya Shah',     avatar:'RS', score:121, time:1780, rank:7 },
];

// =========================================================
// STATE
// =========================================================
let quizState = null;
let contestState = null;
let contestTimerInterval = null;
let quizTimerInterval = null;
let questionTimerInterval = null;

// =========================================================
// UTILS
// =========================================================
function pad2(n){ return String(n).padStart(2,'0'); }
function fmtTime(secs){ return `${pad2(Math.floor(secs/3600))}:${pad2(Math.floor((secs%3600)/60))}:${pad2(secs%60)}`; }
function fmtMins(secs){ return `${pad2(Math.floor(secs/60))}:${pad2(secs%60)}`; }

// Next Saturday 7 PM
function getNextSaturday7PM(){
  const now = new Date();
  const day = now.getDay(); // 0=Sun...6=Sat
  let daysUntilSat = (6 - day + 7) % 7;
  if(daysUntilSat === 0){
    const contestStart = new Date(now); contestStart.setHours(19,0,0,0);
    // If Saturday but before 7 PM → today; if past 7:30 PM → next Saturday
    if(now < contestStart) daysUntilSat = 0;
    else daysUntilSat = 7;
  }
  const sat = new Date(now);
  sat.setDate(now.getDate() + daysUntilSat);
  sat.setHours(19,0,0,0);
  return sat;
}

function isContestLive(){
  const now = new Date();
  if(now.getDay() !== 6) return false;
  const h = now.getHours(), m = now.getMinutes();
  return (h === 19) || (h === 19 && m < 30) || (h === 19 && m >= 0);
  // 7:00 PM to 7:29:59 PM
}

function contestEnded(){
  const now = new Date();
  if(now.getDay() !== 6) return false;
  const h = now.getHours(), m = now.getMinutes();
  return h > 19 || (h === 19 && m >= 30);
}

// =========================================================
// ==================  MCQ QUIZ  ==========================
// =========================================================
function buildQuizHub(){
  const c = document.getElementById('quizContainer');
  if(!c) return;

  const subjects = Object.keys(MCQ_BANK);
  const colors = { Mathematics:'#6366f1', Physics:'#10b981', Chemistry:'#8b5cf6', English:'#f59e0b', History:'#ec4899', Biology:'#06b6d4' };
  const emojis = { Mathematics:'📐', Physics:'⚗️', Chemistry:'🧪', English:'📖', History:'📜', Biology:'🔬' };

  // Show past scores
  const scores = JSON.parse(localStorage.getItem('quizScores')||'{}');

  c.innerHTML = `
    <div style="margin-bottom:24px;">
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:14px;">
        <div style="font-size:1.5rem;">📋</div>
        <div>
          <div style="font-weight:700;font-size:0.9rem;">How it works</div>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">Pick a subject → Answer 10 MCQ questions → Each question has a <strong style="color:#a78bfa;">30-second timer</strong> → Score shown at the end.</div>
        </div>
      </div>
    </div>
    <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:16px;">Choose a Subject</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">
      ${subjects.map(sub => {
        const best = scores[sub];
        return `
        <div onclick="startQuiz('${sub}')" style="
          background:rgba(255,255,255,0.03);
          border:1px solid ${colors[sub]}33;
          border-radius:16px;padding:24px;cursor:pointer;
          transition:all 0.3s ease;position:relative;overflow:hidden;
        " onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 12px 40px ${colors[sub]}30';this.style.borderColor='${colors[sub]}88'"
          onmouseout="this.style.transform='';this.style.boxShadow='';this.style.borderColor='${colors[sub]}33'">
          <div style="position:absolute;top:-30px;right:-30px;width:90px;height:90px;background:${colors[sub]};border-radius:50%;filter:blur(35px);opacity:0.1;"></div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
            <div style="width:48px;height:48px;border-radius:14px;background:${colors[sub]}20;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">${emojis[sub]}</div>
            <div>
              <div style="font-weight:700;font-size:1rem;color:${colors[sub]};">${sub}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">10 questions · 30s each</div>
            </div>
          </div>
          ${best !== undefined
            ? `<div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font-size:0.75rem;color:var(--text-muted);">Best Score</span>
                <span style="font-size:0.9rem;font-weight:800;color:${best>=8?'#34d399':best>=5?'#fbbf24':'#f87171'}">${best}/10</span>
               </div>
               <div style="height:5px;background:rgba(255,255,255,0.06);border-radius:100px;margin-top:8px;overflow:hidden;">
                 <div style="height:100%;width:${best*10}%;background:${colors[sub]};border-radius:100px;"></div>
               </div>`
            : `<div style="font-size:0.75rem;color:var(--text-muted);">Not attempted yet</div>`
          }
          <div style="margin-top:14px;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:10px;background:${colors[sub]}18;color:${colors[sub]};font-size:0.82rem;font-weight:600;">
            Start Quiz →
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function startQuiz(subject){
  const questions = [...MCQ_BANK[subject]].sort(()=>Math.random()-0.5);
  quizState = { subject, questions, current:0, score:0, answers:[], startTime:Date.now() };
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const c = document.getElementById('quizContainer');
  if(!c || !quizState) return;

  const { subject, questions, current, score } = quizState;
  const q = questions[current];
  const total = questions.length;
  const colors = { Mathematics:'#6366f1', Physics:'#10b981', Chemistry:'#8b5cf6', English:'#f59e0b', History:'#ec4899', Biology:'#06b6d4' };
  const col = colors[subject] || '#6366f1';

  let timeLeft = 30;
  if(questionTimerInterval) clearInterval(questionTimerInterval);

  c.innerHTML = `
    <div style="max-width:680px;margin:0 auto;">

      <!-- Progress & Timer bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:16px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-muted);margin-bottom:6px;">
            <span>Question ${current+1} of ${total}</span>
            <span style="color:${col};font-weight:600;">${subject}</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:100px;overflow:hidden;">
            <div id="progressBar" style="height:100%;width:${((current)/total)*100}%;background:${col};border-radius:100px;transition:width 0.4s;"></div>
          </div>
        </div>
        <div id="qTimer" style="
          background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);
          border-radius:12px;padding:10px 20px;text-align:center;min-width:80px;
        ">
          <div style="font-size:1.4rem;font-weight:900;font-family:'Plus Jakarta Sans',sans-serif;color:#fbbf24;" id="qTimerNum">30</div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);">seconds</div>
        </div>
      </div>

      <!-- Score tracker -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
        ${Array.from({length:total},(_,i)=>{
          const a = quizState.answers[i];
          if(i<current) return `<div style="width:24px;height:24px;border-radius:6px;background:${a===questions[i].ans?'rgba(16,185,129,0.5)':'rgba(239,68,68,0.4)'};display:flex;align-items:center;justify-content:center;font-size:0.7rem;">${a===questions[i].ans?'✓':'✕'}</div>`;
          if(i===current) return `<div style="width:24px;height:24px;border-radius:6px;background:${col};display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">${i+1}</div>`;
          return `<div style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.06);"></div>`;
        }).join('')}
      </div>

      <!-- Question card -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid ${col}33;border-radius:18px;padding:28px 28px;margin-bottom:20px;">
        <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${col};margin-bottom:12px;">Question ${current+1}</div>
        <div style="font-size:1.05rem;font-weight:600;line-height:1.6;color:var(--text-primary);">${q.q}</div>
      </div>

      <!-- Options -->
      <div style="display:flex;flex-direction:column;gap:10px;" id="optionsGrid">
        ${q.opts.map((opt,i)=>`
          <button onclick="selectAnswer(${i})" id="opt${i}" style="
            width:100%;padding:14px 20px;border-radius:12px;
            border:1px solid rgba(255,255,255,0.1);
            background:rgba(255,255,255,0.03);
            color:var(--text-secondary);font-family:inherit;font-size:0.9rem;
            text-align:left;cursor:pointer;display:flex;align-items:center;gap:14px;
            transition:all 0.2s;
          " onmouseover="if(!this.dataset.locked)this.style.borderColor='${col}66',this.style.background='${col}10'"
            onmouseout="if(!this.dataset.locked)this.style.borderColor='rgba(255,255,255,0.1)',this.style.background='rgba(255,255,255,0.03)'">
            <span style="width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;flex-shrink:0;">${String.fromCharCode(65+i)}</span>
            ${opt}
          </button>`).join('')}
      </div>

      <div style="margin-top:20px;text-align:right;">
        <button onclick="skipQuestion()" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:var(--text-muted);padding:10px 20px;border-radius:10px;cursor:pointer;font-family:inherit;font-size:0.82rem;">
          Skip →
        </button>
      </div>
    </div>`;

  // Start per-question countdown
  questionTimerInterval = setInterval(()=>{
    timeLeft--;
    const el = document.getElementById('qTimerNum');
    if(el){
      el.textContent = timeLeft;
      if(timeLeft <= 10){ el.style.color='#f87171'; }
      if(timeLeft <= 5){ el.parentElement.style.background='rgba(239,68,68,0.15)'; el.parentElement.style.borderColor='rgba(239,68,68,0.4)'; }
    }
    if(timeLeft <= 0){ clearInterval(questionTimerInterval); autoTimeOut(); }
  }, 1000);
}

function selectAnswer(chosen){
  if(!quizState) return;
  clearInterval(questionTimerInterval);

  const q = quizState.questions[quizState.current];
  const correct = q.ans;
  const isRight = chosen === correct;
  if(isRight) quizState.score++;
  quizState.answers.push(chosen);

  // Show feedback on options
  q.opts.forEach((_,i)=>{
    const btn = document.getElementById('opt'+i);
    if(!btn) return;
    btn.dataset.locked = '1';
    btn.style.cursor = 'default';
    btn.onmouseover = null; btn.onmouseout = null;
    if(i === correct){
      btn.style.background='rgba(16,185,129,0.2)';
      btn.style.borderColor='rgba(16,185,129,0.5)';
      btn.style.color='#34d399';
    } else if(i === chosen && !isRight){
      btn.style.background='rgba(239,68,68,0.15)';
      btn.style.borderColor='rgba(239,68,68,0.4)';
      btn.style.color='#f87171';
    }
  });

  setTimeout(()=> nextQuestion(), 900);
}

function autoTimeOut(){
  if(!quizState) return;
  quizState.answers.push(-1); // timed out = wrong
  setTimeout(()=> nextQuestion(), 400);
}

function skipQuestion(){
  if(!quizState) return;
  clearInterval(questionTimerInterval);
  quizState.answers.push(-1);
  nextQuestion();
}

function nextQuestion(){
  if(!quizState) return;
  quizState.current++;
  if(quizState.current >= quizState.questions.length){ showQuizResult(); }
  else { renderQuizQuestion(); }
}

function showQuizResult(){
  clearInterval(questionTimerInterval);
  if(!quizState) return;
  const { subject, questions, score, answers, startTime } = quizState;
  const timeTaken = Math.floor((Date.now()-startTime)/1000);

  // Save best score
  const scores = JSON.parse(localStorage.getItem('quizScores')||'{}');
  if(scores[subject]===undefined || score > scores[subject]) scores[subject]=score;
  localStorage.setItem('quizScores', JSON.stringify(scores));

  const pct = Math.round((score/questions.length)*100);
  const grade = pct>=90?'A+':pct>=80?'A':pct>=70?'B+':pct>=60?'B':pct>=50?'C':'D';
  const gradeColor = pct>=70?'#34d399':pct>=50?'#fbbf24':'#f87171';

  const c = document.getElementById('quizContainer');
  c.innerHTML = `
    <div style="max-width:600px;margin:0 auto;text-align:center;">
      <div style="font-size:4rem;margin-bottom:16px;">${pct>=70?'🎉':pct>=50?'👍':'💪'}</div>
      <h2 style="font-size:1.6rem;font-weight:900;margin-bottom:6px;">${subject} Quiz Complete!</h2>
      <p style="color:var(--text-muted);margin-bottom:32px;">Time taken: ${fmtMins(timeTaken)}</p>

      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px 32px;min-width:120px;">
          <div style="font-size:2.5rem;font-weight:900;color:${gradeColor};">${score}/${questions.length}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">Score</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px 32px;min-width:120px;">
          <div style="font-size:2.5rem;font-weight:900;color:${gradeColor};">${grade}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">Grade</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px 32px;min-width:120px;">
          <div style="font-size:2.5rem;font-weight:900;color:#818cf8;">${pct}%</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">Accuracy</div>
        </div>
      </div>

      <!-- Answer review -->
      <div style="text-align:left;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:700;font-size:0.9rem;margin-bottom:14px;">Answer Review</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${questions.map((q,i)=>{
            const chosen = answers[i];
            const correct = q.ans;
            const right = chosen===correct;
            return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;border-radius:10px;background:${right?'rgba(16,185,129,0.06)':'rgba(239,68,68,0.06)'};">
              <span style="font-size:0.85rem;margin-top:1px;">${right?'✅':'❌'}</span>
              <div>
                <div style="font-size:0.82rem;font-weight:600;">${q.q}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">Correct: <span style="color:#34d399">${q.opts[correct]}</span>${!right && chosen>=0?` · You chose: <span style="color:#f87171">${q.opts[chosen]}</span>`:''}${chosen===-1?' · <span style="color:#f59e0b">Skipped/Timed out</span>':''}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="startQuiz('${subject}')" style="padding:12px 28px;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-family:inherit;font-size:0.9rem;font-weight:700;cursor:pointer;">Retry Quiz</button>
        <button onclick="buildQuizHub()" style="padding:12px 28px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);background:transparent;color:var(--text-secondary);font-family:inherit;font-size:0.9rem;cursor:pointer;">Choose Another Subject</button>
      </div>
    </div>`;

  quizState = null;
}

// =========================================================
// ==============  WEEKLY CONTEST  =========================
// =========================================================

// 20 mixed questions for the contest (2 from each subject × ~3 subjects + 2 each)
function buildContestQuestions(){
  const pool = [];
  Object.entries(MCQ_BANK).forEach(([sub, qs])=>{
    const shuffled = [...qs].sort(()=>Math.random()-0.5);
    shuffled.slice(0,3).forEach(q=>pool.push({...q, subject:sub}));
  });
  return pool.sort(()=>Math.random()-0.5).slice(0,20);
}

function buildContestHub(){
  const c = document.getElementById('contestContainer');
  if(!c) return;

  updateContestTimer();
  const live = isContestLive();
  const ended = contestEnded();
  const prevResult = JSON.parse(localStorage.getItem('weeklyContestResult')||'null');

  if(live){
    // Contest is LIVE
    document.getElementById('contestNavBadge').style.display='inline';
    document.getElementById('contestTimerLabel').textContent = 'Time Remaining';

    const savedProgress = JSON.parse(localStorage.getItem('contestProgress')||'null');
    if(savedProgress && savedProgress.finished){ showContestResults(savedProgress); return; }

    c.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.08));border:1px solid rgba(245,158,11,0.3);border-radius:16px;padding:24px;margin-bottom:24px;display:flex;align-items:center;gap:16px;animation:pulseBadge 2s infinite;">
        <div style="font-size:2rem;">🔴</div>
        <div>
          <div style="font-weight:800;font-size:1.1rem;color:#fbbf24;">Contest is LIVE now!</div>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">20 questions · 30-minute limit · Closes at 7:30 PM sharp</div>
        </div>
        <button onclick="enterContest()" style="margin-left:auto;padding:14px 28px;border-radius:12px;border:none;background:linear-gradient(135deg,#f59e0b,#ef4444);color:white;font-family:inherit;font-size:0.95rem;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 4px 20px rgba(245,158,11,0.4);">
          Enter Now →
        </button>
      </div>
      ${renderLeaderboardSection(null)}`;
  } else if(ended && prevResult) {
    showContestResults(prevResult);
  } else {
    // Contest not started yet — show countdown & leaderboard
    document.getElementById('contestNavBadge').style.display='none';

    const now = new Date();
    const isSat = now.getDay()===6;
    const h = now.getHours();

    c.innerHTML = `
      <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">⏰</div>
        <div style="font-size:1.1rem;font-weight:800;margin-bottom:8px;">
          ${isSat && h<19 ? 'Contest starts today at 7:00 PM!' : 'Next Weekly Contest'}
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Every Saturday · 7:00 PM – 7:30 PM · Class X-A</div>
        <div style="display:inline-block;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:14px 28px;">
          <div id="contestHubTimer" style="font-size:2rem;font-weight:900;font-family:'Plus Jakarta Sans',sans-serif;color:#fbbf24;letter-spacing:0.06em;">--:--:--</div>
          <div style="font-size:0.7rem;color:rgba(255,255,255,0.4);margin-top:4px;">HH : MM : SS</div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:700;margin-bottom:10px;">📋 Contest Rules</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.85rem;color:var(--text-muted);">
          <div>🕖 Contest opens every <strong style="color:var(--text-secondary);">Saturday at 7:00 PM</strong> and closes at <strong style="color:var(--text-secondary);">7:30 PM</strong></div>
          <div>❓ <strong style="color:var(--text-secondary);">20 mixed MCQ</strong> questions from all subjects</div>
          <div>⏱️ Total time limit: <strong style="color:var(--text-secondary);">30 minutes</strong></div>
          <div>🏅 Score = <strong style="color:var(--text-secondary);">Correct × 10</strong> + <strong style="color:#fbbf24;">Time Bonus</strong> (faster = higher rank!)</div>
          <div>🏆 <strong style="color:var(--text-secondary);">Winner</strong> is whoever has the highest combined score</div>
        </div>
      </div>
      ${renderLeaderboardSection(null)}`;

    // Run hub countdown too
    updateHubTimer();
    setInterval(updateHubTimer, 1000);
  }
}

function updateHubTimer(){
  const el = document.getElementById('contestHubTimer');
  if(!el) return;
  const diff = Math.max(0, Math.floor((getNextSaturday7PM()-new Date())/1000));
  el.textContent = fmtTime(diff);
}

function enterContest(){
  if(!isContestLive()){ buildContestHub(); return; }
  const questions = buildContestQuestions();
  const TOTAL_SECS = 30*60; // 30 mins
  contestState = { questions, current:0, score:0, answers:[], startMs:Date.now(), totalSecs: TOTAL_SECS };
  renderContestQuestion();
}

function renderContestQuestion(){
  const c = document.getElementById('contestContainer');
  if(!c||!contestState) return;

  const { questions, current, answers } = contestState;
  const q = questions[current];
  const total = questions.length;
  const subColors = { Mathematics:'#6366f1', Physics:'#10b981', Chemistry:'#8b5cf6', English:'#f59e0b', History:'#ec4899', Biology:'#06b6d4' };
  const col = subColors[q.subject]||'#6366f1';
  const elapsed = Math.floor((Date.now()-contestState.startMs)/1000);
  const timeLeft = Math.max(0, contestState.totalSecs - elapsed);

  c.innerHTML = `
    <div style="max-width:700px;margin:0 auto;">
      <!-- Top bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-muted);margin-bottom:6px;">
            <span style="font-weight:700;color:var(--text-primary);">Question ${current+1}/${total}</span>
            <span style="color:${col};font-weight:600;">${q.subject}</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:100px;overflow:hidden;">
            <div style="height:100%;width:${(current/total)*100}%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:100px;transition:width 0.4s;"></div>
          </div>
        </div>
        <div id="contestQTimer" style="
          background:${timeLeft<300?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.12)'};
          border:1px solid ${timeLeft<300?'rgba(239,68,68,0.4)':'rgba(245,158,11,0.3)'};
          border-radius:12px;padding:10px 16px;text-align:center;
        ">
          <div style="font-size:1.2rem;font-weight:900;font-family:'Plus Jakarta Sans',sans-serif;color:${timeLeft<300?'#f87171':'#fbbf24'};" id="contestTimerNum">${fmtMins(timeLeft)}</div>
          <div style="font-size:0.62rem;color:rgba(255,255,255,0.4);">remaining</div>
        </div>
      </div>

      <!-- Q dots -->
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:20px;">
        ${Array.from({length:total},(_,i)=>{
          if(i<current) return `<div style="width:20px;height:20px;border-radius:5px;background:${answers[i]===-1?'rgba(245,158,11,0.4)':answers[i]===questions[i].ans?'rgba(16,185,129,0.5)':'rgba(239,68,68,0.4)'};"></div>`;
          if(i===current) return `<div style="width:20px;height:20px;border-radius:5px;background:#f59e0b;"></div>`;
          return `<div style="width:20px;height:20px;border-radius:5px;background:rgba(255,255,255,0.06);"></div>`;
        }).join('')}
      </div>

      <!-- Question -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid ${col}33;border-radius:18px;padding:24px;margin-bottom:16px;">
        <div style="font-size:0.75rem;font-weight:700;color:${col};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Q${current+1} — ${q.subject}</div>
        <div style="font-size:1rem;font-weight:600;line-height:1.65;color:var(--text-primary);">${q.q}</div>
      </div>

      <!-- Options -->
      <div style="display:flex;flex-direction:column;gap:10px;" id="contestOpts">
        ${q.opts.map((opt,i)=>`
          <button onclick="contestAnswer(${i})" style="
            width:100%;padding:14px 18px;border-radius:12px;
            border:1px solid rgba(255,255,255,0.09);background:rgba(255,255,255,0.03);
            color:var(--text-secondary);font-family:inherit;font-size:0.9rem;text-align:left;
            cursor:pointer;display:flex;align-items:center;gap:14px;transition:all 0.2s;
          " onmouseover="this.style.borderColor='${col}66';this.style.background='${col}10'"
            onmouseout="this.style.borderColor='rgba(255,255,255,0.09)';this.style.background='rgba(255,255,255,0.03)'">
            <span style="width:26px;height:26px;border-radius:7px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:0.78rem;font-weight:700;flex-shrink:0;">${String.fromCharCode(65+i)}</span>
            ${opt}
          </button>`).join('')}
      </div>

      <div style="margin-top:16px;text-align:right;">
        <button onclick="contestSkip()" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:var(--text-muted);padding:9px 18px;border-radius:10px;cursor:pointer;font-family:inherit;font-size:0.8rem;">Skip →</button>
      </div>
    </div>`;

  // Whole-contest countdown in sidebar display
  startContestCountdown();
}

function startContestCountdown(){
  if(quizTimerInterval) clearInterval(quizTimerInterval);
  quizTimerInterval = setInterval(()=>{
    if(!contestState) { clearInterval(quizTimerInterval); return; }
    const elapsed = Math.floor((Date.now()-contestState.startMs)/1000);
    const left = Math.max(0, contestState.totalSecs - elapsed);

    const el = document.getElementById('contestTimerNum');
    if(el){
      el.textContent = fmtMins(left);
      if(left<300){ el.style.color='#f87171'; el.parentElement.style.background='rgba(239,68,68,0.15)'; }
    }
    // Also update banner timer
    const bannerTimer = document.getElementById('contestTimerDisplay');
    if(bannerTimer){
      const till730 = Math.max(0, Math.floor((getNext730PM()-new Date())/1000));
      bannerTimer.textContent = fmtMins(till730);
    }
    if(left<=0){ clearInterval(quizTimerInterval); finishContest(); }
  }, 1000);
}

function getNext730PM(){
  const d = new Date(); d.setHours(19,30,0,0); return d;
}

function contestAnswer(chosen){
  if(!contestState) return;
  const q = contestState.questions[contestState.current];
  if(chosen===q.ans) contestState.score++;
  contestState.answers.push(chosen);
  contestState.current++;
  if(contestState.current>=contestState.questions.length){ clearInterval(quizTimerInterval); finishContest(); }
  else { renderContestQuestion(); }
}

function contestSkip(){
  if(!contestState) return;
  contestState.answers.push(-1);
  contestState.current++;
  if(contestState.current>=contestState.questions.length){ clearInterval(quizTimerInterval); finishContest(); }
  else { renderContestQuestion(); }
}

function finishContest(){
  if(!contestState) return;
  const elapsed = Math.floor((Date.now()-contestState.startMs)/1000);
  const timeTaken = Math.min(elapsed, contestState.totalSecs);
  const timeBonus = Math.max(0, Math.floor((contestState.totalSecs - timeTaken) / 2));
  const rawScore = contestState.score * 10;
  const totalScore = rawScore + timeBonus;

  const result = {
    name:'Rahul Sharma', avatar:'RS',
    score: totalScore, rawScore, timeBonus,
    correct: contestState.score, total: contestState.questions.length,
    timeTaken, answers: contestState.answers,
    questions: contestState.questions,
    finished: true, date: new Date().toISOString()
  };
  localStorage.setItem('weeklyContestResult', JSON.stringify(result));
  contestState = null;
  showContestResults(result);
}

function showContestResults(result){
  const c = document.getElementById('contestContainer');
  if(!c) return;

  // Build leaderboard with user injected
  const allEntries = buildFullLeaderboard(result);
  const userRank = allEntries.findIndex(e=>e.isUser)+1;
  const winner = allEntries[0];

  c.innerHTML = `
    <!-- Winner announcement -->
    <div style="background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(99,102,241,0.1));border:1px solid rgba(245,158,11,0.35);border-radius:18px;padding:28px;text-align:center;margin-bottom:28px;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(245,158,11,0.15),transparent 70%);"></div>
      <div style="position:relative;z-index:1;">
        <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#fbbf24;margin-bottom:8px;">🏆 This Week's Winner</div>
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;margin:0 auto 12px;">${winner.avatar}</div>
        <div style="font-size:1.4rem;font-weight:900;margin-bottom:4px;">${winner.name}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);">${winner.score} points · Completed in ${fmtMins(winner.time)}</div>
        ${winner.isUser ? `<div style="margin-top:10px;font-size:0.9rem;font-weight:700;color:#fbbf24;">🎉 That's YOU!</div>` : ''}
      </div>
    </div>

    <!-- Your result -->
    <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-weight:700;font-size:0.9rem;margin-bottom:16px;">Your Performance — Class X-A</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:16px;">
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:16px 24px;">
          <div style="font-size:1.8rem;font-weight:900;color:#818cf8;">#${userRank}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Your Rank</div>
        </div>
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:16px 24px;">
          <div style="font-size:1.8rem;font-weight:900;color:#34d399;">${result.correct}/${result.total}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Correct</div>
        </div>
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:16px 24px;">
          <div style="font-size:1.8rem;font-weight:900;color:#fbbf24;">${result.score}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Total Score</div>
        </div>
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:16px 24px;">
          <div style="font-size:1.8rem;font-weight:900;color:#06b6d4;">${fmtMins(result.timeTaken)}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Time Taken</div>
        </div>
      </div>
      <div style="font-size:0.8rem;color:var(--text-muted);text-align:center;">
        Raw Score: ${result.rawScore} pts &nbsp;+&nbsp; ⚡ Time Bonus: ${result.timeBonus} pts &nbsp;=&nbsp; <strong style="color:var(--text-primary)">${result.score} pts</strong>
      </div>
    </div>

    ${renderLeaderboardSection(allEntries)}
  `;
}

function buildFullLeaderboard(userResult){
  let entries = BASE_LEADERBOARD.map(e=>({...e, isUser:false}));
  if(userResult){
    const user = { name:'Rahul Sharma', avatar:'RS', score:userResult.score, time:userResult.timeTaken, isUser:true };
    entries = entries.filter(e=>e.name!=='Rahul Sharma');
    entries.push(user);
  }
  // Sort: highest score first, then fastest time on tie
  entries.sort((a,b)=> b.score-a.score || a.time-b.time);
  return entries;
}

function renderLeaderboardSection(entries){
  if(!entries) entries = buildFullLeaderboard(null);
  const medals = ['🥇','🥈','🥉'];

  return `
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;">🏆 Class X-A Leaderboard</h3>
        <span style="font-size:0.75rem;color:var(--text-muted);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:4px 10px;border-radius:100px;">This Week</span>
      </div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
        <!-- Header -->
        <div style="display:grid;grid-template-columns:40px 1fr 80px 80px 80px;gap:12px;padding:10px 20px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;">
          <div>Rank</div><div>Student</div><div style="text-align:center;">Score</div><div style="text-align:center;">Time</div><div style="text-align:center;">Bonus</div>
        </div>
        ${entries.map((e,i)=>`
          <div style="display:grid;grid-template-columns:40px 1fr 80px 80px 80px;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:${e.isUser?'rgba(99,102,241,0.08)':'transparent'};align-items:center;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='${e.isUser?'rgba(99,102,241,0.08)':'transparent'}'">
            <div style="font-size:${i<3?'1.2rem':'0.85rem'};font-weight:700;text-align:center;color:${i===0?'#fbbf24':i===1?'#94a3b8':i===2?'#c97c3e':'var(--text-muted)'}">${i<3?medals[i]:i+1}</div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:34px;height:34px;border-radius:50%;background:${e.isUser?'rgba(99,102,241,0.25)':'rgba(255,255,255,0.08)'};color:${e.isUser?'#818cf8':'var(--text-secondary)'};display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;flex-shrink:0;">${e.avatar}</div>
              <div>
                <div style="font-size:0.875rem;font-weight:${e.isUser?'700':'500'};color:${e.isUser?'#818cf8':'var(--text-primary)'};">${e.name}${e.isUser?' (You)':''}</div>
                ${i===0?`<div style="font-size:0.68rem;color:#fbbf24;">👑 Class Champion</div>`:''}
              </div>
            </div>
            <div style="text-align:center;font-weight:700;font-size:0.9rem;color:${e.isUser?'#818cf8':'var(--text-primary)'};">${e.score}</div>
            <div style="text-align:center;font-size:0.82rem;color:var(--text-muted);">${fmtMins(e.time)}</div>
            <div style="text-align:center;font-size:0.82rem;color:#22d3ee;">+${Math.floor(Math.max(0,(1800-e.time)/2))}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function updateContestTimer(){
  const display = document.getElementById('contestTimerDisplay');
  const label = document.getElementById('contestTimerLabel');
  if(!display) return;
  if(isContestLive()){
    const left = Math.max(0,Math.floor((getNext730PM()-new Date())/1000));
    display.textContent = fmtMins(left);
    display.style.color='#f87171';
    if(label) label.textContent='Time Remaining';
  } else {
    const diff = Math.max(0,Math.floor((getNextSaturday7PM()-new Date())/1000));
    display.textContent = fmtTime(diff);
    display.style.color='#fbbf24';
    if(label) label.textContent='Next Contest In';
  }
}

// =========================================================
// INIT
// =========================================================
document.addEventListener('DOMContentLoaded',()=>{
  // Start contest header timer
  setInterval(updateContestTimer, 1000);

  // Show LIVE badge if Saturday 7–7:30 PM
  function checkContestBadge(){
    const badge = document.getElementById('contestNavBadge');
    if(badge) badge.style.display = isContestLive()?'inline':'none';
  }
  checkContestBadge();
  setInterval(checkContestBadge, 30000);
});

// Called by showSection in student.js
window.onShowQuiz = function(){ buildQuizHub(); };
window.onShowContest = function(){ buildContestHub(); };
