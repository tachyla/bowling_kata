const BowlingGame = require('../src/bowling_kata');
describe('tests bowling game', () => {
    it('returns true', () => {
        const testBowlingGame = new BowlingGame();
        result = testBowlingGame.getScore();

        expect(result).toBe('0 - 0');
    });
});