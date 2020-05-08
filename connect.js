let mongoose = require('mongoose')
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect("mongodb://localhost/data", options);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("We are connected");
});