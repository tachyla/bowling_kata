const Game = require('../src/bowlingGame');

describe('bowling game', () => {
    describe('record roll', () => {

        it('adds 1 point value from player roll', () => {
            const testGame = new Game();
            testGame.recordRoll(1);
            
            expect(testGame.frames[0].first_roll).toEqual(1);
        });

        it('has 10 frames for a new game', () => {
            const testGame = new Game();

            expect(testGame.frames.length).toEqual(10);
        });

        it('records a third roll in the next frame', () => {
            const testGame = new Game();
            testGame.recordRoll(2);
            testGame.recordRoll(0);
            testGame.recordRoll(8);

            expect(testGame.frames[1]).toEqual({frameNumber: 1, first_roll: 8, second_roll: null});
        });  

        it('rolling a strike on the first roll advances to the next frame', () => {
            const testGame = new Game();
            testGame.recordRoll(10);
            testGame.recordRoll(8);

            expect(testGame.frames[1].first_roll).toEqual(8);
        });
    });

    describe('calculate frame score', () => {
        it('returns null if the frame is not complete', () => {
            const testGame = new Game();

            let result = testGame.calculateFrameScore(testGame.frames[0]);
            
            expect(result).toEqual(null);
        });

        it('returns total points of one frame', () => {
            const testGame = new Game();
            testGame.recordRoll(2);
            testGame.recordRoll(0);

            let result = testGame.calculateFrameScore(testGame.frames[0]);

            expect(result).toEqual(2);
        });

        it('records bonus points when a spare was achieved in a frame', () => {
            const testGame = new Game();
            testGame.recordRoll(4);
            testGame.recordRoll(6);
            testGame.recordRoll(5);

            let result = testGame.calculateFrameScore(testGame.frames[0]);
            
            expect(result).toEqual(15);
        });

        it('records bonus strike points and adds the value of the next two rolls', () =>{
            const testGame = new Game();
            testGame.recordRoll(10);
            testGame.recordRoll(1);
            testGame.recordRoll(7);
    
            let result = testGame.calculateFrameScore(testGame.frames[0]);

            expect(result).toEqual(18);
        }); 
    
        it('records bonus strike points and the value of the next two strikes', () => {
            const testGame = new Game();
            testGame.recordRoll(10);
            testGame.recordRoll(10);
            testGame.recordRoll(10);

            let result = testGame.calculateFrameScore(testGame.frames[0]);
    
            expect(result).toEqual(30);
        });

        it('returns zero when both rolls are zero', () => {
            const testGame = new Game();
            testGame.recordRoll(0);
            testGame.recordRoll(0);

            let result = testGame.calculateFrameScore(testGame.frames[0]);
            
            expect(result).toEqual(0);
        });    
        
        it('returns null on a spare when the next roll has not yet been rolled', () => {
            const testGame = new Game();
            testGame.recordRoll(5);
            testGame.recordRoll(5);

            let result = testGame.calculateFrameScore(testGame.frames[0]);

            expect(result).toEqual(null);
        });

        it('returns null on a strike when the next roll has not been rolled', () => {
            const testGame = new Game();
            testGame.recordRoll(10);

            let result = testGame.calculateFrameScore(testGame.frames[0]);

            expect(result).toEqual(null);
        });

        it('returns null on a strike when the subsequence roll has not been rolled', () => {
            // setup
            const testGame = new Game();
            testGame.recordRoll(10);
            testGame.recordRoll(1);

            // exec
            let result = testGame.calculateFrameScore(testGame.frames[0]);

            // assert
            expect(result).toEqual(null);
        });
    });
});

