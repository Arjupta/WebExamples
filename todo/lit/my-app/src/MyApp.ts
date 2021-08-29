import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class MyApp extends LitElement {
  @property({type: Array}) todos: string[] = [];
  @property({type: String}) todoText: string = "";

  connectedCallback(){
    super.connectedCallback();
    const existingTodos = localStorage.getItem("todos");
    this.todos = existingTodos? JSON.parse(existingTodos) : [];
  }

  addTodo(event: Event){
    event.preventDefault();
    this.todos = [...this.todos, this.todoText];
    localStorage.setItem("todos",JSON.stringify(this.todos));
  }

  render(){
  return html`
    <ul>
       ${this.todos.map(todo=> html`<li>${todo}</li>`)}
    </ul>
    <form @submit="${this.addTodo}">
      <input type="text" .value="${this.todoText}" @change=${(e:any)=>this.todoText = e.target.value}/>
      <input type="submit">
    </form>
  `;
  }
}