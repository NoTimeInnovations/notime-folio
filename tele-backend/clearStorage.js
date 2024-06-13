const fs = require('fs');
const path = require('path');

const deleteFilesAfterOneMinute = () => {
  const imagesDir = './images';
  const oneMinuteInMs = 60000; // 1 minute in milliseconds

  // Function to delete a file
  const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}: ${err}`);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  };

  // Function to check and delete files
  const checkAndDeleteFiles = () => {
    // Read the contents of the ./images directory
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${imagesDir}: ${err}`);
        return;
      }

      // Loop through each file in the directory
      files.forEach((file) => {
        const filePath = path.join(imagesDir, file);

        // Get the file stats
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(`Error getting stats for file ${filePath}: ${err}`);
            return;
          }

          // Calculate the time difference between now and the file's creation time
          const timeDiff = Date.now() - stats.birthtime.getTime();

          // If the time difference is greater than or equal to 1 minute, delete the file
          if (timeDiff >= oneMinuteInMs) {
            deleteFile(filePath);
          }
        });
      });
    });
  };

  // Set interval to check and delete files every 1 minute
  setInterval(checkAndDeleteFiles, oneMinuteInMs);
};

module.exports = deleteFilesAfterOneMinute;
