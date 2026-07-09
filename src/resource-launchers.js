function normalizeResourceLabels() {
  document.querySelectorAll('.resource-launch').forEach(function (button) {
    if (button.textContent.trim() === 'District Calendars') {
      button.textContent = 'Excel Scheduler';
    }
  });
}

const resourceLabelObserver = new MutationObserver(normalizeResourceLabels);
resourceLabelObserver.observe(document.body, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', normalizeResourceLabels);
normalizeResourceLabels();

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
    'Using Eleos': 'assets/resources/Using Eleos.docx'
  };

  const resourceFile = resourceMap[button.textContent.trim()];
  if (!resourceFile) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(resourceFile, '_blank');
}, true);
