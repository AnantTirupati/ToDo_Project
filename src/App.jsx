import Navbar from "./components/Navbar"
import { useState } from "react"
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {


  const [task, settask] = useState("")
  const [tasks, settasks] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let taskString = localStorage.getItem("tasks")
    if (taskString) {
      let tasks = JSON.parse(localStorage.getItem("tasks"))
      settasks(tasks)
    }
  }, [])


  const TaskData = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }



  const handleAdd = () => {
    settasks([...tasks, { id: uuidv4(), task, isCompleted: false }])
    settask("")
    console.log(tasks)
    TaskData()
  }


  const handleEdit = (e, id) => {
    let t = tasks.filter(i => i.id === id)
    settask(t[0].task)
    let newTasks = tasks.filter(item => {
      return item.id !== id;
    })
    settasks(newTasks)
    TaskData()
  }


  const handleDelete = (e, id) => {
    let newTasks = tasks.filter(item => {
      return item.id !== id;
    })
    settasks(newTasks)
    TaskData()
  }


  const handleChange = (e) => {
    settask(e.target.value)
  }


  const handleCheckbox = (e) => {
    // console.log(e, e.target)
    let id = e.target.name;
    // console.log(`id is ${id}`)
    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    settasks(newTasks)
    // console.log(newTasks)
    TaskData()
  }



  return (
    <>
      <Navbar />
      <div className="container  bg-violet-100 min-h-[92vh] min-w-[99.9vw]">
        <h1 className="text-lg p-3 font-medium text-center">Add A Task</h1>
        <div className="addtodo flex justify-center gap-9  ">
          <input onChange={handleChange} value={task} className="w-200 bg-white peer z-[21] px-6 py-4 rounded-xl outline-none  duration-200 ring-2 ring-[transparent] focus:ring-[#11BE86]" type="text" placeholder="Add Task" name="" id="" />
          <button onClick={handleAdd} className=" cursor-pointer outline-none hover:rotate-90 duration-300">
            <svg
              className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="50px"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </div>
        <div className="items-center flex justify-center gap-5 py-5">
          <input type="checkbox"  name="" id="" checked={showFinished} /> Show Finished Tasks
        </div>
        <div className="">
          <h1 className="font-bold text-lg text-center p-5">YOUR TASKS</h1>
        </div>
        <div className="tasks flex flex-col items-center  gap-5">
          {tasks.length === 0 && <p className="text-center text-gray-500">No tasks available</p>}
          {tasks.map(item => {

            return <div key={item.id} className="task flex justify-around w-2/4  gap-10 bg-blue-200 p-4 rounded-xl">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.task}</div>
              <div className="buttons px-4 flex gap-4">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="delete"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </button>

              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
