// 29. Write an async function queueProcess() that processes tasks sequentially in a queue.

function asyncTask(id: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(`Result ${id}`);
    }, 1000 * id);
  });
}

async function queueProcess() {
  const results = [];
  for (let id = 1; id <= 5; id++) {
    const result = await asyncTask(id);
    results.push(result);
  }
  console.log('Queue results:', results);
}

queueProcess();

export {};
