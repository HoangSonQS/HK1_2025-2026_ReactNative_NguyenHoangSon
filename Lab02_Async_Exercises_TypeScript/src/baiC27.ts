// 27. Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.

async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP error');
      const data = await response.json();
      console.log('Fetch success:', data);
      return data;
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed. Retrying...`);
      if (i === retries - 1) {
        console.error('All retries failed.');
        throw error;
      }
    }
  }
}

fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3);

export {};
