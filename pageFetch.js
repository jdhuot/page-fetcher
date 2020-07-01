const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = args[0];
const dl = args[1];

// returns true if dl file alreay exists
fs.access(dl, fs.F_OK, (err) => {
  if (err) {
    throw err;
  }
});

// console.log(args);

request(url,(error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.log("Hmm.. something went wrong. See Error: " + error);
    console.log("Details.. " + response && response.statusCode);
  }
  if (dl) {
    console.log("Hmm, I can see that the file already exists!\n");
    rl.question('Overwrite existing file? if Yes, type:"y", if No type:"n"  ', (answer) => {
      if (answer === "y") {
        fs.writeFile(dl, body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${body.length} bytes to ${dl}`);
        });
      }
      if (answer === "n") {
        console.log("nevermind");
      }
    
      rl.close();
    });
  } else {
    fs.writeFile(dl, body, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${body.length} bytes to ${dl}`);
    });
  }
});




