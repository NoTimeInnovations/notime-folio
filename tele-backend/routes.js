const { Api } = require("telegram");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const Routes = (client, router) => {
  router.get("/", async (req, res) => {
    try {
      res.send("Server Working Correctly!");
      await client.sendMessage("me", { message: "Server Working Correctly!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      console.log(req.file);
      const caption = req.body.foldername;
      const entity = await client.getEntity("me");
      await client.sendFile(entity, {
        caption,
        file: req.file.path,
        forceDocument: true,
      });
      res.json({ message: "File sent" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

};

module.exports = Routes;
