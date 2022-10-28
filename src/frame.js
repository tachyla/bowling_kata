const Game = require('./bowlingGame');
module.exports = class Frame{
    constructor(frameNumber){
        this.frameNumber = frameNumber ? frameNumber : 0;
        this.first_roll = null;
        this.second_roll = null;
    }

    isComplete() {
        return this.isStrike() 
            || this.first_roll != null && this.second_roll != null; 
    }

    isStrike() {
        return this.first_roll == 10;
    }

    isSpare() {
        return !this.isStrike()
        && this.first_roll + this.second_roll == 10;
    }

    recordRoll(pinValue) {
        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid rolls are 0 - 10");
        }
        
        if(this.isStrike()) {
            throw new Error("Cannot record a second roll after a strike");
        }

        if(this.first_roll + pinValue > 10 ) {
            throw new Error("Invalid roll combination");
        }
        
        if(this.first_roll == null){ 
            this.first_roll = pinValue;
        }
        else {
            this.second_roll = pinValue;
        }
    }
}
