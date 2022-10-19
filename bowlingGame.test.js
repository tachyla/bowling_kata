
const Game = require('./src/bowlingGame');

describe('bowling game', () => {

    it("adds point value from player throw", () => {
        const testGame = new Game();
        let result = testGame.recordThrow("player1", 1);

        expect(result).toEqual(1);
    });
})