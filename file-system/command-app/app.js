const fs = require("fs/promises");

(async () => {
  // commands
  const CREATE_FILE = "create a file";

  // Create file function
  const createFile = async (path) => {
    try {
      // check if the file already exists
      await fs.stat(path);
      return console.log(`The file ${path} already exists.`);
    } catch (error) {
      // we don´t have the file, now we have to create it
      if (error.code === "ENOENT") {
        const newFileHandle = await fs.open(path, "w");
        console.log("A new file was successfully created!");
        newFileHandle.close();
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const commandFileHandler = await fs.open("command.txt", "r");

  // fileHandler extends from EventEmiter
  commandFileHandler.on("change", async () => {
    // Get the size of our file
    const size = (await commandFileHandler.stat()).size;

    // Allocate the buffer with the correct size
    const buff = Buffer.alloc(size);

    // Where we want to start filling the buffer
    const offset = 0;

    // Number of bytes we want to read
    const length = buff.byteLength;

    // Where to begin reading data from the file
    const position = 0;

    // Reding content of the file
    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );

    /* decoder gets 0´s 1´s => returns meaningful
     encoder gets meaningful => 0´s 1´s*/
    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1).trim();
      createFile(filePath);
    }

    // Create a file:
    // Create a file <path>
  });

  const watcher = fs.watch("./command.txt");

  // watcher...
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
