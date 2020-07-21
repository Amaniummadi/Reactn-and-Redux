import { createSlice } from '@reduxjs/toolkit';

let todoId=1;
export const todoSlice= createSlice({
    name:'todos',
    initialState:[ ],
    reducers:{
        create:(state,action)=>{
            const {payload} =action;
            state.push({
                id:todoId,
                description:payload,
                isComplete:false
            })
            todoId++;
        },
        toggleComplete:(state,action) =>{
            console.log("togglecomplete in slice");
            const {payload} = action;
            console.log("payload",payload);
            const toogglecomplete=state.find(todo => todo.id === payload)
            console.log("fvbdfv",toogglecomplete)
            if(toogglecomplete){
                toogglecomplete.isComplete=!toogglecomplete.isComplete
            }
        },
        remove:(state,action) =>{
          console.log("delete in slice");
            const {payload} = action;
            const deleteItem= state.findIndex(todo => todo.id === payload)
        if(deleteItem !== -1){
            console.log("true");
                state.splice(deleteItem,1)
            }
        },
        edit:(state,action)=>{
            console.log("edit page");
            const {id,description}= action.payload
            const toEditTodo=state.find(todo => todo.id === id);

            if(toEditTodo){
                toEditTodo.description=description
            }

        }
    }
});
export const { create , toggleComplete,remove, edit} = todoSlice.actions;
// export const selectTodo = state => state.todos;

export default todoSlice.reducer;
