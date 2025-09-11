const { spawn, exec } = require("node:child_process");
const { stdin, stdout, stderr } = require("node:process");

stdin.on("data", (data) => {
  //console.log("Got this data from standard in:", data.toString("utf-8"));
  stdout.write(`Got this data from standard in: ${data.toString("utf-8")}\n`);
});
stdout.write("This is some text that I want.\n");
stderr.write("This is some text that I may not want.\n");

// Environment variables
//console.log(process.env)

// Spawing a process
//const subprocess = spawn("ls", ["-l"]);
// subprocess.stdout.on("data", (data) => {
//   console.log(data.toString("utf-8"));
// });

// exec("ls -l", (error, stdout, stderr) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log(stdout);
//   console.error(`stderr: ${stderr}`);
// });
