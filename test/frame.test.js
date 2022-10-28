
const Game = require('../src/bowlingGame');
const Frame = require('../src/frame');

describe('frame', () => {
    it('defaults frameNumber to 0', () => {
        const testFrame = new Frame();
        expect(testFrame.frameNumber).toEqual(0);
    });

    describe("record roll", () => {
        it("records a single roll in the first_roll property", () => {
            const testFrame = new Frame();
            testFrame.recordRoll(1);

            expect(testFrame.first_roll).toEqual(1);
        })

        it("records a second roll in the second_roll property", () => {
            const testFrame = new Frame();
            testFrame.recordRoll(1);
            testFrame.recordRoll(2);

            expect(testFrame.second_roll).toEqual(2);
        })

        it('throws error when outside the valid range of a roll', () => {
            const testFrame = new Frame();
    
            expect(() => {
                testFrame.recordRoll(-1)
            }).toThrow(RangeError);
    
        });

        it("throws an error if a second roll is made when the first is a strike", () => {
            const testFrame = new Frame();
            testFrame.recordRoll(10);
            
            expect(() => {
                testFrame.recordRoll(1);
            }).toThrow(Error);
        })

        it("throws an error if a second roll will exceed the maximum pins for the frame", () => {
            const testFrame = new Frame();
            testFrame.recordRoll(5);
            
            expect(() => {
                testFrame.recordRoll(6);
            }).toThrow(Error);
        });

        it('records a second roll even if the first roll is zero', () => {
            const testFrame = new Frame();
            testFrame.recordRoll(0);
            testFrame.recordRoll(10);

            expect(testFrame.first_roll).toEqual(0);
            expect(testFrame.second_roll).toEqual(10);
        });
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

        it('returns true when both roll are zero', () => {
            const testFrame = new Frame();
            testFrame.first_roll = 0;
            testFrame.second_roll = 0;

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

});