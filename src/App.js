import { createContext, useEffect, useState } from 'react';
import './App.css';
import TodoItems from './components/todoItems';

export const todocontext=createContext(null);

function App() {

  const [items,setitems]=useState(localStorage.getItem('todoList')?JSON.parse(localStorage.getItem('todoList')):[])
  const [inputValue,setinputValue]=useState('')
  
  useEffect(()=> {localStorage.setItem('todoList',JSON.stringify(items))}
  ,[items])

    const addtolist=()=> {
          if(inputValue) {
            setitems([...items,{id:Date.now(),text:inputValue,state:false,done:false}])
            setinputValue('')
          }
    }

    const completeAll=()=> {
      setitems(items.map((item)=> {
        return{...item,done:true,state:false}
      }))
    }
    const activateAll=()=> {
      setitems(items.map((item)=> {
        return{...item,state:true,done:false}
      }))
    }


  return (
    <todocontext.Provider value={{items,setitems}}>
      <div className="App bg-[#eee] min-h-[100vh] py-[100px]">
      <div className='max-w-[700px] m-auto  p-4'>
        <div className='flex justify-between items-center'>
          <input   onChange={(e)=> {setinputValue(e.target.value)}} value={inputValue} type='text' placeholder='add something' className='focus:outline-none flex-1 rounded-2xl p-2'/>
          <button  onClick={()=>{addtolist()}} className='ml-2 p-2 rounded-2xl bg-black/90 hover:bg-black/70 duration-300 text-white'>add todo</button>
        </div>
        <ul className='container py-4'>
          { items.map((item)=> {
            return <li key={item.id}><TodoItems data={item}/></li>
          })}
        </ul>
        <div className='flex justify-center items-center'>
          <button onClick={()=>{setitems([])}} className='mx-4 p-2 rounded-2xl bg-black/90 hover:bg-black/70 duration-300 text-white'>delete all</button>
          <button onClick={()=> {completeAll()}} className='mx-4 p-2 rounded-2xl bg-black/90 hover:bg-black/70 duration-300 text-white'>complete all</button>
          <button onClick={()=> {activateAll()}} className='mx-4 p-2 rounded-2xl bg-black/90 hover:bg-black/70 duration-300 text-white'>activate all</button>
        </div>
      </div>
    </div>
    </todocontext.Provider>
  );
}

export default App;
