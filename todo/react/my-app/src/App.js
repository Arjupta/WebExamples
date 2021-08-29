import React, { useEffect, useRef, useState } from "react";
import './App.css';

function App() {
  // Setting the state and its function
  const [todos, setTodos] = useState([]);
  
  // Binding for input text field
  const todoText = useRef();

  useEffect(()=>{
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos?JSON.parse(existingTodos):[]);
  }, []);

  // Adding todo to the locat storage and the ui
  function addTodo(event){
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem("todos",JSON.stringify(next));
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (<li key = {todo}>{todo}</li>))}
      </ul>
      <form onSubmit={addTodo}>
        <input ref = {todoText}/>
        <input type="submit" value="Add Todo"/>
      </form>
    </div>
  )
}

export default App;
