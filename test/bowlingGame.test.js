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

});