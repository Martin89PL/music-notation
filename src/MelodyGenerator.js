const MelodyQueue = require('./MelodyQueue.js');
const note = require('./note.js');
const MelodyParser = require('./MelodyParser');

class MelodyGenerator
{
    fromString(melodyString) {
        const parser = new MelodyParser(melodyString, new MelodyQueue());
        return parser.play();
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }
}

module.exports = new MelodyGenerator();
