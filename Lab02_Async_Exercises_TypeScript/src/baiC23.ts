async function fetchCompletedTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todos = await response.json();
    const completedTodos = todos.filter((todo: any) => todo.completed);
    console.log('Completed todos:', completedTodos);
    return completedTodos;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

fetchCompletedTodos();

export {};
