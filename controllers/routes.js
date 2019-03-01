const express = require("express");
mongoose = require("mongoose");
cheerio = require("cheerio");
axios = require("axios")
app = express();
db = require("../models");


// GET route for scraping 
app.get("/scrape", function (req, res) {
    axios.get("http://www.chicagotribune.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".trb_outfit_group_list_item_body").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object

            result.title = $(this).find(".trb_outfit_relatedListTitle").text();
            result.link = $(this).find("a").attr("href");
            result.subject = $(this).find(".trb_outfit_group_list_item_brief").text();


            // Create a new Article using the `result` object 
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.redirect("/articles");
    });
});

app.get("/articles", (req, res) => {
    db.Article.find({}, function (err, allArticles) {
        // if(err){
        //   console.log(err)
        // }else{
        // console.log("these are articles" + " " +allArticles);
        res.render('index', { articles: allArticles });
        console.log("article result")

        // console.log(allArticles);
        // }

    }).sort({ _id: -1 }).populate("notes");

});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("notes")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        }).catch(err => {
            res.status(500).end(err);
        });

});
//This grabs the id in the params and changes the record to saved, but how does the button know in the 
//app.js file. 
app.put("/save/:id", (req, res) => {
    db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: true } }, (err, updateArticle) => {
        if (err) {
            res.status(500).end(err);
        } else {
            // console.log({notes: updateArticle})
            res.json(updateArticle);
        }


    });
});

// GET route for saved articles 
app.get("/saved", (req, res) => {
    db.Article.find({}, function (err, allArticles) {
        if (err) {
            res.status(500).end(err);
        } else {
            res.render('saved', { articles: allArticles });
        }

    }).sort({ _id: -1 })

});



app.put("/delete/:id", (req, res) => {
    db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: false } }, (err, updateArticle) => {
        if (err) {
            res.status(500).end(err);

        } else {
            // console.log({notes: updateArticle})
            res.json(updateArticle);
        }

    })

});




app.post("/articles/:id", (req, res) => {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.get("/comments", (req, res) => {
    // Find all users
    db.Article.find({})
        // Specify that we want to populate the retrieved articles with any associated comments
        .populate("notes")
        .then(function (dbArticls) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.render("index", notes);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.status(500).end(err);
        });
});




module.exports = app;