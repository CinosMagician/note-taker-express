// This file will handle our requests for the api Routes, including GET, POST and DELETE
const apiRoute = require('express').Router();
// We need these functions to help with reading and writing in our db.json file.
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
// This function handles assigning unique ids to our notes.
const uuid = require('../helpers/uuid');

// This will be our get request to retrieve our notes from our db.json file.
apiRoute.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// This will handle posting a new note to our db.json file.
apiRoute.post('/notes', (req, res) => {
    // Making sure we have both a title and text for our note
    const { title, text} = req.body;

    if (req.body) {
        // This will assign a new note to include the title and text we have input plus a unique id.
        const newNote = {
            title,
            text,
            id: uuid()
        };

        // This will then read the db.json file and append or add on our note to the end of the file.
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        // This error will log if the note somehow cannot be added.
        res.error('Error in adding note');
    }
  });

// This will handle our delete request for our notes if we press the delete icon on the html page.
apiRoute.delete('/notes/:id', (req, res) => {
    // This will select the id of the note we are wishing to remove
    const id = req.params.id;

    // This will read the db.json file, then parse the data so it can compare and read it. 
    // It will first read all notes ids and if it finds a match, it will run the first statement to separate it and update the new db.json without it
    // Otherwise if the id trying to be deleted does not exist, it will
    readFromFile('./db/db.json')
        .then((data) => {
            let notes = JSON.parse(data);
            const noteToDelete = notes.find((note) => note.id === id);
            if(noteToDelete) {
                notes = notes.filter((note) => note.id !== id);
                writeToFile('./db/db.json', notes);
                res.json(`Note with ID ${id} deleted successfully`);
            } else {
                res.json(`Note with ID ${id} does not exist`);
            };
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting note');
        });
});

// Exporting our apiRoute modules to be used in other files.
module.exports = apiRoute;