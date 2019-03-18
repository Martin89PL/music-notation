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
        let parsed = line.split('|').map(note => note.trim());
        let notesLine = [];

        for(let parse of parsed) {
            let result = parse.match(/repeat/g);
            if(result != null && result[0] === 'repeat') {
                let howMany = InputParser.repeat(parse);
                for(let i = 0; i < howMany; i++) {
                    notesLine.push(InputParser.parseNoteNotation(parse));
                }
                continue;
            }
            notesLine.push(InputParser.parseNoteNotation(parse));
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
     * How many times
     * @param {string} line 
     */
    static repeat(line) {
        let result =  line.split(' ', 3);
        return result[1];
    }
}

module.exports = InputParser;