// 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.

function downloadFile(filename: string) {
  console.log(`Downloading ${filename}...`);
  setTimeout(() => {
    console.log(`${filename} downloaded!`);
  }, 3000);
}

downloadFile('testfile.txt');

export {};
