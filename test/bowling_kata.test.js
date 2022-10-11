const BowlingGame = require('../src/bowling_kata');
describe('tests bowling game', () => {
    it('returns game score', () => {
        const testBowlingGame = new BowlingGame();
        result = testBowlingGame.getScore();

        expect(result).toBe('0 - 0');
    });

    it('returns object holding game scores', () => {
        const testBowlingGame = new BowlingGame();

       let player_scores = testBowlingGame.playerScores;

       expect(player_scores).toStrictEqual({
        p1: [], 
        p2: []
    });

        
    });
});