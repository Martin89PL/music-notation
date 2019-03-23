const MelodyQueue = require('./MelodyQueue');
const InputParser = require('./InputParser');
const durations = require('./durations.js');
const note = require('./note.js');
const MelodyResolver = require('./MelodyResolver');
const KeyWords = require('./KeyWords');

class MelodyParser {
    /**
     * Array of lines with string melody
     * @param {array} melodyNotation 
     * @param {MelodyQueue} melodyQueue
     */
    constructor(melodyNotation, melodyQueue) {
        this.melodyNotation = InputParser.parse(melodyNotation);
        this.melodyResolver = new MelodyResolver(melodyQueue);
        this.defines = [];
    }

    play() {

        this.melodyNotation
        .filter(line => {
            return InputParser.checkStrategy(line)[0] === KeyWords.PLAY
        })
        .map(line => {
            this.melodyResolver.resolve(InputParser.parseLine(line))
        });    
        
        return this.melodyResolver.getMelodyQueue();
    }

    melodyParserStrategy() {

    }
}

module.exports = MelodyParser;