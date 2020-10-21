// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const util = require('util');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =============================================================
// * The following HTML routes should be created:

// Basic route that sends the user first to the Index Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});

//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "develop/public/notes.html"));
});

//   * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all 
//   saved notes as JSON.

const apiRoutes = function(app){
    app.get("/api/notes", function(req, res){
        fs.readFile(dbFilePath, "utf8", function(err, data){
            console.log("Running 'Get db.json'");
            res.json(data);
        });
    });


//   * POST `/api/notes` - Should receive a new note to save on the 
//   request body, add it to the `db.json` file, and then return the 
//   new note to the client.

app.post("/api/notes", function(req, res){
    const body = req.body;
    body.id = uuidv4();
    fsReadFile(dbFilePath).then(function(res){
        let dbJsonArray = JSON.parse(res);
        dbJsonArray.push(body);
        fs.writeFile(dbFilePath, JSON.stringify(dbJsonArray, null, 2), function(err){
            if(err){
                throw err;
            }

            console.log("Added new note to db.json")
        });
    });

//   * DELETE `/api/notes/:id` - Should receive a query parameter 
//   containing the id of a note to delete. This means you'll need 
//   to find a way to give each note a unique `id` when it's saved.
//    In order to delete a note, you'll need to read all notes from 
//    the `db.json` file, remove the note with the given `id` property, 
//    and then rewrite the notes to the `db.json` file.