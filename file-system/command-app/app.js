const fs = require("fs/promises");

(async () => {
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

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
        console.log(`A new file ${path} was successfully created!`);
        newFileHandle.close();
      } else {
        console.error("An unexpected error occurred: ", error);
      }
    }
  };

  // Delete file function
  const deleteFile = async (path) => {
    try {
      await fs.rm(path);
      return console.log(`The file ${path} was removed.`);
    } catch (error) {
      if (error.code === "ENOENT") {
        return console.log("No such file or it's already been removed.");
      } else {
        console.error("An unexpected error occurred: ", error);
      }
    }
  };

  // Rename a File
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`File ${oldPath} renamed to ${newPath} successfully.`);
    } catch (error) {
      console.log("An Unexpected error occurred: " + error);
    }
  };

  // Write to a File
  const addToFile = async (path, content) => {
    try {
      const contentToAdd = content.slice(1).join(" ");
      await fs.appendFile(path, " " + contentToAdd);
      console.log(`Successfully added content to the file ${path}.`);
      console.log(`Content: ${contentToAdd}`);
    } catch (error) {
      console.log("An unexpected error occurred: " + error);
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

    // Reading content of the file
    await commandFileHandler.read(buff, offset, length, position);

    /* decoder gets 0´s 1´s => returns meaningful
     encoder gets meaningful => 0´s 1´s*/
    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1).trim();
      createFile(filePath);
    } else if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1).trim();
      deleteFile(filePath);
    } else if (command.includes(RENAME_FILE)) {
      const str = command.substring(RENAME_FILE.length + 1).trim();
      const arr = str.split(" ");
      const oldPath = arr[0];
      const newPath = arr[1];
      renameFile(oldPath, newPath);
    } else if (command.includes(ADD_TO_FILE)) {
      const str = command.substring(ADD_TO_FILE.length + 1).trim();
      const arr = str.split(" ");
      const path = arr[0];
      addToFile(path, arr);
    }
  });

  let debounceTimeout;
  const watcher = fs.watch("./command.txt");

  // watcher...
  for await (const event of watcher) {
    if (event.eventType === "change") {
      // Clear the previous timer if a new event arrise earlier
      clearTimeout(debounceTimeout);

      // Set new timer to emit a new event after 100ms
      debounceTimeout = setTimeout(() => {
        commandFileHandler.emit("change");
      }, 100);
    }
  }
})();
