const router = require('express').Router();
const notepad = require('./notepad');
router.get('/notes' , (req, res) => {
    notepad
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    }) .catch((err) => res.status(400).json(err));
});
router.post('/notes', (req, res) => {
    notepad
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;