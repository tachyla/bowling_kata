const Game = require('../src/bowlingGame');

describe('bowling game', () => {

    it('adds 1 point value from player roll', () => {
        const testGame = new Game();
        testGame.recordRoll(1);
        expect(testGame.frames[0].first_roll).toEqual(1);
    });

    it('throws error when outside the valid range of a roll', () => {
        const testGame = new Game();

        expect(() => {
            testGame.recordRoll(-1)
        }).toThrow(RangeError);

    });

    it('records two rolls per one frame', () => {
        const testGame = new Game();
        testGame.recordRoll(5);
        testGame.recordRoll(4);
        expect(testGame.frames[0]).toEqual({
            frameNumber: 0,
            first_roll: 5,
            second_roll: 4,
            score: 9
        });
    });

    it('returns total points of one frame', () => {
        const testGame = new Game();
        testGame.recordRoll(2);
        testGame.recordRoll(0);
        
        expect(testGame.frames[0].score).toEqual(2);
    });

    it('throws error for invalid roll combinations', () => {
        const testGame = new Game();
        testGame.recordRoll(5);
        
        expect(() => {
            testGame.recordRoll(6)}).toThrow(Error("Invalid roll combination"));
    });

    it('has 10 frames for a new game', () => {
        const testGame = new Game();
        expect(testGame.frames.length).toEqual(10);
    });

    it('records the first roll in the first frame', () => {
        const testGame = new Game();
        testGame.recordRoll(5);
        expect(testGame.frames[0]).toEqual({frameNumber: 0, first_roll: 5, second_roll: null, score: null});
    });

    it('records a third roll in the next frame', () => {
        const testGame = new Game();
        testGame.recordRoll(2);
        testGame.recordRoll(0);
        testGame.recordRoll(8);
        expect(testGame.frames[1]).toEqual({frameNumber: 1, first_roll: 8, second_roll: null, score: null});
    });  

    it('records bonus points when a spare was achieved in a frame', () => {
        const testGame = new Game();
        testGame.recordRoll(4);
        testGame.recordRoll(6);
        testGame.recordRoll(5);
        expect(testGame.frames[0].score).toEqual(15);
    });

    it('rolling a strike on the first roll advances to the next frame', () => {
        const testGame = new Game();
        testGame.recordRoll(10);
        testGame.recordRoll(8);
        expect(testGame.frames[1].first_roll).toEqual(8);
    });

    it('records bonus strike points and adds the value of the next two rolls', () =>{
        const testGame = new Game();
        testGame.recordRoll(10);
        testGame.recordRoll(1);
        testGame.recordRoll(7);

        expect(testGame._frames[0].score).toEqual(18);
    }); 

    it('records bonus strike points and the value of the next two strikes', () => {
        const testGame = new Game();
        testGame.recordRoll(10);
        testGame.recordRoll(10);
        testGame.recordRoll(10);

        expect(testGame._frames[0].score).toEqual(30);
    })
});

