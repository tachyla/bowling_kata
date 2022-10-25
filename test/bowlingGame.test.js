const Game = require('../src/bowlingGame');

describe('bowling game', () => {

    it('adds 1 point value from player throw', () => {
        const testGame = new Game();
        testGame.recordThrow(1);
        expect(testGame.frames[0].first_roll).toEqual(1);
    });

    it('throws error when outside the valid range of a throw', () => {
        const testGame = new Game();

        expect(() => {
            testGame.recordThrow(-1)
        }).toThrow(RangeError);

    });

    it('records two throws per one frame', () => {
        const testGame = new Game();
        testGame.recordThrow(5);
        testGame.recordThrow(4);
        expect(testGame.frames[0]).toEqual({
            frameNumber: 0,
            first_roll: 5,
            second_roll: 4,
            frameTotalValue: 9
        });
    });

    it('returns total points of one frame', () => {
        const testGame = new Game();
        testGame.recordThrow(2);
        testGame.recordThrow(0);
        expect(testGame.frames[0].frameTotalValue).toEqual(2);
    });

    it('throws error for invalid throw combinations', () => {
        const testGame = new Game();
        testGame.recordThrow(5);
        
        expect(() => {
            testGame.recordThrow(6)}).toThrow(Error("Invalid throw combination"));
    });

    it('has 10 frames for a new game', () => {
        const testGame = new Game();
        expect(testGame.frames.length).toEqual(10);
    });

    it('records the first throw in the first frame', () => {
        const testGame = new Game();
        testGame.recordThrow(5);
        expect(testGame.frames[0]).toEqual({frameNumber: 0, 
            first_roll: 5, second_roll: null, 
            frameTotalValue: null 
        });
    });

    it('records a third throw in the next frame', () => {
        const testGame = new Game();
        testGame.recordThrow(2);
        testGame.recordThrow(0);
        testGame.recordThrow(8);
        expect(testGame.frames[1]).toEqual({
            frameNumber: 1, first_roll: 8, 
            second_roll: null, 
            frameTotalValue: null
        });
    });

    it('records bonus points when a spare was achieved in a frame', () => {
        const testGame = new Game();
        testGame.recordThrow(4);
        testGame.recordThrow(6);
        testGame.recordThrow(5);
        expect(testGame.frames[0].frameTotalValue).toEqual(15);
    });

    it("records score for game of all 0's", () => {
        const testGame = new Game();
        for(let i = 0; i < 20; i++){
            testGame.recordThrow(0);
        }

        expect(testGame.getScore()).toEqual(0);
    });
    
});