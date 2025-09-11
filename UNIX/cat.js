const { stdin, stdout, stderr, argv, exit } = require("node:process");
const fs = require("node:fs");

// Get the first argument, and output the file content to stdout
const filePath = argv[2];
if (filePath) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(stdout);
  fileStream.on("end", () => {
    stdout.write("\n");
    // code '0' means that everything went correct
    exit(0);
  });
}
stdin.on("data", (data) => {
  stdout.write(data.toString("utf-8").toUpperCase());
});
