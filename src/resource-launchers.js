function hideLegacyProfileSettingsUI() {
  const settingsButton = document.getElementById('openSettings');
  if (settingsButton) settingsButton.hidden = true;
}

function normalizeResourceLabels() {
  document.querySelectorAll('.resource-launch').forEach(function (button) {
    if (button.textContent.trim() === 'District Calendars') {
      button.textContent = 'Excel Scheduler';
    }
  });
}

function applyEcosystemWorkbookTraining() {
  if (typeof placeholderCoreTrainings === 'undefined') return;

  const ecosystemTraining = placeholderCoreTrainings.find(function (training) {
    return training.id === 'ecosystem-workbook';
  });

  if (!ecosystemTraining) return;

  ecosystemTraining.title = 'School-Based Ecosystem Workbook';
  ecosystemTraining.trainer = 'School-Based Services Training Team';
  ecosystemTraining.purpose = 'A field guide and companion workbook that helps new therapists understand role clarity, school culture, clinical identity, boundaries, sustainability, and the realities of embedded school-based practice.';
  ecosystemTraining.objectives = [
    'Understand the school-based ecosystem and the therapist role within it.',
    'Reflect on clinical identity, role clarity, and professional sustainability.',
    'Explore how school culture, urgency, confidentiality, and boundaries shape daily practice.',
    'Use workbook reflections to support team lead conversations during onboarding.'
  ];
  ecosystemTraining.resources = ['School-Based Ecosystem Workbook'];
}

function applyShadowingMentorshipTraining() {
  if (typeof placeholderCoreTrainings === 'undefined') return;

  const training = placeholderCoreTrainings.find(function (item) {
    return item.id === 'shadowing-mentorship';
  });

  if (!training) return;

  training.title = 'Shadowing and Mentorship';
  training.trainer = 'School-Based Services Training Team';
  training.purpose = 'Shadowing and mentorship work together to give you a supported, realistic start in school-based work. Through shadowing, you’ll observe how at least three of your peers function as outpatient therapists within a school setting—how they manage time, adapt to barriers, provide quality care, and build healthy, supportive relationships with their schools. Mentorship then gives you a connection point with someone who has been exactly where you are, offering relatable guidance and a professional relationship that helps you navigate challenges, grow, and feel grounded during your first 60 days.';
  training.objectives = [
    'Observe the workflow of at least three peers to understand how outpatient therapists operate within a school environment.',
    'Identify how therapists adapt to common barriers while providing quality care, managing their time, and fostering supportive school relationships.',
    'Build a supportive professional relationship with a mentor who has shared your role and can help you navigate early challenges.',
    'Apply mentor guidance to strengthen your workflow, confidence, and day-to-day problem-solving during your first 60 days.'
  ];
  training.resources = ['Mentorship'];
}

function simplifyCoreTrainingCards() {
  if (typeof trainingCard !== 'function') return;

  trainingCard = function (training, index) {
    return `<button class="training-tile ${index === selectedTraining ? 'active' : ''}" data-training="${index}"><strong>${esc(training.title)}</strong></button>`;
  };
}

function formatShadowingMentorshipObjectives() {
  const detail = document.querySelector('#trainingDetail');
  if (!detail) return;

  const title = detail.querySelector('h2');
  if (!title || title.textContent.trim() !== 'Shadowing and Mentorship') return;

  const sections = detail.querySelectorAll('.detail-section');
  const objectiveSection = Array.from(sections).find(function (section) {
    const heading = section.querySelector('h3');
    return heading && heading.textContent.trim() === 'Objectives';
  });

  if (!objectiveSection || objectiveSection.dataset.grouped === 'true') return;

  objectiveSection.dataset.grouped = 'true';
  objectiveSection.innerHTML = `
    <h3>Learning Objectives</h3>
    <h4>Shadowing Learning Objectives</h4>
    <ul class="objectives">
      <li>Observe the workflow of at least three peers to understand how outpatient therapists operate within a school environment.</li>
      <li>Identify how therapists adapt to common barriers while providing quality care, managing their time, and fostering supportive school relationships.</li>
    </ul>
    <h4>Mentorship Learning Objectives</h4>
    <ul class="objectives">
      <li>Build a supportive professional relationship with a mentor who has shared your role and can help you navigate early challenges.</li>
      <li>Apply mentor guidance to strengthen your workflow, confidence, and day-to-day problem-solving during your first 60 days.</li>
    </ul>
  `;
}

const resourceLabelObserver = new MutationObserver(function () {
  normalizeResourceLabels();
  formatShadowingMentorshipObjectives();
});
resourceLabelObserver.observe(document.body, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', function () {
  hideLegacyProfileSettingsUI();
  applyEcosystemWorkbookTraining();
  applyShadowingMentorshipTraining();
  simplifyCoreTrainingCards();
  normalizeResourceLabels();
  if (typeof renderTraining === 'function') renderTraining();
  formatShadowingMentorshipObjectives();
});
hideLegacyProfileSettingsUI();
applyEcosystemWorkbookTraining();
applyShadowingMentorshipTraining();
simplifyCoreTrainingCards();
normalizeResourceLabels();
if (typeof renderTraining === 'function') renderTraining();
formatShadowingMentorshipObjectives();

