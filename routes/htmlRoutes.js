// This file will manage the get requests for the html pages
const htmlRoute = require('express').Router();
const path = require('path');

// This will handle when having the url with /notes on the end take you to the notes.html page
htmlRoute.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
}
);

// This will handle when having the url blank will take you to the index.html page
htmlRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}
);

// This is a wildcard, if anything else is typed after the / in the url will take you to the index.html page
htmlRoute.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}
);

// Exporting the module to be used in other files.
module.exports = htmlRoute;