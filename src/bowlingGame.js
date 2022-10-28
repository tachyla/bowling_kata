const Frame = require('./frame');
module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push(new Frame(i));
        }
        this.currentFrameIndex = 0;
    }

    get frames(){
        return [...this._frames];
    }

    recordRoll(pinValue) { 
        let frame = this._frames[this.currentFrameIndex];
        
        frame.recordRoll(pinValue);

        if (frame.isComplete()) {
            this.currentFrameIndex++;
        }
    }

    calculateFrameScore(frame) {
        if(!frame.isComplete()) return null;

        if(frame.isSpare()){
            return this.calculateSpareScore(frame);
        }

        if(frame.isStrike()){
           return this.calculateStrikeScore(frame);
        }
        
        return frame.first_roll + frame.second_roll;
    }

    calculateStrikeScore(frame){
        let nextRoll = this.getNextRoll(frame);
        let subsequentRoll = this.getSubsequentRoll(frame);

        if (nextRoll == null || subsequentRoll == null) {
            return null;
        }

        return frame.first_roll + this.getNextRoll(frame) + this.getSubsequentRoll(frame);
    }

    calculateSpareScore(frame){
        let nextRoll = this.getNextRoll(frame);
        if (nextRoll == null) {
            return null;
        }

        return frame.first_roll + frame.second_roll + nextRoll;
    } 

    getNextRoll(frame) {
        let nextFrame = this.frames[frame.frameNumber + 1];
        return nextFrame.first_roll;
    }

    getSubsequentRoll(frame) {
        let nextFrame = this.frames[frame.frameNumber + 1];
        if(nextFrame.isStrike()) {
            let subsequentFrame = this.frames[frame.frameNumber + 2]
            return subsequentFrame.first_roll;   
        }
        return nextFrame.second_roll;
    }
}
