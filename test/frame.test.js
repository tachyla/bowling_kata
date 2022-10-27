
const Frame = require('../src/frame');

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