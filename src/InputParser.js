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
        let parsed = line.split('|').map(note => note.trim());
        let notesLine = [];
        for(let parse of parsed) {
            let result = parse.match(/repeat/g);
            if(result != null && result[0] === 'repeat') {
                // parse repeat strategy
                console.log(InputParser.repeat(parse));
                console.log(InputParser.parseNoteNotation(parse));
            }
            notesLine.push(parse);
        }

        return notesLine;
    }
    /**
     * 
     * @param {string} note 
     */
    static parseNoteNotation(note) {
        let values = note.match(/\((.*?)\)/g)[0].replace('(', '').replace(')', '');
        return values.split(',').map(value => value.trim());
    }
    
    /**
     * @param {string} line 
     */
    static repeat(line) {
        return line.split(' ', 3);
    }
}

module.exports = InputParser;