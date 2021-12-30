
import  Header from './componenets/Header'
import Tasks from './componenets/Tasks'
import Footer from './componenets/Footer';
import About from './componenets/About';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
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


   //Fetch data from server
   const fetchTask=async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
     const data=await res.json();

    return data;
}

  //Add task
    const addTask=async (taskspassed)=>{
      const res=await fetch(`http://localhost:5000/tasks`,{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
         body:JSON.stringify(taskspassed)
      } ) 
      const data=await res.json();
      setTasks([...tasks,data])
    //    const id=Math.floor(Math.random()*1000)+1;
    //    const newTask={id, ...taskspassed };
    //    setTasks([...tasks,newTask]);
    //  // console.log(newTask);


    };

  //delete  Task
   const delTask=async (id)=>{
     await fetch(`http://localhost:5000/tasks/${id}`
     ,{method:'DELETE'});
    setTasks(tasks.filter((task)=>task.id!==id));
   };
 
   //update Task
   const toggleReminder=async (id)=>{
     const taskToToggle=await fetchTask(id)
     const updTask={...taskToToggle,reminder:!taskToToggle.reminder}

     const res=await fetch(`http://localhost:5000/tasks/${id}`,
     {method:'PUT',
      headers:{
      'Content-type':'application/json'
      },
       body:JSON.stringify(updTask)
  })

  const data=await res.json()

     setTasks(tasks.map((task)=>task.id==id ? {...task,reminder:!data.reminder}:task));
   }


  return (
    <Router>  
        <div className="container">
          <Header title='Tasks Tracker' 
            onAdd={()=>setShowAddtask(!showAddTask)}
            showAdd={showAddTask}
          />
           {showAddTask && <AddTasks onAdd={addTask}/> }
                     {tasks.length>0 ?<Tasks tasks={tasks} onDelete={delTask} onToggle={toggleReminder} />:"No More Tasks"}
          <Routes>
                {/* <Route path='/' exact render={(props)=>(
                  <>
                     {showAddTask && <AddTasks onAdd={addTask}/> }
                     {tasks.length>0 ?<Tasks tasks={tasks} onDelete={delTask} onToggle={toggleReminder} />:"No More Tasks"}
                  </>
                )}/> */}
                <Route path='/about' element={<About/>} /> 
          </Routes> 
          
          <Footer/>
        </div>
    </Router>
  );
}

export default App;
