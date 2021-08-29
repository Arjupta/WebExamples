import {createSignal, onMount} from "solid-js";

function App() {
  let todoText;

  const [todos,setTodos] = createSignal([]);

  onMount(()=>{
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos?JSON.parse(existingTodos):[]);
    // localStorage.clear();
  });
  
  function addTodo(event){
    event.preventDefault();
    const next = [...todos(),todoText.value];
    setTodos(next);
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  return (
    <div>
      <ul>
        {todos().map(todo=>(<li key={todo}>{todo}</li>))}
      </ul>
      <form onSubmit={addTodo}>
        <input type="text" ref={todoText}/>
        <input type="submit" value="Add Todo"/>
      </form>
    </div>
  );
}

export default App;
