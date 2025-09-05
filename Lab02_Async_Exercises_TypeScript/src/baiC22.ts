async function fetchTodo(id: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Fetched data for id ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data for id ${id}:`, error);
  }
}

async function fetchMultipleTodos(ids: number[]) {
  for (const id of ids) {
    await fetchTodo(id);
  }
}

fetchMultipleTodos([1, 2, 3, 4, 5]);

export {};
