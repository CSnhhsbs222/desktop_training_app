const STORAGE_KEYS = {
  profile: 'nhh.profile.v1',
  scheduler: 'nhh.scheduler.v1'
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const START_MIN = 7 * 60;
const END_MIN = 17 * 60;
const SLOT_MIN = 15;

let profile = loadJSON(STORAGE_KEYS.profile, {});
let scheduleState = loadJSON(STORAGE_KEYS.scheduler, {
  monthlyTarget: 100,
  targetDays: 20,
  targetBasis: 'working',
  events: []
});

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function byId(id) { return document.getElementById(id); }
function minutesToTime(total) {
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}
function formatDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h ${m ? `${m}m` : ''}`.trim() : `${m}m`;
}
function money(value) { return `$${value.toFixed(2)}`; }

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
      button.classList.add('active');
      byId(button.dataset.view).classList.add('active-view');
    });
  });
}

function initSettings() {
  const dialog = byId('settingsDialog');
  const form = byId('profileForm');
  byId('openSettings').addEventListener('click', () => {
    Object.entries(profile).forEach(([key, value]) => {
      if (form.elements[key] && form.elements[key].type !== 'file') form.elements[key].value = value;
    });
    dialog.showModal();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    profile = {
      firstName: data.get('firstName') || '',
      preferredName: data.get('preferredName') || '',
      lastName: data.get('lastName') || '',
      birthday: data.get('birthday') || '',
      hireDate: data.get('hireDate') || '',
      photo: profile.photo || ''
    };
    const photo = form.elements.photo.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        profile.photo = reader.result;
        saveJSON(STORAGE_KEYS.profile, profile);
        renderHome();
        dialog.close();
      };
      reader.readAsDataURL(photo);
    } else {
      saveJSON(STORAGE_KEYS.profile, profile);
      renderHome();
      dialog.close();
    }
  });
  byId('clearProfile').addEventListener('click', () => {
    profile = {};
    saveJSON(STORAGE_KEYS.profile, profile);
    form.reset();
    renderHome();
  });
}

function rampInfo() {
  const schedule = [0, 25, 50, 75, 75, 100];
  if (!profile.hireDate) return { currentMonth: 1, percentage: 0, schedule };
  const hire = new Date(`${profile.hireDate}T00:00:00`);
  const now = new Date();
  const monthDiff = Math.max(0, (now.getFullYear() - hire.getFullYear()) * 12 + now.getMonth() - hire.getMonth());
  const currentMonth = Math.min(6, monthDiff + 1);
  return { currentMonth, percentage: schedule[currentMonth - 1], schedule };
}

function renderHome() {
  const name = profile.preferredName || profile.firstName || 'Therapist';
  const ramp = rampInfo();
  byId('home').innerHTML = `
    <div class="hero">
      <div class="card">
        <div class="profile-strip">
          ${profile.photo ? `<img class="avatar" src="${profile.photo}" alt="Profile photo" />` : `<div class="avatar">${name.charAt(0)}</div>`}
          <div>
            <p class="eyebrow">Daily Dashboard</p>
            <h2>Welcome, ${name}</h2>
            <p>Keep the day focused, sustainable, and organized.</p>
          </div>
        </div>
      </div>
      <div class="card">
        <p class="eyebrow">Current Ramp-Up</p>
        <h3>Month ${ramp.currentMonth} · ${ramp.percentage}%</h3>
        <div class="ramp-grid">${ramp.schedule.map((pct, index) => `
          <div class="ramp-month ${index + 1 === ramp.currentMonth ? 'current' : ''}">
            <span>Month ${index + 1}</span><strong>${pct}%</strong>${index === 5 ? '<small>⭐ Incentive Eligible</small>' : ''}
          </div>
        `).join('')}</div>
      </div>
    </div>
    <div class="section-grid">
      <div class="card full">
        <div class="header-row"><div><p class="eyebrow">Workflow</p><h3>Checklist</h3></div></div>
        <div class="check-tabs">
          <button class="tab-button active" data-check="daily">Daily</button>
          <button class="tab-button" data-check="weekly">Weekly</button>
          <button class="tab-button" data-check="monthly">Monthly</button>
        </div>
        <div id="checklistPanel"></div>
      </div>
      <div class="card full">${schedulerTemplate()}</div>
    </div>
  `;
  initChecklist();
  initScheduler();
}

function initChecklist() {
  const render = type => {
    byId('checklistPanel').innerHTML = `
      <div class="checklist">
        ${HUB_DATA.checklists[type].map(item => `<label class="check-item"><input type="checkbox" /> <span>${item}</span></label>`).join('')}
        <label class="check-item"><input type="checkbox" /> <span>Other:<input class="other-input" placeholder="Add your own ${type} item" /></span></label>
      </div>`;
  };
  render('daily');
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
      button.classList.add('active');
      render(button.dataset.check);
    });
  });
}

function schedulerTemplate() {
  return `
    <div class="scheduler-header">
      <div>
        <p class="eyebrow">Scheduling for Success</p>
        <h2>Scheduler Tool</h2>
        <p>Your weekly therapy scheduling tool — built for school-based work. This is a productivity simulator, not a calendar.</p>
      </div>
      <button class="ghost-button" id="clearSchedule">Clear Week</button>
    </div>
    <div class="scheduler-controls">
      <label>Monthly Target<input id="monthlyTarget" type="number" min="0" step="0.01" /></label>
      <label>Target Basis<select id="targetBasis"><option value="working">Working days</option><option value="school">School days</option></select></label>
      <label>Days This Month<input id="targetDays" type="number" min="1" step="1" /></label>
      <label>District Calendar<select id="calendarSelect"><option value="">Select a district</option>${HUB_DATA.calendars.map(cal => `<option value="${cal.url}">${cal.label}</option>`).join('')}</select></label>
    </div>
    <div class="scheduler-note">Incentive is earned for full productivity expectation beginning at 100% FTE, based on the monthly target, not on target reduced from PTO or training days.</div>
    <div class="planner-wrap"><div class="planner-grid" id="plannerGrid"></div></div>
    <div class="clinical-summary" id="clinicalSummary"></div>
    <div class="coaching-panel" id="coachingPanel"></div>
  `;
}

function initScheduler() {
  byId('monthlyTarget').value = scheduleState.monthlyTarget;
  byId('targetDays').value = scheduleState.targetDays;
  byId('targetBasis').value = scheduleState.targetBasis;
  byId('monthlyTarget').addEventListener('input', syncSchedulerControls);
  byId('targetDays').addEventListener('input', syncSchedulerControls);
  byId('targetBasis').addEventListener('change', syncSchedulerControls);
  byId('calendarSelect').addEventListener('change', event => { if (event.target.value) window.open(event.target.value, '_blank'); });
  byId('clearSchedule').addEventListener('click', () => { scheduleState.events = []; persistScheduler(); renderScheduler(); });
  renderScheduler();
}

function syncSchedulerControls() {
  scheduleState.monthlyTarget = Number(byId('monthlyTarget').value || 0);
  scheduleState.targetDays = Math.max(1, Number(byId('targetDays').value || 1));
  scheduleState.targetBasis = byId('targetBasis').value;
  persistScheduler();
  renderScheduler();
}
function persistScheduler() { saveJSON(STORAGE_KEYS.scheduler, scheduleState); }
function getType(id) { return HUB_DATA.sessionTypes.find(type => type.id === id); }
function dailyTarget(dayIndex) {
  const base = Number(scheduleState.monthlyTarget || 0) / Math.max(1, Number(scheduleState.targetDays || 1));
  const ptoReduction = scheduleState.events.filter(event => event.day === dayIndex).reduce((max, event) => Math.max(max, getType(event.typeId)?.ptoFactor || 0), 0);
  return base * (1 - ptoReduction);
}
function eventCredit(event) {
  const type = getType(event.typeId);
  if (!type) return 0;
  if (type.requiresParticipants) return type.credit * Number(event.participants || 0);
  return type.credit;
}
function dayStats(dayIndex) {
  const events = scheduleState.events.filter(event => event.day === dayIndex);
  const totalTime = events.reduce((sum, event) => sum + getType(event.typeId).duration, 0);
  const billable = events.reduce((sum, event) => sum + eventCredit(event), 0);
  const nonBillable = events.reduce((sum, event) => {
    const type = getType(event.typeId);
    return sum + (type.category !== 'billable' ? type.duration : 0);
  }, 0);
  const target = dailyTarget(dayIndex);
  return { events, totalTime, billable, nonBillable, target, remaining: Math.max(0, target - billable) };
}

function renderScheduler() {
  const grid = byId('plannerGrid');
  if (!grid) return;
  const timeRows = [];
  for (let min = START_MIN; min < END_MIN; min += SLOT_MIN) timeRows.push(min);
  grid.style.gridTemplateRows = `48px repeat(${timeRows.length}, 30px)`;
  grid.innerHTML = `<div class="planner-corner">Time</div>${DAY_SHORT.map(day => `<div class="planner-day-head">${day}</div>`).join('')}`;
  timeRows.forEach(min => {
    grid.insertAdjacentHTML('beforeend', `<div class="time-cell">${min % 60 === 0 ? minutesToTime(min) : ''}</div>`);
    DAYS.forEach((_, dayIndex) => grid.insertAdjacentHTML('beforeend', `<button class="slot-cell" data-day="${dayIndex}" data-start="${min}" aria-label="Add session ${DAYS[dayIndex]} ${minutesToTime(min)}"></button>`));
  });
  document.querySelectorAll('.slot-cell').forEach(cell => cell.addEventListener('click', () => openSessionModal(Number(cell.dataset.day), Number(cell.dataset.start))));
  scheduleState.events.forEach(event => renderEventBlock(event));
  renderSummary();
  renderCoaching();
}

function renderEventBlock(event) {
  const grid = byId('plannerGrid');
  const type = getType(event.typeId);
  const startRow = 2 + Math.floor((event.start - START_MIN) / SLOT_MIN);
  const span = Math.max(1, Math.ceil(type.duration / SLOT_MIN));
  const column = event.day + 2;
  const block = document.createElement('button');
  block.className = `event-block ${type.category === 'billable' ? 'billable' : 'nonbillable'}`;
  block.style.gridColumn = column;
  block.style.gridRow = `${startRow} / span ${span}`;
  block.innerHTML = `<strong>${type.label}</strong><span>${minutesToTime(event.start)} · ${formatDuration(type.duration)}</span><small>${type.category === 'billable' ? `${eventCredit(event).toFixed(2)} credits` : event.adminTask || '0 credits'}</small>`;
  block.addEventListener('click', eventClick => { eventClick.stopPropagation(); openSessionModal(event.day, event.start, event.id); });
  grid.appendChild(block);
}

function openSessionModal(day, start, eventId = null) {
  const existing = eventId ? scheduleState.events.find(event => event.id === eventId) : null;
  const modal = document.createElement('dialog');
  modal.className = 'settings-dialog';
  modal.innerHTML = `
    <form method="dialog" class="settings-card session-form">
      <div class="dialog-header"><div><p class="eyebrow">${DAYS[day]} · ${minutesToTime(start)}</p><h2>${existing ? 'Edit Session' : 'Choose Session Time'}</h2></div><button class="icon-button" value="cancel">×</button></div>
      <label>Session Type<select name="typeId">${HUB_DATA.sessionTypes.map(type => `<option value="${type.id}" ${existing?.typeId === type.id ? 'selected' : ''}>${type.label}</option>`).join('')}</select></label>
      <label class="participants-field">Participant Count<input name="participants" type="number" min="1" step="1" value="${existing?.participants || ''}" /></label>
      <label class="admin-field">Admin Activity<select name="adminTask"><option value="">Select activity</option>${HUB_DATA.adminTasks.map(task => `<option ${existing?.adminTask === task ? 'selected' : ''}>${task}</option>`).join('')}</select></label>
      <label>Optional Note<input name="note" value="${existing?.note || ''}" maxlength="40" /></label>
      <div class="dialog-actions">${existing ? '<button type="button" class="ghost-button delete-session">Delete</button>' : ''}<button class="primary-button" value="default">Save Session</button></div>
    </form>`;
  document.body.appendChild(modal);
  const form = modal.querySelector('form');
  const refreshFields = () => {
    const type = getType(form.elements.typeId.value);
    modal.querySelector('.participants-field').style.display = type.requiresParticipants ? 'grid' : 'none';
    modal.querySelector('.admin-field').style.display = type.requiresAdminTask ? 'grid' : 'none';
  };
  form.elements.typeId.addEventListener('change', refreshFields);
  refreshFields();
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const type = getType(data.get('typeId'));
    if (type.requiresParticipants && !Number(data.get('participants'))) return alert('Participant count is required for group sessions.');
    const payload = { id: existing?.id || crypto.randomUUID(), day, start, typeId: data.get('typeId'), participants: Number(data.get('participants') || 0), adminTask: data.get('adminTask') || '', note: data.get('note') || '' };
    scheduleState.events = existing ? scheduleState.events.map(event => event.id === existing.id ? payload : event) : [...scheduleState.events, payload];
    persistScheduler();
    modal.close();
    modal.remove();
    renderScheduler();
  });
  const deleteButton = modal.querySelector('.delete-session');
  if (deleteButton) deleteButton.addEventListener('click', () => { scheduleState.events = scheduleState.events.filter(event => event.id !== existing.id); persistScheduler(); modal.close(); modal.remove(); renderScheduler(); });
  modal.addEventListener('close', () => modal.remove(), { once: true });
  modal.showModal();
}

function renderSummary() {
  const monthlyBillable = DAYS.reduce((sum, _, index) => sum + dayStats(index).billable, 0);
  const rawTarget = Number(scheduleState.monthlyTarget || 0);
  const percent = rawTarget ? (monthlyBillable / rawTarget) * 100 : 0;
  const incentiveSteps = percent >= 100 ? Math.floor(percent - 100) : -1;
  const incentive = percent >= 100 ? 425 + (Math.max(0, incentiveSteps) * 42.5) : 0;
  byId('clinicalSummary').innerHTML = `
    <div class="summary-card month-overview"><strong>Month Overview</strong><span>${monthlyBillable.toFixed(2)} / ${rawTarget.toFixed(2)} credits</span><span>${percent.toFixed(2)}%</span><span>Estimated incentive: ${money(incentive)}</span></div>
    ${DAYS.map((day, index) => {
      const stats = dayStats(index);
      return `<div class="summary-card"><strong>${day}</strong><span>Total Time: ${formatDuration(stats.totalTime)}</span><span>Billable: ${stats.billable.toFixed(2)}</span><span>Non-Billable: ${formatDuration(stats.nonBillable)}</span><span>Remaining Target: ${stats.remaining.toFixed(2)}</span></div>`;
    }).join('')}`;
}

function renderCoaching() {
  const messages = [];
  DAYS.forEach((day, index) => {
    const stats = dayStats(index);
    if (stats.billable < stats.target) messages.push(`${day}: add ${stats.remaining.toFixed(2)} billable credits to meet the adjusted daily target.`);
    if (stats.nonBillable > 120) messages.push(`${day}: non-billable time is over two hours. Look for tasks that can be tightened or moved.`);
    if (stats.totalTime > 480) messages.push(`${day}: scheduled time exceeds an 8-hour workday.`);
    if (stats.totalTime < 300 && stats.billable < stats.target) messages.push(`${day}: open space may be underused for target-building sessions.`);
  });
  byId('coachingPanel').innerHTML = `<div class="card compact-card"><p class="eyebrow">Coaching Engine</p><h3>Scheduling Recommendations</h3>${messages.length ? `<ul>${messages.slice(0, 6).map(message => `<li>${message}</li>`).join('')}</ul>` : '<p>Your current week is balanced against the entered target.</p>'}</div>`;
}

function renderPlaceholder(id, title) {
  byId(id).innerHTML = `<div class="card"><p class="eyebrow">Coming next</p><h2>${title}</h2><p>This section is intentionally paused while the Scheduler Tool is built first.</p></div>`;
}

initNavigation();
initSettings();
renderHome();
renderPlaceholder('welcome', 'Welcome Center');
renderPlaceholder('training', 'Training Dashboard');
