import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyAYe3b7d0JyT5mAPbAzNC0UDt3qm7a_Lyo',
  authDomain: 'task-list-1dd52.firebaseapp.com',
  databaseURL: 'https://task-list-1dd52.firebaseio.com',
  projectId: 'task-list-1dd52',
  storageBucket: 'task-list-1dd52.appspot.com',
  messagingSenderId: '651461321511'
});

const database = app.database();

database.goOnline();

const reference = database.ref('/tasks');

export const watch = handler => {
  reference.on('value', snapshot => {
    handler(snapshot.val());
  });
};

export const include = task => {
  const id = reference.push().key;

  return reference.child(id).set(Object.assign({}, task, { id }));
};

export const update = task => reference.child(task.id).update(task);

export const exclude = task => reference.child(task.id).remove();
