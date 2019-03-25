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
     * 
     */
    static parseLine(line) {
        return InputParser.removeStrategyName(line).split('|').map(note => note.trim()).map(note => InputParser.parseNoteNotation(note));   
    }

    /**
     * 
     * @param {string} note 
     */
    static parseNoteNotation(note) {
        let values = note.match(/\((.*?)\)/g)[0].replace('(', '').replace(')', '');
        
        let notationType = note.match(/note|pause/g)[0];

        let repeatNumber = (note.match(/repeat/g)) ? parseInt(note.split(' ')[1]) : 0
        
        let result = values.split(',')
                .map(note => note.trim())
                .map(note => note.split(';'))
        // @TODO Literal object to class!
        return {
            type: notationType, 
            repeat: repeatNumber,
            notation: result
        };    
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