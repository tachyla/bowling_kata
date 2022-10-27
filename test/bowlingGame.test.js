const Game = require('../src/bowlingGame');
const Frame = require('../src/frame');

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
        
        expect(testGame._frames[0].score).toEqual(2);
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
        expect(testGame._frames[1].first_roll).toEqual(8);
    });

    it('records bonus strike points and adds the value of the next two rolls', () =>{
        const testGame = new Game();
        testGame.recordRoll(10);
        testGame.recordRoll(1);
        testGame.recordRoll(7);

        expect(testGame._frames[0].score).toEqual(18);
    }); 
});

describe('frame', () => {
    it('defaults frameNumber to 0', () => {
        const testFrame = new Frame();
        expect(testFrame.frameNumber).toEqual(0);
    });

    it('defaults score to null', () => {
        const testFrame = new Frame();
        expect(testFrame.score).toEqual(null);
    });

    describe("is Complete", () => {
        it('returns true when first & second roll are not null', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 1;
            testFrame.second_roll = 1;
            expect(testFrame.isComplete()).toEqual(true);
        });

        it('returns false when no rolls have been made', () => {
            const testFrame = new Frame();
            expect(testFrame.isComplete()).toEqual(false);
        });

        it('returns true when a strike is rolled', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 10;
            expect(testFrame.isComplete()).toEqual(true);
        });
    
    });

    describe('is Strike', () => {
        it('returns true when the first roll is 10', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 10;
            expect(testFrame.isStrike()).toEqual(true);
        });

        it('returns false when the first roll is not 10', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 6;
            expect(testFrame.isStrike()).toEqual(false);
        });
    });

    describe('is Spare', () => {
        it('returns true when the score is 10', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 8;
            testFrame.second_roll = 2;
            expect(testFrame.isSpare()).toEqual(true);
        });
  
        it('returns false when the score is not 10', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 6;
            testFrame.second_roll = 1;
            expect(testFrame.isSpare()).toEqual(false);
        });

        it('returns false when a strike has been rolled', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 10;
            let result = testFrame.isSpare();
            expect(result).toEqual(false);
        });

        it('returns false when single roll is not a strike', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 8;
            let result = testFrame.isSpare();
            expect(result).toEqual(false);
        });
    });

    describe("calculate Score", () => {
        it('returns score when frame is complete', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 0;
            testFrame.second_roll = 6;
            expect(testFrame.calculateFrameScore()).toEqual(6);
        });
  
        it('does not calculate score when frame is incomplete', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 7;
            expect(testFrame.calculateFrameScore()).toEqual(null);
        });
    });

});