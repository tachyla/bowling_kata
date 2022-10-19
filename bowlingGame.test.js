
const Game = require('./src/bowlingGame');

describe('bowling game', () => {

    it('adds 1 point value from player throw', () => {
        const testGame = new Game();
        let result = testGame.recordThrow('player1', 1);

        expect(result).toEqual(1);
    });

    it('adds 9 points value from player throw', () => {
        const testGame = new Game();
        let result = testGame.recordThrow('player1', 9);

        expect(result).toEqual(9);
    });
})