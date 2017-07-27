import { watch, update, exclude } from '../services/tasks.js';
import render from '../helpers/render.js';

const handleTask = (task, element) => {
  const remove = element.querySelector('.task-action.-delete')
  const done = element.querySelector('.task-action.-done')
  const dismiss = element.querySelector('.task-action.-dismiss')

  remove.addEventListener('click', () => {
    exclude(task)
  });
  dismiss.addEventListener('click', () => update(
    Object.assign({}, task, {
      dismissed: !task.dismissed
    })
  ));
  done.addEventListener('click', () => update(
    Object.assign({}, task, {
      done: true
    })
  ));
};

const renderTask = (task, container) => {
  const template = document.querySelector('#template-task-item');
  const element = render(template.innerHTML, task);

  handleTask(task, element);

  container.appendChild(element);
};

export const handle = () => watch(
  tasks => {
    if (!tasks)
      return;

    const container = document.querySelector('.task-list');

    container.innerHTML = null;

    Object.keys(tasks).forEach(id => renderTask(tasks[id], container));
  }
);
