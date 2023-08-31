import React, { useContext } from 'react'
import { todocontext } from '../App'

const TodoItems = (props) => {

    const {items,setitems}=useContext(todocontext)

    const deleteItem=(itemdel)=> {
        setitems(items.filter((item)=> {return item.id!==itemdel.id}))
    }
    const changeToActive=(itemactive)=> {
        setitems(items.map((item)=> {
            if(item.id!==itemactive.id) {
                return item
            }else {
                if(item.state===true){
                return {...item,state:false}
            }else{
                return {...item,state:true,done:false}
            }}
        }))
    }

    const doneItem=(doneitem)=> {
        setitems(items.map((item)=> {
            if(item.id!==doneitem.id) {
                return item
            }else {
                if(item.done===true){
                return {...item,done:false}
            }else{
                return {...item,done:true,state:false}
            }}
        }))
    }

  return (
    <div className={props.data.done===true?'flex items-center bg-slate-500 p-2 rounded-2xl  mb-2' :props.data.state===true?'flex items-center bg-green-700 p-2 rounded-2xl  mb-2':'flex items-center bg-slate-500 p-2 rounded-2xl  mb-2'}>
        <span className={props.data.done===true?'flex-1 text-white line-through':'flex-1 text-white'}> {props.data.text}</span>
        <button onClick={()=>{deleteItem(props.data)}} className='rounded-2xl p-2 bg-black/90 hover:bg-black/80 text-white ml-2 duration-300 text-sm'>Delete</button>
        <button onClick={()=>{changeToActive(props.data)}} className='rounded-2xl p-2 bg-black/90 hover:bg-black/80 text-white ml-2 duration-300 text-sm'>{props.data.state===true?'not active':'active'}</button>
        <button onClick={()=>{doneItem(props.data)}}  className='rounded-2xl p-2 bg-black/90 hover:bg-black/80 text-white ml-2 duration-300 text-sm'>{props.data.done===true?'not done':'done'}</button>
    </div>
  )
}

export default TodoItems