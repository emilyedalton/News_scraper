const express = require("express");
mongoose = require("mongoose");
cheerio = require("cheerio");
axios = require("axios")
app = express();
db = require("../models");


app.get("/scrape", function (req, res) {
    axios.get("http://www.chicagotribune.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".trb_outfit_group_list_item_body").each(function (i, element) {
            var result = {};


            result.title = $(this).find(".trb_outfit_relatedListTitle").text();
            result.link = $(this).find("a").attr("href");
            result.subject = $(this).find(".trb_outfit_group_list_item_brief").text();


            db.Article.create(result)
                .then(function (dbArticle) {
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.redirect("/");
    });
});

app.get("/", (req, res) => {

    db.Article.find({}).populate("note").sort({ _id: -1 }).limit(20).exec(
        function (err, allArticles) {
            // if(err){
            //   console.log(err)
            // }else{
            // console.log("these are articles" + " " +allArticles);


            res.render('index', { articles: allArticles });
            console.log("article result", { articles: allArticles })



        }
    );

});


app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(err => {
            res.status(500).end(err);
        });

});

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
            res.json(updateArticle);
        }

    })

});




app.post("/articles/:id", (req, res) => {
    db.Note.create(req.body)
        .then(function (dbNote) {

            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });

});

app.get("/comments", (req, res) => {
    db.Article.find({})
        .populate("notes")
        .then(function (dbArticls) {
            res.render("index", notes);
        })
        .catch(function (err) {
            res.status(500).end(err);
        });
});




module.exports = app;