module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push({frameNumber: i, first_roll: null, second_roll: null, frameTotalValue: null});
        }
        this.currentFrame = 0;
    }

    recordThrow = (pinValue) => { 
        let frame = this._frames[this.currentFrame];
        
        let previousFrame = this.currentFrame === 0 ? null : this._frames[this.currentFrame - 1];

        if(this.currentFrame > 9){
            if(this._frames[9].frameTotalValue === 10){
                this._frames[9].frameTotalValue += pinValue;
                return;
            }
        }

        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid throws are 0 - 10");
        }
        
        if(frame.first_roll === null){
            frame.first_roll = pinValue;
            this.addSpareBonus(previousFrame, pinValue);
            return;
        }
    
        let frameTotal = frame.first_roll + pinValue;

        if(frameTotal > 10){
            throw new Error("Invalid throw combination");
        }
        frame.second_roll = pinValue;
        frame.frameTotalValue = this.calculateFrameScore(frame);
        this.currentFrame++;
    }  

    calculateFrameScore(frame) {
        let frameScore = frame.first_roll + frame.second_roll;
        return frameScore;
    }

    getScore() {
        let gameScore = 0;
        for(let i = 0; i < this._frames.length; i++){
            gameScore += this._frames[i].frameTotalValue;
        }
        return gameScore;
    }

    addSpareBonus(previousFrame, pinValue) {
        if (previousFrame && previousFrame.frameTotalValue == 10) {
            previousFrame.frameTotalValue = previousFrame.frameTotalValue + pinValue;
        }
    }

    get frames(){
        return [...this._frames];
    }
}

