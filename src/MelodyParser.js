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

    defines() {
        // define mel01 is pause(HT) | note(E5, E)
        // play repeat 3 times mel01 -> array below! when 3 times, every element repeat 3 times!
        // parsed: note(F4, Q) | repeat 2 times note(D4, Q)
        // [ { type: 'note', repeat: 0, notation: [ [Array], [Array] ] },
        //   { type: 'note', repeat: 2, notation: [ [Array], [Array] ] } ]
        return true;
    }

    play() {
        this.melodyNotation
        .filter(line => {
            return InputParser.checkStrategy(line)[0] === KeyWords.PLAY
        })
        .map(line => {
            InputParser.parseLine(line).map(parsed => this.melodyResolver.resolve(parsed))
        });    
        
        return this.melodyResolver.getMelodyQueue();
    }

    melodyParserStrategy() {

    }
}

module.exports = MelodyParser;