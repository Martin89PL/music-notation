const InputParser = require('../src/InputParser');

describe('testParser', () => {
    
   
    test('parser input string to array', () => {

        const input = `play note(G4, Q) | note(E4, Q) | note(E4, Q)
                   play note(F4, Q) | repeat 2 times note(D4, Q)
                   play note(C4, E) | note(E4, E) | note(G4, E)`;


        const expected = InputParser.parse(input);

   
        expect(expected).toHaveLength(3);
        expect(Array.isArray(expected)).toBe(true);
    });

    test('test should return main strategy for line', () => {
        const input = 'play note(G4, Q) | note(E4, Q) | note(E4, Q)';
        const input2 = 'define noteA is pause(HT) | note(C4, E)';

        const expected = InputParser.checkStrategy(input);
        const expected2 = InputParser.checkStrategy(input2);

        expect(expected[0]).toBe('play');
        expect(expected2[0]).toBe('define');
    });

    test('test should remove first word from line', () => {
        const input = 'play note(G4, Q) | note(E4, Q) | note(E4, Q)';
        const expected = InputParser.removeStrategyName(input, 'play');
        expect(expected).toBe('note(G4, Q) | note(E4, Q) | note(E4, Q)');
    });

    test('test should create array with 3 note', () => {
        const input = 'note(G4, Q) | note(E4, Q) | note(E4, Q)';
        const expected = InputParser.parseLine(input);
        expect(Array.isArray(expected)).toBe(true);
        expect(expected.length).toBe(3);
    });

    test('test should parse define strategy and parse it', () => {
        const input = 'define mel01 is pause(HT) | note(E5, E)';
        const strategy = InputParser.checkStrategy(input);
        expect(strategy[0]).toBe('define');
        const line = InputParser.removeStrategyName(input, strategy[0]);
        expect(line).toBe('mel01 is pause(HT) | note(E5, E)');
        const define = InputParser.define(line);
        expect(define[0]).toBe('mel01');
        const parsed = InputParser.parseLine(line);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBe(2);
    });

    test('test should return array when input line has pause', () => {
        const input = 'pause(HT) | note(A3, E)';
        const expected = InputParser.parseLine(input);
        expect(expected).toEqual([{notation: [["HT"]], type: "pause", repeat: 0}, {notation: [["A3"], ["E"]], type: "note", repeat: 0}])
    });

    test('recognize note notation 3 tones to play in the same time', () => {
        const input = 'note(C4;E4;G4, E)';
        const expected = InputParser.parseNoteNotation(input);
        expect(expected).toEqual({notation: [["C4", "E4", "G4"], ["E"]], type: "note", repeat: 0});
    });

    test('recognize note notation 1 tones', () => {
        const input = 'note(C4, E)';
        const expected = InputParser.parseNoteNotation(input);
        expect(expected).toEqual({ notation: [['C4'], ['E']], type: "note", repeat: 0});
    });

    test('recognize note notation 1 pause', () => {
        const input = 'pause(HT)';
        const expected = InputParser.parseNoteNotation(input);
        expect(expected).toEqual({notation: [["HT"]], type: "pause", repeat: 0});
    });

    test('recognize note notation with repeat', () => {
        const input = 'repeat 2 times note(D4, Q)';
        const expected = InputParser.parseNoteNotation(input);
        expect(expected).toEqual({ notation: [['D4'], ['Q']], type: "note", repeat: 2});
    });
  });
  