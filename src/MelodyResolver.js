const durations = require('../src/durations.js');
const note = require('../src/note.js');

class MelodyResolver {
    constructor(melodyQueue) {
        this.melodyQueue = melodyQueue;
    }
    /**
     * Set parsed line
     * @param {array} noteNotationLine 
     */
    resolve(noteLine) {
        // @TODO get strategy by key word: repeat, pause, melody
        this.melodyQueue.enqueueTone(durations[noteLine[0][1]], [note(noteLine[0][0])]);
    }

    getMelodyQueue() {
        return this.melodyQueue;
    }
}

module.exports = MelodyResolver;