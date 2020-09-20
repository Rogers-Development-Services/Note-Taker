// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on note-data.

const moment = require('moment');
const fs = require('fs');
const path = require('path');
const noteData = require('../db/db.json');

// Routing

module.exports = function(app) {
    
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON. "/api/notes" is an arbitrary url placeholder for where to access saved notes.

    // function renderAllNotes() {
    //     let allNotes =fs.readFileSync(path.join(__dirname, "../db/db.json"), { encoding:'utf8' });
    //     // console.log("Here are all the current notes written: \n", allNotes);
    //     return allNotes;        
    // };

    // This logs which note the server recieved from the client ?
    // app.get('/api/notes/:note', function(request, response) {
    //     let chosen = response.params.note;
    //     console.log(chosen);
    // })

    // This routes all the notes to the client
    app.get('/api/notes', function(request, response) {
        response.json(noteData);
    });

    // POST `/api/notes` - Should receive a new note to save on the request body (in JSON format) add it to the `db.json` file (as an object), and then return the new note to the client.

    app.post('/api/notes', function(request, response) {
        let noteInfo = request.body; 
        noteInfo.id = moment().format();
        console.log("Here's info on your latest saved note: \n", noteInfo);
        noteData.push(noteInfo);
        console.log("Here's the current array of saved notes: \n", noteData);
        response.json(true); 
    });

    app.delete('/api/notes/:id', function(request, response) {
        let deletedId = request.params.id;
        let index = noteData.findIndex((note) => note.id == deletedId);
        //remove that object from the array based off the index determined above
        noteData.splice(index, 1);
        //not sure why we need this, but the script doesn't work without it
        response.json({ ok: true });    

        response.send("DELETED Note");
    });
};


// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.