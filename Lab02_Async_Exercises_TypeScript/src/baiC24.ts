async function postData(data: any) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('POST result:', result);
    return result;
  } catch (error) {
    console.error('POST error:', error);
  }
}

postData({ title: 'foo', body: 'bar', userId: 1 });

export {};
