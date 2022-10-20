const Game = require('../src/bowlingGame');

describe('bowling game', () => {

    it('adds 1 point value from player throw', () => {
        const testGame = new Game();
        testGame.recordThrow(1);
        expect(testGame.scores).toEqual([1]);
    });

    it("demo test", () => {
        const testGame = new Game();
        testGame.recordThrow(2);
        testGame.scores.push(3);
        expect(testGame.scores).toEqual([2]);

    });
    
    it('records throwing invalid throw', () => {
        const testGame = new Game();

        expect(() => {
            testGame.recordThrow(15)
        }).toThrow(RangeError);

    });

    xit('records throwing 1 frame with 2 tries', () => {})
    xit('records throwing gutter ball', () => {});
    xit('records throwing a spare', () => {})

});