const BowlingGame = require('../src/bowling_kata');
describe('tests bowling game', () => {

    it('returns object holding game scores', () => {
        const testBowlingGame = new BowlingGame();

       let player_scores = testBowlingGame.playerScores;

       expect(player_scores).toStrictEqual({
            p1: [], 
            p2: []
        });
    });
    it('9 miss frame adds 9 points to players score', () => {
        const testBowlingGame = new BowlingGame();

        testBowlingGame.addToScore(9);
        let player_scores = testBowlingGame.playerScores;

        expect(player_scores).toEqual({
            p1: [9],
            p2: []
        });
    });
});