document.addEventListener('click', function (event) {
  const button = event.target.closest('.resource-launch');
  if (!button) return;

  const resourceMap = {
    'Avatar Basic Navigation': 'assets/resources/Avatar Basic Navigation.pptx',
    'School-Based Fillable Forms': 'assets/resources/School-based fillable forms.pdf',
    'Scheduling for Success': 'assets/resources/Scheduling for Success.pptx',
    'Excel Scheduler': 'assets/resources/Scheduler for Success.xlsx',
    'District Calendars': 'assets/resources/Scheduler for Success.xlsx',
    'Relationship Building': 'assets/resources/Relationship Building.pptx',
    'Service Flyer Option 1': 'assets/resources/Service Flyer (Option 1).pdf',
    'Service Flyer Option 2': 'assets/resources/Service Flyer (Option 2).pdf',
    'Service Flyer Option 3': 'assets/resources/Service Flyer (Option 3).pdf',
    'Telehealth 101': 'assets/resources/Telehealth 101.pptx',
    'Telehealth Procedures': 'assets/resources/Telehealth Procedures 5-2-24 Final.pdf',
    'Telehealth Toybox': 'assets/resources/Telehealth toybox.docx',
    'Diagnosing with Confidence': 'assets/resources/Diagnosing with Confidence.pptx',
    'DSM-5-TR Simplified': 'assets/resources/DSMV Simplified.pdf',
    'Episodes of Care FAQ': 'assets/resources/Episodes of Care - FAQ 3.2024.pdf',
    'DSM-5-TR Guess Who Rulebook': 'assets/resources/DSM-5-TR Guess Who - Official Rulebook.docx',
    'Printable Game Kit': 'assets/resources/DSM-5-TR Guess Who - Printable Game Kit.pptx',
    'Symptom Cluster Quick Reference': 'assets/resources/DSM-5-TR Guess Who - Symptom Cluster Quick Reference Sheet.docx',
    'Prevention Pathway Overview': 'assets/resources/Prevention Pathway Overview.pptx',
    'Prevention Pathway Quick Reference': 'assets/resources/Prevention Pathways Quick Reference.pdf',
    'C-SSRS Lifetime/Recent': 'assets/resources/C-SSRS-Full-Lifetime-Recent-2026.pdf',
    'C-SSRS Child Screener': 'assets/resources/C-SSRS-Screener-Child-2026.pdf',
    'INQ-15': 'assets/resources/Interpersonal needs questionnaire INQ-15.pdf',
    'RROVS': 'assets/resources/Rapid Risk of Violence Screen- RROVS.pdf',
    'Stanley-Brown Safety Plan': 'assets/resources/Stanley Brown Safety Plan.pdf',
    'Safety Sweep Checklist': 'assets/resources/Safety Sweep Checklist.pdf',
    'Eleos: Putting It Into Practice': 'assets/resources/Eleos — Putting It Into Practice.pptx',
    'Using Eleos + Collaborative Documentation': 'assets/resources/Using Eleos.docx',
    'Starting School-Based Group Therapy': 'assets/resources/Starting School-Based Group Therapy.pptx',
    'New Hire Cohort Workbook': 'assets/resources/New Hire Cohort Workbook.pdf',
    'New Hire Group Weekly Rotatable Deck': 'assets/resources/New Hire Group Weekly Rotatable.pptx',
    'School-Based Ecosystem Workbook': 'assets/resources/A therapist field guide to the school-based ecosystem (final).pdf',
    'Mentorship': 'assets/resources/Mentorship.docx'
  };

  const resourceFile = resourceMap[button.textContent.trim()];
  if (!resourceFile) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(resourceFile, '_blank');
}, true);

// Use the standalone single-day scheduler as the Scheduling for Success tool.
// Keeping it isolated in assets/tools makes it portable when the Hub moves from
// Electron to a phone-first web app.
if (typeof schedulerTemplate === 'function') {
  schedulerTemplate = function () {
    return `
      <div class="scheduler-card" style="padding:0;overflow:hidden;">
        <div class="scheduler-header" style="padding:16px 16px 0;">
          <div>
            <p class="eyebrow">Scheduling for Success</p>
            <h2>Scheduler Tool</h2>
            <p>Build one sample day, adjust CSG targets, and track progress toward the monthly incentive threshold.</p>
          </div>
        </div>
        <iframe
          src="assets/tools/csg-scheduler.html"
          title="CSG Scheduling Simulator"
          style="width:100%;height:1500px;border:0;display:block;background:#f3f5f4;"
          loading="lazy">
        </iframe>
      </div>`;
  };
}

if (typeof initScheduler === 'function') {
  initScheduler = function () {};
}
