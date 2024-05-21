const apiRoute = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

apiRoute.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    console.log(`Reading notes db...`);
});

apiRoute.post('/notes', (req, res) => {
    const { title, text} = req.body;

  
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
  });

apiRoute.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => {
            let notes = JSON.parse(data);
            notes = notes.filter((note) => note.id !== id);
            writeToFile('./db/db.json', notes);
            res.json(`Note with ID ${id} deleted successfully`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting note');
        });
});

module.exports = apiRoute;