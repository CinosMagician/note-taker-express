const htmlRoute = require('express').Router();
const path = require('path');

htmlRoute.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
    console.log(`Accessing notes.html...`)
}
);

htmlRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    console.log(`Accessing index.html...`)
}
);

module.exports = htmlRoute;