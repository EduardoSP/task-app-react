//useEffect poder ejecutar determinado codigo en determinado momento
import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibiltyControl';

function App() {

  const [userName, setUserName] = useState('edu');
  const [taskItems, setTaskItems] = useState([
    { name: 'Task one', done: false },
    { name: 'Task two', done: false },
    { name: 'Task three', done: true },
    { name: 'Task four', done: false }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(()=>{
    let data = localStorage.getItem('tasks');
    if(data != null){
      setTaskItems(JSON.parse(data));
    }else{
      setUserName('Edu example');
      setTaskItems([
        { name: 'Task one Example', done: false },
        { name: 'Task two Example', done: false },
        { name: 'Task three Example', done: true },
        { name: 'Task four Example', done: false }   
      ])
      setShowCompleted(true);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  },[taskItems]) //cada vez que haya un cambio en taskItems se ejecuta la funcion

  const createNewTask = taskName =>{
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = task =>
    setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t) ))

  const taskTableRows = (doneValue) =>
    taskItems
    .filter(task=> task.done === doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ))

  return (
    <div className="container p-4">
      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator callBack={createNewTask}/>
      <table className="table table-striped table-border">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
          <VisibilityControl
            description = "Completed Task"
            isChecked={showCompleted}
            callback={checked => setShowCompleted(checked)}
          
          />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-border">
            <thead></thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
