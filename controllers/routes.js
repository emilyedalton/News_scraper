const express = require("express");
 mongoose = require("mongoose");
 cheerio = require("cheerio");
 axios = require ("axios")
 app = express();
 db = require("../models");


 // GET route for scraping 
app.get("/scrape", function(req, res) {
    axios.get("http://www.chicagotribune.com").then(function(response) {
      var $ = cheerio.load(response.data);
  
      $(".trb_outfit_group_list_item_body").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
  
         result.title = $(this).find(".trb_outfit_relatedListTitle").text();
         result.link =$(this).find("a").attr("href");
         result.subject =$(this).find(".trb_outfit_group_list_item_brief").text();
        
  
        // Create a new Article using the `result` object 
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.redirect("/articles");
    });
  });

app.get("/articles",(req,res)=>{
    db.Article.find({}, function(err, allArticles){
        if(err){
          console.log(err)
        }else{
            res.render('index', {articles:allArticles});
console.log(allArticles);
        }
        
          }).sort({_id: -1});
        
          });

 // Route for grabbing a specific Article by id, populate it with it's note
 app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
//This grabs the id in the params and changes the record to saved, but how does the button know in the 
//app.js file. 
app.put("/save/:id",(req, res)=>{
    db.Article.findByIdAndUpdate(req.params.id,{$set: {saved: true}},(err, updateArticle)=>{
        if (err){
        console.log(err);
        
        }else{
        console.log({notes: updateArticle})
          res.json(updateArticle);
        }
        
        })
        
        
        
        });
        
        
// GET route for saved articles 
app.get("/saved", (req, res) =>{
    db.Article.find({}, function(err, allArticles){
        if(err){
          console.log(err)
        }else{
            res.render('saved', {articles:allArticles});
console.log(allArticles);
        }
        
          })
        
          });



app.get("/delete/:id", (req,res)=>{
res.send("this will delete one by ID")
});

module.exports = app;