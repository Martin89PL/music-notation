class InputParser {
    static parse(input) {
        return input.split("\n").filter(line => line.length > 0);
    }
    /**
     * @param {string} line 
     */
    static checkStrategy(line) {
        return line.match(/play|define/g);
    }
    /**
     * 
     * @param {string} line 
     */
    static removeStrategyName(line, strategy) {
        return line.replace(strategy, '').trim();
    }

    /**
     * @param {string} line 
     */
    static parseLine(line) {
        
        line = InputParser.removeStrategyName(line);
        return line.split('|')
                .map(note => note.trim())
                .map(note => InputParser.parseNoteNotation(note));
    }

    /**
     * 
     * @param {string} note 
     */
    static parseNoteNotation(note) {
        let values = note.match(/\((.*?)\)/g)[0].replace('(', '').replace(')', '');
        
        return values.split(',')
                .map(note => note.trim())
                .map(note => note.split(';'))
    }
    
    /**
     * How many times repeat
     * @param {string} line 
     */
    static repeat(line) {
        return line.split(' ', 5);
    }
    /**
     * Return function name
     * @param {string} line 
     */
    static define(line) {
        return line.split(' ', 1);
    }
}

module.exports = InputParser;