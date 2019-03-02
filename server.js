

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;

// const MONGODB_URI = process.env.PORT || "mongodb://localhost/newtribtest";
 
mongoose.connect(MONGODB_URI);

const routes = require("./controllers/routes.js")
// body parsing middleware


// Parse request body as JSON
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(express.static("public"));


// set view engine
const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(routes);

// connect to db
mongoose.connect(process.env.PORT || "mongodb://localhost/newtribtest");


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });