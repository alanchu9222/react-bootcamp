const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require('./routes/api/items')

const App = express();

// Body parser middleware
App.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to Mongo
mongoose
.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  })
.then(()=>{console.log("mongo db connected")})
.catch(err=>console.log(err))
// Use routes
App.use('/api/items', items)

const port=process.env.PORT || 5000
App.listen(port, ()=>console.log(`Server started on port ${port}`))