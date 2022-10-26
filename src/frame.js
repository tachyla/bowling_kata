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
        return this.first_roll + this.second_roll; 
    }

    isSpare() {
        this.score = this.calculateFrameScore();
        return this.score == 10;
    }
}