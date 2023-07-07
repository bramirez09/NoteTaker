const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');


//const api = require('challenges/NoteTaker/Develop/public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)
// POST Route for submitting feedback
app.post('/api/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newSavedNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newSavedNote, './db/db.json');

        const response = {
            status: 'success',
            body: newSavedNote,
        };

        res.json(response);
    } else {
        res.json('Error in saving note');
    }
});

//* `GET *` should return the `index.html` file.
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

//* `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

//  DELETE Route for a note
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((app) => app.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);