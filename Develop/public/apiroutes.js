const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

//* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
fb.get('/', (req, res) =>
    readFromFile('challenges/NoteTaker/Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
);

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// POST Route for submitting feedback
fb.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newSavedNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newSavedNote, 'challenges/NoteTaker/Develop/db/db.json');
  
      const response = {
        status: 'success',
        body: newSavedNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in saving note');
    }
  });
  
  module.exports = fb;

