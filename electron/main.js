const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const reliasInjection = String.raw`
(() => {
  const groups = [
    ['Complete within 7 Days', [
      'Centerstone Corporate Compliance',
      'Centerstone Information Technology Security',
      'Centerstone Privacy',
      'Workplace Safety: The Basics'
    ]],
    ['Complete within 30 Days', [
      'Addictions Motivational Interviewing',
      'Avatar 1 - Clinical Documentation Basic Navigation VIDEO',
      'Avatar-2-Clinical Documentation-Intake',
      'Avatar-3-Clinical Documentation- Diagnosis and Therapy Care Plan',
      'Avatar-4-Clinical Documentation- Progress Notes and UPDATING Dx and Care Plan',
      'Centerstone Employee Benefits Overview',
      "Centerstone's Release of Information (NX Version)",
      'CSSRS: Columbia Suicide Severity Rating Scale',
      'Cultural Awareness and Humility',
      'Ethical and Legal Considerations for Telehealth',
      'Family and Medical Leave Act (FMLA)',
      'Harassment in the Workplace',
      'Internet Security & You',
      'PCP Communication',
      'Psychiatric Services Only Screening and Internal Referrals for Therapy',
      'Safety When Working in the Community',
      'Social Engineering Red Flags',
      'TN New Hire Clinical Documentation for Therapists and Case Managers',
      'Understanding the Military',
      'Understanding Trauma-Informed Care',
      'Workplace Justice for Staff (Just Culture Training)',
      'Workplace Substance Use'
    ]],
    ['Complete within 35 Days', ['CTN TB Screening']],
    ['Complete within 45 Days', [
      'SIM Center: Adapted Brief Cognitive Behavior Therapy for Suicide Prevention (BCBT-SP)',
      'SIM Center: RELATE Series Part 1: A New Approach to Suicide Care'
    ]],
    ['Complete within 60 Days', [
      'Basics of Psychopharmacology for Behavioral Health Professionals',
      'Centerstone Incident Reporting w/RL6',
      'Centerstone Non-Discrimination',
      'Medical Conditions Associated with Mental Illness',
      'Therapeutic Options De-Escalation - Tier 1 Verbal Skills',
      'Therapeutic Options De-Escalation– Tier 2 Verbal De-Escalation and Physical Defensive Skills'
    ]],
    ['Complete within 75 Days', ['Eleos Documentation Training & Orientation']],
    ['Complete within 90 Days', [
      'Client Rights/Complaint Process',
      'Episodes of Care Overview',
      'Fundamentals of Infection Prevention and Control',
      'Psychiatric Phone Call',
      'SIM Center: RELATE Series Part 2: Urgent Risk for Suicide Prevention',
      'SIM Center: RELATE Series Part 3: Moderate Risk for Suicide Prevention',
      'SIM Center: RELATE Series Part 4: Violence Prevention',
      'Supervising and Supporting Peers and Other Lived-Experience Professionals'
    ]]
  ];

  function renderRelias() {
    const panel = document.getElementById('trainingTabPanel');
    const activeTab = document.querySelector('[data-training-tab="relias"].active');
    if (!panel || !activeTab) return;

    panel.innerHTML = '<div class="card">' +
      '<p class="eyebrow">Relias Trainings</p>' +
      '<h2>Required Relias Training</h2>' +
      '<p>Complete the following Relias assignments by the recommended deadlines below.</p>' +
      '<p><a class="primary-button" href="https://centerstone.training.reliaslearning.com/" target="_blank" rel="noopener noreferrer">Open Relias</a></p>' +
      '<p><strong>Note:</strong> Login to Relias using SSO.</p>' +
      '<div class="page-gap">' + groups.map(([heading, courses]) =>
        '<section><h3>' + heading + '</h3><ul>' + courses.map(course => '<li>' + course + '</li>').join('') + '</ul></section>'
      ).join('') + '</div></div>';
  }

  const trainingView = document.getElementById('training');
  if (!trainingView) return;
  new MutationObserver(renderRelias).observe(trainingView, { childList: true, subtree: true });
  renderRelias();
})();
`;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: 'New Hire Hub',
    backgroundColor: '#f4fbfb',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, '..', 'index.html'));
  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(reliasInjection).catch(console.error);
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});