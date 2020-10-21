const path = require("path");

const renderHtml = function(app){
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/notes", function(req, res){
        console.log("getting '/notes'");
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
};


module.exports = renderHtml;