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

    it('restricts recordThrow to be called two times maximum per frame', () => {
        const testGame = new Game();

        expect(() => {
            testGame.executeFrame([5, 4, 1])
            }).toThrow(new Error("Only two rolls are allowed per frame"));
    });

    it('bowler tries two rolls in a frame', () => {
        const testGame = new Game();
        testGame.executeFrame([5,5]);
        expect(testGame.scores).toEqual([5, 5]);
    });  

    it('restricts invalid roll combinations', () => {
        const testGame = new Game();
        expect(() => {
            testGame.executeFrame([5, 6])
        }).toThrow(RangeError("Total frame points cannot exceed 10"));

    });

    it('returns total points of one frame', () => {
        const testGame = new Game();
        expect(testGame.executeFrame([5, 0])).toEqual(5);
    });


});