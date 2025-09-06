// 26. Use async/await with setTimeout to simulate a 5-second wait.

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateWait() {
  console.log('Waiting 5 seconds...');
  await wait(5000);
  console.log('Done waiting!');
}

simulateWait();

export {};
