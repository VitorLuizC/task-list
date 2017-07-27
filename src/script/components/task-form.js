import { include } from '../services/tasks.js';

export const handle = () => {
  const form = document.querySelector('[data-id="task-form"]')
  const open = document.querySelector('[data-id="task-form-open"]');
  const overlay = form.querySelector('.overlay')

  open.addEventListener('click', () => form.classList.add('-open'));
  overlay.addEventListener('click', () => form.classList.remove('-open'));
  form.addEventListener('submit', event => {
    event.preventDefault()

    const title = form.querySelector('[data-id="title"]').value;
    const time = form.querySelector('[data-id="time"]').value;

    if (!title || !time)
      return;

    const task = {
      title,
      time,
      dismissed: false,
      done: false
    };

    include(task).then(() => {
      console.log('Task saved: ', task);
    });
  });
};
