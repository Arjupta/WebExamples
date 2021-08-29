<script>
	import { onMount } from 'svelte';
	let todos = [];
	let todoText = "";

	onMount(()=>{
		const existingTodos = localStorage.getItem("todos");
		todos = existingTodos? JSON.parse(existingTodos):[];
	});

	function addTodo(){
		todos = [...todos,todoText];
		localStorage.setItem("todos", JSON.stringify(todos)); 
	}
</script>;

<main>
	<ul>
		{#each todos as todo}
			<li>{todo}</li>
		{/each}
	</ul>
	<form on:submit|preventDefault={addTodo}>
		<input bind:value={todoText}>
		<input type="submit" value="Add Todo">
	</form>
</main>

<style>
</style>