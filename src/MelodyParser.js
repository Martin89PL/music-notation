const MelodyQueue = require('./MelodyQueue');
const InputParser = require('./InputParser');
const durations = require('./durations.js');
const note = require('./note.js');

class MelodyParser {
    /**
     * Array of lines with string melody
     * @param {array} melodyNotation 
     * @param {MelodyQueue} melodyQueue
     */
    constructor(melodyNotation, melodyQueue) {
        this.melodyNotation = InputParser.parse(melodyNotation);
        this.melodyQueue = melodyQueue;
    }

    play() {

        for(let line of this.melodyNotation) {
            const playStrategy = InputParser.checkStrategy(line);
            switch(playStrategy[0]) {
                case 'play':
                    InputParser.parseLine(line).map(parsedNote => this.melodyQueue.enqueueTone(durations[parsedNote[1]], [note(parsedNote[0])]));
                    continue;
            }
        }

        return this.melodyQueue;
    }

    melodyParserStrategy() {

    }
}

module.exports = MelodyParser;