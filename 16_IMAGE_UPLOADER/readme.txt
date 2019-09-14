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
// Middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Mongo URI
const mongoURI =
  "mongodb+srv://alanchu:Pa$$w0rd@cluster0-vgrym.mongodb.net/test?retryWrites=true&w=majority";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs - refer gridfs stream : https://github.com/aheckmann/gridfs-stream
let gfs;
conn.once("open", () => {
  // initialise the stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});


// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
// Create storage engine
// Refer docs for multer gridfx storage -
// https://www.npmjs.com/package/multer-gridfs-storage
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// This is being used as the middle ware to process information from the form
// before uploading into the database
const upload = multer({ storage });


// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('index', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render('index', { files: files });
      }
    });
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
