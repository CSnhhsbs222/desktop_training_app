const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(key); }
};

const state = {
  profile: storage.get('hub.profile', {}),
  checks: storage.get('hub.checks', {}),
  selectedTraining: 0
};

function el(tag, className, html = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
  return node;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function displayName() {
  return state.profile.preferredName || state.profile.firstName || 'new teammate';
}

function rampUpInfo() {
  if (!state.profile.hireDate) return { currentMonth: null, percent: null };
  const hire = new Date(`${state.profile.hireDate}T00:00:00`);
  if (Number.isNaN(hire.getTime())) return { currentMonth: null, percent: null };
  const now = new Date();
  const months = (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth()) + 1;
  const clamped = Math.min(Math.max(months, 1), 6);
  const schedule = [0, 25, 50, 75, 75, 100];
  return { currentMonth: clamped, percent: schedule[clamped - 1] };
}

function renderHome() {
  const view = document.getElementById('home');
  const ramp = rampUpInfo();
  const avatar = state.profile.photoData ? `<img class="avatar" src="${state.profile.photoData}" alt="Profile photo">` : `<div class="avatar">${displayName().charAt(0).toUpperCase()}</div>`;
  view.innerHTML = `
    <div class="hero">
      <div class="card">
        <div class="profile-strip">${avatar}<div><p class="eyebrow">Daily operational dashboard</p><h2>Welcome, ${escapeHtml(displayName())}</h2><p>Use this home screen to quickly check ramp-up progress and keep your daily, weekly, and monthly workflow tucked away until needed.</p></div></div>
      </div>
      <div class="card"><p class="eyebrow">Current ramp-up</p><h3>${ramp.currentMonth ? `Month ${ramp.currentMonth}` : 'Hire date needed'}</h3><p class="large-metric">${ramp.percent !== null ? `${ramp.percent}%` : '—'}</p>${ramp.percent === 100 ? '<p class="meta-pill">⭐ Incentive Eligible</p>' : ''}</div>
    </div>
    <div class="section-grid">
      <div class="card full" id="rampCard"></div>
      <div class="card full" id="checklistCard"></div>
    </div>`;
  renderRampCard();
  renderChecklist('daily');
}

function renderRampCard() {
  const { currentMonth } = rampUpInfo();
  const schedule = [0, 25, 50, 75, 75, 100];
  const card = document.getElementById('rampCard');
  card.innerHTML = `<div class="header-row"><div><p class="eyebrow">Ramp-up progress</p><h3>Build sustainable habits while productivity increases</h3></div></div><div class="ramp-grid">${schedule.map((pct, i) => `<div class="ramp-month ${currentMonth === i + 1 ? 'current' : ''}"><span>Month ${i + 1}</span><strong>${pct}%</strong>${i === 5 ? '<small>⭐ Incentive Eligible</small>' : ''}</div>`).join('')}</div>`;
}

function renderChecklist(kind) {
  const card = document.getElementById('checklistCard');
  const items = HUB_DATA.checklists[kind];
  card.innerHTML = `
    <div class="header-row"><div><p class="eyebrow">Workflow checklist</p><h3>Daily / Weekly / Monthly Checklist</h3></div></div>
    <div class="check-tabs">${['daily','weekly','monthly'].map(tab => `<button class="tab-button ${tab === kind ? 'active' : ''}" data-check-tab="${tab}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join('')}</div>
    <div class="checklist">${items.map((text, i) => checkboxRow(kind, i, text)).join('')}<label class="check-item"><input type="checkbox" data-check="${kind}.other"><span><strong>Other:</strong><input class="other-input" data-other="${kind}" placeholder="Add your own ${kind} item" value="${escapeHtml(state.checks[`${kind}.otherText`] || '')}"></span></label></div>`;
}

function checkboxRow(kind, i, text) {
  const key = `${kind}.${i}`;
  return `<label class="check-item"><input type="checkbox" data-check="${key}" ${state.checks[key] ? 'checked' : ''}><span>${escapeHtml(text)}</span></label>`;
}

function renderWelcome() {
  const view = document.getElementById('welcome');
  view.innerHTML = `
    <div class="card">
      <p class="eyebrow">Welcome Center</p><h2>Our mission, or noble purpose, is delivering care that changes people’s lives.</h2>
      <p>Organizational growth happens through connection, support, and shared purpose.</p>
    </div>
    <div class="section-grid" style="margin-top:20px;">
      <div class="card"><h3>Welcome Message</h3><p><strong>Welcome to the team!</strong></p><p>We’re genuinely thrilled you’re here. Your first month brings a lot of new information, new systems, and new rhythms. There is no pressure to absorb everything at once or to remember it all, ever.</p><p>These resources exist to make information easy to find when you need it. Stay curious, take notes, ask questions, and give yourself plenty of grace as you grow into your role.</p></div>
      <div class="card"><h3>About Centerstone</h3><p>Centerstone is a nonprofit health system specializing in mental health and substance use disorder treatment. Our mission is delivering care that changes people’s lives.</p><p>Centerstone School-Based Services partners with public, charter, and private schools across Tennessee to increase access to mental health services for children, adolescents, and families.</p><div class="resource-row"><a class="link-button" href="https://centerstone.org" target="_blank">centerstone.org</a><a class="link-button" href="https://www.instagram.com/centerstonehealth/" target="_blank">Instagram</a></div></div>
      <div class="card full"><div class="header-row"><div><p class="eyebrow">Required feature</p><h3>Meet Your Leadership Team</h3></div></div><div class="accordion">${HUB_DATA.leadership.map(renderLeader).join('')}</div></div>
      <div class="card full"><h3>Growing Together</h3><p><strong>End of the Year Celebration — May 2021.</strong> During a time of uncertainty and change, our team continued showing up for students, families, and one another.</p><p><strong>Back to School Bash — 2025.</strong> School-Based Services continues to grow across Tennessee as we welcome new clinicians, expand partnerships, and create new positions.</p></div>
      <div class="card full"><h3>The day in the life of a school-based therapist</h3><p>Placeholder for the view-only PowerPoint page-turning display.</p></div>
    </div>`;
}

function renderLeader(person, index) {
  const initials = person.name.split(' ').map(part => part[0]).slice(0,2).join('');
  const extraLinks = [person.linkedIn ? { label: 'LinkedIn', url: person.linkedIn } : null, ...(person.links || [])].filter(Boolean);
  return `<details class="dossier"><summary><div class="dossier-header"><div class="dossier-photo">${initials}</div><div><strong>${escapeHtml(person.name)}</strong><br><span>${escapeHtml(person.title)}</span></div></div></summary><div class="detail-body"><p>${escapeHtml(person.phone || '')}<br><a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a></p><div class="resource-row">${extraLinks.map(link => `<a class="link-button" href="${link.url}" target="_blank">${escapeHtml(link.label)}</a>`).join('')}</div><p>${escapeHtml(person.bio)}</p><label><strong>Learn Something New</strong><textarea class="note-field" data-leader-note="${index}" placeholder="Add a note you want to remember.">${escapeHtml(storage.get(`hub.leaderNote.${index}`, ''))}</textarea></label></div></details>`;
}

function renderTraining() {
  const view = document.getElementById('training');
  view.innerHTML = `
    <div class="card"><p class="eyebrow">Training Hub</p><h2>Training Dashboard</h2><p>Each training opens independently. Training details, objectives, resources, homework, and completion feedback stay tucked away until selected.</p></div>
    <div class="section-grid" style="margin-top:20px;">
      <div class="card full"><h3>Training Calendar</h3><p>Month-view calendar placeholder. This will be the editable training schedule area.</p><div class="resource-row"><select id="districtCalendar"><option value="">Select a school district calendar</option>${HUB_DATA.calendars.map(cal => `<option value="${cal.url}">${cal.label}</option>`).join('')}</select></div></div>
      <div class="card full"><h3>Tools & Tech Check</h3><div class="checklist">${['Laptop, charger, and access basics confirmed', 'Outlook and calendar access confirmed', 'Avatar access confirmed', 'Eleos access confirmed', 'Zoom access confirmed'].map((x, i) => checkboxRow('tech', i, x)).join('')}</div><div class="resource-row"><a class="link-button" href="https://forms.office.com/Pages/ResponsePage.aspx?id=vQjgZfr1wUa7MrgrFjMTBS_hSQGE5SBOtXs1mk5el-hUMFBNSThMTlNXMjVCWFpROVpNMEk1TE1EVi4u" target="_blank">Confidence Questionnaire</a><button class="primary-button" type="button">90-Day Review</button></div></div>
      <div class="card full"><div class="training-layout"><div class="training-list">${HUB_DATA.trainings.map((training, i) => `<button class="training-button ${state.selectedTraining === i ? 'active' : ''}" data-training="${i}">${i + 1}. ${escapeHtml(training.title)}</button>`).join('')}</div><div id="trainingDetail"></div></div></div>
    </div>`;
  renderTrainingDetail();
}

function renderTrainingDetail() {
  const container = document.getElementById('trainingDetail');
  const training = HUB_DATA.trainings[state.selectedTraining];
  if (!container || !training) return;
  container.innerHTML = `<div class="soft-card"><p class="eyebrow">Selected training</p><h3>${escapeHtml(training.title)}</h3><p><span class="meta-pill">Trainer: ${escapeHtml(training.trainer)}</span></p><p><strong>Purpose:</strong> ${escapeHtml(training.purpose)}</p><h4>Objectives</h4><ol class="objectives">${training.objectives.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol><h4>Resources</h4><div class="resource-row">${training.resources.map(item => `<button class="ghost-button" type="button">${escapeHtml(item)}</button>`).join('')}</div><h4>Homework</h4><p>${escapeHtml(training.homework)}</p><h4>Feedback & Completion</h4><p class="muted">Submission of this survey is acknowledgment of completion by ${escapeHtml(displayName())}. Falsification of training completion or attendance documentation may result in disciplinary action.</p><div class="feedback-grid"><label>Content relevant to your role<select><option>Yes</option><option>Somewhat</option><option>No</option></select></label><label>Format was helpful<select><option>Yes</option><option>Somewhat</option><option>No</option></select></label><label>Overall score<select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label><label class="wide">Specific feedback<textarea></textarea></label></div><button class="primary-button" type="button" data-complete-training="${state.selectedTraining}">Submit feedback and mark complete</button></div>`;
}

function bindEvents() {
  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-view]');
    if (nav) {
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      nav.classList.add('active');
      document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
      document.getElementById(nav.dataset.view).classList.add('active-view');
    }
    const tab = event.target.closest('[data-check-tab]');
    if (tab) renderChecklist(tab.dataset.checkTab);
    const training = event.target.closest('[data-training]');
    if (training) { state.selectedTraining = Number(training.dataset.training); renderTraining(); }
    if (event.target.id === 'openSettings') openSettings();
    if (event.target.id === 'clearProfile') { storage.remove('hub.profile'); state.profile = {}; renderAll(); document.getElementById('settingsDialog').close(); }
    if (event.target.matches('[data-complete-training]')) {
      const key = `training.${event.target.dataset.completeTraining}.complete`;
      state.checks[key] = true;
      storage.set('hub.checks', state.checks);
      event.target.textContent = 'Completed ✓';
    }
  });

  document.addEventListener('change', event => {
    if (event.target.matches('[data-check]')) {
      state.checks[event.target.dataset.check] = event.target.checked;
      storage.set('hub.checks', state.checks);
    }
    if (event.target.id === 'districtCalendar' && event.target.value) window.open(event.target.value, '_blank');
  });

  document.addEventListener('input', event => {
    if (event.target.matches('[data-other]')) {
      state.checks[`${event.target.dataset.other}.otherText`] = event.target.value;
      storage.set('hub.checks', state.checks);
    }
    if (event.target.matches('[data-leader-note]')) storage.set(`hub.leaderNote.${event.target.dataset.leaderNote}`, event.target.value);
  });

  document.getElementById('profileForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = Object.fromEntries(new FormData(form).entries());
    delete next.photo;
    const file = form.elements.photo.files[0];
    const save = photoData => {
      state.profile = { ...state.profile, ...next, ...(photoData ? { photoData } : {}) };
      storage.set('hub.profile', state.profile);
      document.getElementById('settingsDialog').close();
      renderAll();
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = () => save(reader.result);
      reader.readAsDataURL(file);
    } else save();
  });
}

function openSettings() {
  const dialog = document.getElementById('settingsDialog');
  const form = document.getElementById('profileForm');
  ['firstName','preferredName','lastName','birthday','hireDate'].forEach(name => { form.elements[name].value = state.profile[name] || ''; });
  dialog.showModal();
}

function renderAll() {
  renderHome();
  renderWelcome();
  renderTraining();
}

bindEvents();
renderAll();
