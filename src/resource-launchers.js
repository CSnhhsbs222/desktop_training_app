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
    'Service Flyer Option 3': 'assets/resources/Service Flyer (Option 3).pdf'
  };

  const resourceFile = resourceMap[button.textContent.trim()];
  if (!resourceFile) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(resourceFile, '_blank');
}, true);
