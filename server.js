

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
mongoose.connect("mongodb://localhost:27017/notetaker", {useNewUrlParser: true})
var noteSchema = new mongoose.Schema ({
  title: String, 
  note: String,
  created: {
    type: Date, 
     default: Date.now, 
    }
});

var Notes = mongoose.model("note", noteSchema);

// set view engine
const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get("/",(req,res)=>{
    Notes.find({}, function(err, allNotes){
        if(err){
          console.log(err)
        }else{
            res.render('index', {notes:allNotes});
console.log(allNotes);
        }
        
          });
        
          });



app.post("/new",(req, res)=>{

});

app.get("/delete/:id", (req,res)=>{
res.send("this will delete one by ID")
});



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });