// 28. Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).

function asyncTask(id: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(`Result ${id}`);
    }, 1000 * id);
  });
}

async function batchProcess() {
  const tasks = [1, 2, 3, 4, 5].map(id => asyncTask(id));
  const results = await Promise.all(tasks);
  console.log('Batch results:', results);
}

batchProcess();

export {};
