import React, { useState } from 'react';

const DailyGrowthChecklist = () => {
  const [tasks, setTasks] = useState([{ task: '', completed: false }]);

  const addTask = () => {
    setTasks([...tasks, { task: '', completed: false }]);
  };

  const toggleTaskCompletion = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="widget">
      <h3>Daily Growth Checklist</h3>
      {tasks.map((task, index) => (
        <div key={index}>
          <input
            type="text"
            value={task.task}
            onChange={(e) => {
              const newTasks = [...tasks];
              newTasks[index].task = e.target.value;
              setTasks(newTasks);
            }}
          />
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(index)}
          />
        </div>
      ))}
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default DailyGrowthChecklist;
