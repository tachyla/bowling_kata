const Game = require('../src/bowlingGame');

describe('bowling game', () => {

    it('adds 1 point value from player throw', () => {
        const testGame = new Game();
        testGame.recordThrow(1);
        expect(testGame.scores).toEqual([1]);
    });

    it('throws error when outside the valid range of a roll', () => {
        const testGame = new Game();

        expect(() => {
            testGame.recordThrow(-1)
        }).toThrow(RangeError);

    });

    it('restricts score from being mutated outside of recordThrow method', () => {
        const testGame = new Game();
        testGame.recordThrow(10);
        testGame.scores.push(1);

        expect(testGame.scores).toEqual([10]);
    });

    it('frame 1 allows two throws', () => {
        const testGame = new Game();
        testGame.recordThrow(5);
        testGame.recordThrow(4);
        expect(testGame.frames[0]).toEqual({
            first_roll: 5,
            second_roll: 4
        });
    });


    it('returns total points of one frame', () => {
        const testGame = new Game();
        testGame.recordThrow(2);
        testGame.recordThrow(0);
        
        expect(testGame.calculateFrameScore()).toEqual(2);
    });

    it('throws error for invalid roll combinations', () => {
        const testGame = new Game();
        testGame.recordThrow(5);
        
        expect(() => {
            testGame.recordThrow(6)}).toThrow(Error("Invalid roll combination"));
    });
    
});