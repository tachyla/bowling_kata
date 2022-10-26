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
        return this.first_roll == 10 ;
    }

    calculateFrameScore() {
        this.score = this.first_roll + this.second_roll;
    }

    isSpare() {
        this.calculateFrameScore();
        return this.score == 10;
    }
}