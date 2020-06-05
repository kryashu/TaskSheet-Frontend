const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/task-sheet-symb'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join('index.html' + '/dist/task-sheet-symb/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);

