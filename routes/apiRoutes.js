const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const dbFilePath = path.join(__dirname, "../db/db.json");
const fsReadFile = util.promisify(fs.readFile);

const apiRoutes = function(app){
    // Gets the notes db.json
    app.get("/api/notes", function(req, res){
        fs.readFile(dbFilePath, "utf8", function(err, data){
            console.log("Getting 'db.json'");
            res.json(data);
        });
    });

    // Posting to the notes db.json
    app.post("/api/notes", function(req, res){
        const body = req.body;
        body.id = uuidv4();
        //Reading file
        fsReadFile(dbFilePath).then(function(res){
            let dbJsonArray = JSON.parse(res);
            //adding notes to array
            dbJsonArray.push(body);
            //writing to the db.json
            fs.writeFile(dbFilePath, JSON.stringify(dbJsonArray, null, 2), function(err){
                if(err){
                    throw err;
                }
    
                console.log("Added to 'db.json'")
            });
        });

        res.json(body);
    });

    //deleting the specific note with id matching the request
    app.delete("/api/notes/:id", function(req, response){
        const id = req.params.id;
        console.log(id);

        fsReadFile(dbFilePath).then(function(res){
            let dbJsonArray = JSON.parse(res);
            
            dbJsonArray.forEach(element => {
                if(id === element.id){
                    console.log("deleting from array");
                    dbJsonArray.splice(dbJsonArray.indexOf(element), 1);
                    response.send("Successfully deleted from file");
                }
            });
            
            fs.writeFile(dbFilePath, JSON.stringify(dbJsonArray, null, 2), function(err){
                if(err){
                    throw err;
                }
    
                console.log("Deleted from and updated 'db.json'")
            });
        });
    });
};

module.exports = apiRoutes;