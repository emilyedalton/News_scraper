

const express = require("express");
const mongoose = require("mongoose");
//  cheerio = require("cheerio");
//  axios = require ("axios")
const app = express();
//  db = require("./models");


const PORT = process.env.PORT || 3000;
 
const routes = require("./controllers/routes.js")
// body parsing middleware


// Parse request body as JSON
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(express.static("public"));


// var noteSchema = new mongoose.Schema ({
//   title: String, 
//   note: String,
//   created: {
//     type: Date, 
//      default: Date.now, 
//     }
// });

// var Notes = mongoose.model("note", noteSchema);

// set view engine
const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(routes);

// // A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("http://www.chicagotribune.com").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $(".trb_outfit_group_list_item_body").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
  
//          result.title = $(this).find(".trb_outfit_relatedListTitle").text();
//          result.link ="<a href =https://www.chicagotribune.com"+$(this).find("a").attr("href")+"></a>";
//          result.subject =$(this).find(".trb_outfit_group_list_item_brief").text();
      
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//           });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
//   });

// app.get("/",(req,res)=>{
//     db.Article.find({}, function(err, allArticles){
//         if(err){
//           console.log(err)
//         }else{
//             res.render('index', {articles:allArticles});
// console.log(allArticles);
//         }
        
//           });
        
//           });



// app.post("/new",(req, res)=>{

// });

// app.get("/delete/:id", (req,res)=>{
// res.send("this will delete one by ID")
// });

mongoose.connect("mongodb://localhost/newtribtest", { useNewUrlParser: true });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });