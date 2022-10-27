const Game = require('./bowlingGame');
module.exports = class Frame{
    constructor(frameNumber){
        this.frameNumber = frameNumber ? frameNumber : 0;
        this.first_roll = null;
        this.second_roll = null;
        this.score = null;
    }

    isComplete() {
        return this.isStrike() 
            || this.first_roll != null && this.second_roll != null; 
    }

    isStrike() {
        return this.first_roll == 10;
    }

    calculateFrameScore() {
        if(this.isComplete()){
            return this.first_roll + this.second_roll; 
        }
        return null;
    }

    isSpare() {
        return !this.isStrike()
        && this.first_roll + this.second_roll == 10;
    }

    scoreSpareFrame() {
        // isComplete?
        if(!this.isComplete){

            //does it have previous frame?
            if(hasPreviousFrame){
                return previousFrame.score + this.first_roll;
            }
            //else{do nothing}
        }
    }


}