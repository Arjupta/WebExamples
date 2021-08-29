import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  todos: string[] = [];
  todoText = "";

  ngOnInit(){
    const existingTodos = localStorage.getItem("todos");
    this.todos = existingTodos? JSON.parse(existingTodos):[];
  }

  addTodo(){
    this.todos.push(this.todoText);
    localStorage.setItem("todos",JSON.stringify(this.todos));
  }
}
