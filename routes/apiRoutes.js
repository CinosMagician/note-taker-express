const apiRoute = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

apiRoute.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    console.log(`Reading notes db...`);
});

apiRoute.get('/id', (req, res) => {
    readFromFile('./db/id.json').then((data) => res.json(JSON.parse(data)))
    console.log(`Reading id number`);
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

module.exports = apiRoute;