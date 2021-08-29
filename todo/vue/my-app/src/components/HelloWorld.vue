<template>
  <div>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo">{{todo}}</li>
    </ul>
    <form v-on:submit.prevent="addTodo">
      <input v-model="todoText" placeholder="What neeeds to be done?">
      <button type="submit"> Add Todo</button>
    </form>
  </div>
</template>

<script>
  export default{
    name: "HelloWorld",
    data: function() {
      return {
        todos:[],
        todoText:""
      };
    },
    methods: {
      addTodo: function(){
        this.todos = [...this.todos, this.todoText];
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      mounted: function(){
        const existingTodos = localStorage.getItem("todos");
        this.todos = existingTodos? JSON.parse(existingTodos) : [];  
      }
    }
  }
</script>

<style scoped>

</style>