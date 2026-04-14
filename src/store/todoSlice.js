import { createSlice, nanoid } from '@reduxjs/toolkit'

const loadTodos = () => {
    try {
        const data = localStorage.getItem("todos-data");
        return data ? JSON.parse(data) : [];
    } catch { return []; }
};

const saveTodos = (todos) => {
    localStorage.setItem("todos-data", JSON.stringify(todos));
};
const todoSlice = createSlice({
    name: "todos",
    initialState: loadTodos(),
    reducers: {
        addTodo: (state, action) => {
            state.push({ ...action.payload, id: nanoid(), completed: false });
            saveTodos(state)
        },
        deleteTodo: (state, action) => {
            const newState = state.filter((todo) => todo.id !== action.payload);
            saveTodos(newState);
            return newState;
        },
        editTodo: (state, action) => {
            const newState = state.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo));
            saveTodos(newState);
            return newState;
        },
        toggleTodo:(state, action) => {
            const todo = state.find((todo)=>todo.id === action.payload);
            if(todo){
              todo.completed = !todo.completed;
            }
            saveTodos(state);
        },
    }
})

export const { addTodo, deleteTodo, editTodo, toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;