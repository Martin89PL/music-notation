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

    test('test return parsed array when input line has repeat', () => {
        const input = 'note(F4, Q) | repeat 2 times note(D4, Q)';
        const expected = InputParser.parseLine(input);

        console.log(expected);

        expect(Array.isArray(expected)).toBe(true);
        expect(expected.length).toBe(3);
    });

    test('test should return value in note notation', () => {
        const input = 'note(G4, Q)';
        const expected = InputParser.parseNoteNotation(input);
        expect(Array.isArray(expected)).toBe(true);
    });

  });