const InputParser = require('../src/InputParser');
const Define = require('../src/Define');
const MelodyResolver = require('../src/MelodyResolver');
const MelodyQueue = require('../src/MelodyQueue');
const durations = require('../src/durations.js');
const note = require('../src/note.js');

jest.mock('../src/MelodyQueue'); 

describe('testMelodyResolver', () => {

    beforeEach(() => {
        MelodyQueue.mockClear();
    });

    test('test add queue simple notation', () => {
        expect(MelodyQueue).not.toHaveBeenCalled();
        const input = [['C4'], ['E']];
        const melodyResolver = new MelodyResolver(new MelodyQueue());
        expect(MelodyQueue).toHaveBeenCalledTimes(1);

        melodyResolver.resolve(input);

        const mockMelodyQueueEnqueueTone = MelodyQueue.mock.instances[0];
        const mockEnqueueTone = mockMelodyQueueEnqueueTone.enqueueTone;

        expect(mockEnqueueTone.mock.calls[0][0]).toBe(durations.E);
        expect(mockEnqueueTone.mock.calls[0][1][0]).toBe(note('C4'));
    });

    test('test add queue notation with pause', () => {
        expect(MelodyQueue).not.toHaveBeenCalled();
        // z [[['HT']],[['A3'],['E']]]; wybieramy tylko pauze
        // @TODO zmienić notacje na [pause: ['HT']] [note: ['A3'],['E']]
        const input = [[['HT']]];
        const melodyResolver = new MelodyResolver(new MelodyQueue());
        expect(MelodyQueue).toHaveBeenCalledTimes(1);
        melodyResolver.resolve(input);

        const mockMelodyQueueEnqueueTone = MelodyQueue.mock.instances[0];
        const mockEnqueuePause = mockMelodyQueueEnqueueTone.enqueuePause;

        expect(mockEnqueuePause.mock.calls[0][0]).toBe(durations.HT);
    });

    test('test add queue notation for two tones in same time', () => {
        // melody.enqueueTone(durations.H, [note('A4'), note('C4')]);
        
    });
});       