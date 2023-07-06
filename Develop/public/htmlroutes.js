const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

//* `GET *` should return the `index.html` file.
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'challenges/NoteTaker/Develop/public/index.html'))
);

//* `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'challenges/NoteTaker/Develop/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);