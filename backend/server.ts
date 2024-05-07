import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import csvToJSON from "convert-csv-to-json";

const app = express();
const PORT = process.env.PORT || 9000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

app.post("api/files", upload.single("file"), async (req, res) => {
  console.log("posting");
  return res.status(200).json({ message: "File uploaded successfully" });
});

app.get("api/users", async (req, res) => {
  console.log("getting");
  return res.status(200).json({ data: [] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
