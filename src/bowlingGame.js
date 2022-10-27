const Frame = require('./frame');
module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push(new Frame(i));
        }
        this.currentFrameIndex = 0;
    }

    recordRoll = (pinValue) => { 
        let frame = this._frames[this.currentFrameIndex];
        let previousFrame = this.currentFrameIndex === 0 ? null : this._frames[this.currentFrameIndex - 1];

        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid rolls are 0 - 10");
        }
        
        if(!frame.first_roll){
            frame.first_roll = pinValue; 
            
            if(this.isStrike(frame)){
                frame.score = frame.first_roll;
                this.currentFrameIndex++;
                return;
            }
    
            this.addSpareBonus(previousFrame, pinValue);
            return;
        }

        let frameTotal = frame.first_roll + pinValue;

        if(frameTotal > 10 ){
            throw new Error("Invalid roll combination");
        }
        
        frame.second_roll = pinValue;

        this.addStrikeBonus(previousFrame);
        
        frame.score = this.calculateFrameScore(frame);
        this.currentFrameIndex++;
    }  

    isStrike(frame) {
           if(frame.first_roll == 10){
            return true;
           }
           return false;
    }

    calculateFrameScore = (frame) => {
        return frame.first_roll + frame.second_roll;
    }

    addStrikeBonus(previousFrame) {
        if (previousFrame && previousFrame.first_roll === 10) {
            previousFrame.score += this._frames[this.currentFrameIndex].second_roll;
        }
    }

    addSpareBonus(previousFrame) {
        if(previousFrame && previousFrame.score === 10){
            previousFrame.score += this._frames[this.currentFrameIndex].first_roll;
        }
    }

    get frames(){
        return [...this._frames];
    }
}
