const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('hubShell', {
  version: '0.1.0'
});

const reliasTrainingGroups = [
  {
    heading: 'Complete within 7 Days',
    courses: [
      'Centerstone Corporate Compliance',
      'Centerstone Information Technology Security',
      'Centerstone Privacy',
      'Workplace Safety: The Basics'
    ]
  },
  {
    heading: 'Complete within 30 Days',
    courses: [
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
    ]
  },
  {
    heading: 'Complete within 35 Days',
    courses: ['CTN TB Screening']
  },
  {
    heading: 'Complete within 45 Days',
    courses: [
      'SIM Center: Adapted Brief Cognitive Behavior Therapy for Suicide Prevention (BCBT-SP)',
      'SIM Center: RELATE Series Part 1: A New Approach to Suicide Care'
    ]
  },
  {
    heading: 'Complete within 60 Days',
    courses: [
      'Basics of Psychopharmacology for Behavioral Health Professionals',
      'Centerstone Incident Reporting w/RL6',
      'Centerstone Non-Discrimination',
      'Medical Conditions Associated with Mental Illness',
      'Therapeutic Options De-Escalation - Tier 1 Verbal Skills',
      'Therapeutic Options De-Escalation– Tier 2 Verbal De-Escalation and Physical Defensive Skills'
    ]
  },
  {
    heading: 'Complete within 75 Days',
    courses: ['Eleos Documentation Training & Orientation']
  },
  {
    heading: 'Complete within 90 Days',
    courses: [
      'Client Rights/Complaint Process',
      'Episodes of Care Overview',
      'Fundamentals of Infection Prevention and Control',
      'Psychiatric Phone Call',
      'SIM Center: RELATE Series Part 2: Urgent Risk for Suicide Prevention',
      'SIM Center: RELATE Series Part 3: Moderate Risk for Suicide Prevention',
      'SIM Center: RELATE Series Part 4: Violence Prevention',
      'Supervising and Supporting Peers and Other Lived-Experience Professionals'
    ]
  }
];

function renderReliasTrainingList() {
  const panel = document.getElementById('trainingTabPanel');
  const activeTab = document.querySelector('[data-training-tab="relias"].active');
  if (!panel || !activeTab) return;

  panel.innerHTML = `
    <div class="card">
      <p class="eyebrow">Relias Trainings</p>
      <h2>Required Relias Training</h2>
      <p>Complete the following Relias assignments by the recommended deadlines below.</p>
      <p><a class="primary-button" href="https://centerstone.training.reliaslearning.com/" target="_blank" rel="noopener noreferrer">Open Relias</a></p>
      <p><strong>Note:</strong> Login to Relias using SSO.</p>
      <div class="page-gap">
        ${reliasTrainingGroups.map(group => `
          <section>
            <h3>${group.heading}</h3>
            <ul>
              ${group.courses.map(course => `<li>${course}</li>`).join('')}
            </ul>
          </section>
        `).join('')}
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  const trainingView = document.getElementById('training');
  if (!trainingView) return;

  const observer = new MutationObserver(renderReliasTrainingList);
  observer.observe(trainingView, { childList: true, subtree: true });
  renderReliasTrainingList();
});
