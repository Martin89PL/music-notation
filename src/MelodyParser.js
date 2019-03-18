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
            const strategy = InputParser.checkStrategy(line);
            switch(strategy[0]) {
                // define have to before play - save memory
                case 'play':
                    InputParser.parseLine(line).map(parsedNote => {
                        if(parsedNote.length === 1) {
                            this.melodyQueue.enqueuePause(durations[parsedNote[0]])
                        } else {
                            this.melodyQueue.enqueueTone(durations[parsedNote[1]], [note(parsedNote[0])]);
                        }

                    });
                    continue;            
            }
        }

        return this.melodyQueue;
    }

    melodyParserStrategy() {

    }
}

module.exports = MelodyParser;