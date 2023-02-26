
import React, { useState } from 'react';
//import './App.css';

const initialTasks = [
  { id: 1, title: 'Task 1', status: 'todo' },
  { id: 2, title: 'Task 2', status: 'todo' },
  { id: 3, title: 'Task 3', status: 'in-progress' },
  { id: 4, title: 'Task 4', status: 'in-progress' },
  { id: 5, title: 'Task 5', status: 'done' },
  { id: 6, title: 'Task 6', status: 'done' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, status) => {
    const task = JSON.parse(event.dataTransfer.getData('task'));
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, status };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const renderTasks = (status) => {
    return (
      <div className="col" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, status)}>
        <h3>{status.toUpperCase()}</h3>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div key={task.id} className="task" draggable onDragStart={(event) => handleDragStart(event, task)}>
              {task.title}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="row">{renderTasks('todo')}</div>
      <div className="row">{renderTasks('in-progress')}</div>
      <div className="row">{renderTasks('done')}</div>
    </div>
  );
}

export default App;
