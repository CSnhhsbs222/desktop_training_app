document.addEventListener('click', function (event) {
  const button = event.target.closest('.resource-launch');
  if (!button) return;

  const resourceMap = {
    'Avatar Basic Navigation': 'assets/resources/Avatar Basic Navigation.pptx',
    'School-Based Fillable Forms': 'assets/resources/School-based fillable forms.pdf'
  };

  const resourceFile = resourceMap[button.textContent.trim()];
  if (!resourceFile) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(resourceFile, '_blank');
}, true);
