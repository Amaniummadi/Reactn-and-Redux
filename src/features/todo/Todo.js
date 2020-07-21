import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {create, toggleComplete,remove, edit} from './todoSlice'

export const Todo = () => {
    const todos = useSelector(state=>state.todos)    //this todos values is comes from store
    const [inputText, setInputText] = useState('')
    const [isEdited, setisEdited] = useState(-1)
    const [isupdate, setUpdate] = useState('')
  
    const dispatch = useDispatch()
    console.log("todos",todos);

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(create(inputText))
        setInputText(' ');
    }
    const handleInputChange = (e) =>{
        setInputText(e.target.value);
        
    }
    const handletoggle = id =>()=>{
        console.log("tootle");
        dispatch(toggleComplete(id))
    }
    const handleDelete = id =>()=>{
        console.log("delete");
        dispatch(remove(id))
    }
    const handleEdit = (id,description) => () =>{
        setisEdited(id)
        setUpdate(description)
        console.log("isEdited",isEdited);
        console.log("isupdate",isupdate);
    }

    const handleUpdate =(e)=>{
        console.log("isEdited",isEdited);
        console.log("isupdate",isupdate);
        e.preventDefault();
       dispatch(edit({id:isEdited,description:isupdate}));
       setisEdited(-1);
       setUpdate("");
    }
// console.log("inputText",inputText)


    return (
        <div>
        <form onSubmit={handleSubmit}>
           <input value={inputText} onChange={handleInputChange} />
           <button>onsubmit</button>
       </form>
       {todos.map(todo=>(
           <div key={todo.id}>
               {isEdited === todo.id ? (
                   <form onSubmit={handleUpdate}>
                       <input type="text" value={isupdate} onChange={(e)=> setUpdate(e.target.value)}/>
                   </form>
               ):
               <>
               {todo.description} {todo.isComplete ? "Done" : "" }
               <button onClick={handletoggle(todo.id)}>toogle</button>
               <button onClick={handleDelete(todo.id)}>Delete</button>
               <button onClick={handleEdit(todo.id,todo.description)}>Edit</button>
               </>
               }
               

           </div>
       ))}
        </div>
    
    )
}
