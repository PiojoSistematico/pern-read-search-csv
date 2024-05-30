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

/* variable to store data */

let jsonData: Array<Record<string, string>> = [];

app.post("/api/files", upload.single("file"), async (req, res) => {
  const { file } = req;
  /* Handle upload failed */
  if (!file) {
    return res.status(500).json({ message: "Upload failed" });
  }

  /* Check mimetype */
  const validMimeTypes = ["text/csv", "application/vnd.ms-excel"];
  if (!validMimeTypes.includes(file.mimetype)) {
    return res.status(500).json({ message: "File must be CSV" });
  }

  /* Transform data */
  try {
    const csvData = file.buffer.toString();
    console.log(csvData);
    jsonData = csvToJSON.csvStringToJson(csvData);
    console.log(jsonData);
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" });
  }

  /* All good */
  return res
    .status(200)
    .json({ message: "File uploaded successfully", data: jsonData });
});

app.get("/api/users", async (req, res) => {
  console.log("getting");
  const { q } = req.query;
  if (!q) {
    return res.status(500).json({ message: "Query param is missing" });
  }

  const searchWord = q.toString().toLowerCase();

  const filteredData = jsonData.filter((elem) => {
    return Object.values(elem).some((value) =>
      value.toLowerCase().includes(searchWord)
    );
  });

  return res.status(200).json({ data: filteredData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
