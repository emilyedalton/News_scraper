
// var express = require('express');
// var exphbs  = require('express-handlebars');

// var app = express();

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//     res.render('index');
// });

// app.listen(3000);




const express = require("express");
 mongoose = require("mongoose");
 cheerio = require("cheerio");
 axios = require ("axios")
 app = express();

const PORT = process.env.PORT || 3000;

// body parsing middleware

app.use(express.static("public"));

// Parse request body as JSON
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.json());

// set view engine
const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get("/",(req,res)=>{
res.render('index');

});

app.post("/new",(req, res)=>{




});

app.get("/delete/:id", (req,res)=>{
res.send("this will delete one by ID")
});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});  