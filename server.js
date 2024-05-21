const express = require('express');
// Adding our different Route files for managing our application
const api = require('./routes/apiRoutes');
const html = require('./routes/htmlRoutes');

// Setting up our port to either be the process environments port or to use 3001
const PORT = process.env.PORT || 3001;

const app = express();
// Using express as our middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Letting the app use for our api calls and html calls
app.use('/api', api);
app.use('/', html);


// Was added for testing on local machine
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
