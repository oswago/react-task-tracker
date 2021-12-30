
import  Header from './componenets/Header'
import Tasks from './componenets/Tasks'
import {useState,useEffect} from 'react';
import AddTasks from './componenets/AddTasks';
function App() {
  const[showAddTask,setShowAddtask]=useState(false);
  const[tasks,setTasks]=useState([]);
   
  useEffect(()=>{
     const getTasks=async()=>{
           const taskFromServer=await fetchTasks()
            setTasks(taskFromServer)
     }
    getTasks()
  },[]);

  //Fetch data from server
  const fetchTasks=async()=>{
      const res=await fetch('http://localhost:5000/tasks')
       const data=await res.json();

      return data;
  }

  //Add task
    const addTask=(taskspassed)=>{
       const id=Math.floor(Math.random()*1000)+1;
       const newTask={id, ...taskspassed };
       setTasks([...tasks,newTask]);
     // console.log(newTask);
    };

  //delete  Task
   const delTask=(id)=>{
    setTasks(tasks.filter((task)=>task.id!==id));
   };
 
   const toggleReminder=(id)=>{
     setTasks(tasks.map((task)=>task.id==id ? {...task,reminder:!task.reminder}:task));
   }
  return (
    <div className="container">
      <Header title='Tasks Tracker' 
        onAdd={()=>setShowAddtask(!showAddTask)}
        showAdd={showAddTask}
       />
      {showAddTask && <AddTasks onAdd={addTask}/> }
      {tasks.length>0 ?<Tasks tasks={tasks} onDelete={delTask} onToggle={toggleReminder} />:"No More Tasks"}
    </div>
  );
}

export default App;
