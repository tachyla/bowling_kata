module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push({frameNumber: i, first_roll: null, second_roll: null});
        }
        this.currentFrame = 0;
    }

    recordThrow = (pinValue) => { 
        let frame = this._frames[this.currentFrame];
        let previousFrame = this.currentFrame === 0 ? null : this._frames[this.currentFrame - 1];

        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid throws are 0 - 10");
        }
        
        if(!frame.first_roll){
            frame.first_roll = pinValue;
            if(frame.first_roll === 10){
                frame.frameTotal = frame.first_roll;
                this.currentFrame++;
                return;
            }
            this.addSpareBonus(previousFrame, pinValue);
            return;
        }

        let frameTotal = frame.first_roll + pinValue;
        if(frameTotal > 10 ){
            throw new Error("Invalid throw combination");
        }
        
        frame.second_roll = pinValue;

        frame.frameTotalValue = this.calculateFrameScore(frame);
        this.currentFrame++;
    }  

    calculateFrameScore = (frame) => {
        return frame.first_roll + frame.second_roll;
    }

    addSpareBonus(previousFrame, pinValue) {
        if(previousFrame && previousFrame.frameTotalValue === 10){
            previousFrame.frameTotalValue = previousFrame.frameTotalValue + this._frames[this.currentFrame].first_roll;
        }
    }

    get frames(){
        return [...this._frames];
    }
}

