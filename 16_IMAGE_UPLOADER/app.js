const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const app = express();
// Mongo URI

// Middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Mongo URI
const mongoURI =
  "mongodb+srv://alanchu:Pa$$w0rd@cluster0-vgrym.mongodb.net/mongouploads?retryWrites=true&w=majority";
const localURI = "mongodb://localhost:27017/myapp";
const promise = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Init gfs - refer gridfs stream : https://github.com/aheckmann/gridfs-stream
let gfs;
conn.once("open", () => {
  //  initialise the stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
//create storage object
const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
// This is being used as the middle ware to process information from the form
// before uploading into the database
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get("/", (req, res) => {
  res.render("index");
});
// @Route: POST /upload
// @Desc: Upload file to DB
//
// app.post("/", upload.single('file'), (req, res) => {
//     res.json({file:req.file});
// });

// @route POST /upload
// @desc  Uploads file to DB
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
  //    res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
