// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

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