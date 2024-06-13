const express = require("express");
const app = express();
const { startTelegramClient, router } = require("./telegram");
const dotenv = require("dotenv");
const cors = require("cors");
const deleteFilesAfterOneMinute = require("./clearStorage");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error.message);
  } else {
    console.log(`Server running at ${PORT}`);
    startTelegramClient();
    deleteFilesAfterOneMinute();
  }
});
