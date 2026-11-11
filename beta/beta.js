const timeline = document.querySelector('.beta-timeline');
const steps = [...timeline.children];
const tasks = [...document.querySelectorAll('.beta-task')];

function updateActions(task) {
  const handoff = task.querySelector('[data-handoff]');
  if (!handoff) return;

  const opened = history.state?.openedGoogle === task.id;
  handoff.classList.toggle('qr-btn-primary', !opened);
  handoff.classList.toggle('qr-btn-outline', opened);
  task.querySelector('.beta-continue').classList.toggle('qr-btn-primary', opened);
}

function showStep() {
  const requested = tasks.findIndex(task => '#' + task.id === location.hash);
  const current = Math.max(requested, 0) + 1;
  steps.forEach((step, index) => {
    const complete = index < current;
    step.classList.toggle('is-complete', complete);
    step.querySelector('.beta-node').textContent = complete ? '✓' : index + 1;
    step.querySelector('[data-completion]').hidden = !complete;
    if (index === current) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
  });
  tasks.forEach((task, index) => { task.hidden = index + 1 !== current; });
  const activeTask = tasks[current - 1];
  updateActions(activeTask);
  return activeTask;
}

for (const link of document.querySelectorAll('[data-handoff]')) {
  link.addEventListener('click', () => {
    const task = link.closest('.beta-task');
    history.replaceState({ openedGoogle: task.id }, '');
    updateActions(task);
  });
}

timeline.hidden = false;
showStep();
window.addEventListener('hashchange', () => {
  showStep().querySelector('h2').focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
