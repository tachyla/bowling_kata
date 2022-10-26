const Game = require('../src/bowlingGame');
const Frame = require('../src/frame');

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
        
        expect(testGame._frames[0].frameTotalValue).toEqual(2);
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
        expect(testGame.frames[0]).toEqual({frameNumber: 0, first_roll: 5, second_roll: null});
    });

    it('records a third throw in the next frame', () => {
        const testGame = new Game();
        testGame.recordThrow(2);
        testGame.recordThrow(0);
        testGame.recordThrow(8);
        expect(testGame.frames[1]).toEqual({frameNumber: 1, first_roll: 8, second_roll: null});
    });  

    it('records bonus points when a spare was achieved in a frame', () => {
        const testGame = new Game();
        testGame.recordThrow(4);
        testGame.recordThrow(6);
        testGame.recordThrow(5);
        expect(testGame.frames[0].frameTotalValue).toEqual(15);
    });

    it('throwing a strike on the first roll advances to the next frame', () => {
        const testGame = new Game();
        testGame.recordThrow(10);
        testGame.recordThrow(8);
        expect(testGame._frames[1].first_roll).toEqual(8);
    });

    it('records bonus strike points and adds the value of the next two throws', () =>{
        const testGame = new Game();
        testGame.recordThrow(10);
        testGame.recordThrow(1);
        testGame.recordThrow(7);

        expect(testGame._frames[0].frameTotalValue).toEqual(18);
    }); 
});

describe('frame', () => {
    it('frameNumber defaults to 0 ', () => {
        const testFrame = new Frame();
        expect(testFrame.frameNumber).toEqual(0);
    });

    it('frameTotalValue defaults to 0', () => {
        const testFrame = new Frame();
        expect(testFrame.score).toEqual(null);
    });

    it('is complete when first & second roll are not null', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 1;
        testFrame.second_roll = 1;
        expect(testFrame.isComplete()).toEqual(true);
    });

    it('is not complete when no rolls have been made', () => {
        const testFrame = new Frame();
        expect(testFrame.isComplete()).toEqual(false);
    });

    it('is a strike when the first roll is 10', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 10;
        expect(testFrame.isStrike()).toEqual(true);
    });

    it('is complete when a strike is rolled', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 10;
        expect(testFrame.isComplete()).toEqual(true);
    });

    it('is a spare when the score is 10', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 8;
        testFrame.second_roll = 2;
        expect(testFrame.isSpare()).toEqual(true);
    });

    it('score is calculated when frame is complete', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 0;
        testFrame.second_roll = 6;
        expect(testFrame.calculateFrameScore()).toEqual(6);
    });

    it('score is not calculated when frame is incomplete & not a strike', () => {
        const testFrame = new Frame();
        testFrame.first_roll = 7;
        expect(() => {
            testFrame.calculateFrameScore()
        }).toThrow(Error('A complete frame must be thrown to calculate frame score'))
    });
});