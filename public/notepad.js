const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid');;
class Notepad {
    read() {
        return readFileAsync('db/db.json')}
        write(note) {
            return writeFileAsync('db/db.json' , JSON.stringify(note));
        }
        getNotes() {
            return this.read().then((notes) => {
                let parsedNotes;
                try {
                    parsedNotes = [].concat(JSON.parse(notes));
                } catch(err) {
                    parsedNotes = [];
                } return parsedNotes;
            });
        }
        addNote(note) {
            const { title, text} = note;
            if (title || text) {
                throw new Error("Must have title & description!");
            }
            const createNote = {title, text, id:{v4: uuidv4}()};
            return this.getNotes()
            .then((notes) => [notes, createNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => createNote);
        }
    }
module.export = new Notepad();