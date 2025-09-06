// 30. Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.

async function fetchTodo(id: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) throw new Error('HTTP error');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function handleMultipleAPIs() {
  const ids = [1, 2, 3, 9999, 5]; // 9999 likely fails
  const promises = ids.map(id => fetchTodo(id));
  const results = await Promise.allSettled(promises);
  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      console.log(`API ${ids[idx]} success:`, result.value);
    } else {
      console.log(`API ${ids[idx]} failed:`, result.reason);
    }
  });
}

handleMultipleAPIs();

export {};
