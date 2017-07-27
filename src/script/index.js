import { handle as handleTaskList } from './components/task-list.js';
import { handle as handleTaskForm } from './components/task-form.js';

function initialize() {
  handleTaskList();
  handleTaskForm();

  const tabs = [...document.querySelectorAll('.tab-item')];
  const containers = [...document.querySelectorAll('.tab-container')];

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const container = containers.find(container => {
        return container.getAttribute('data-tab') === tab.getAttribute('data-tab');
      });

      if (container) {
        containers.forEach(container => container.classList.remove('-current'))
        container.classList.add('-current')
      }
    });
  });

  tabs[0].click();
}

window.addEventListener('load', initialize);
