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
            if(frame.isStrike()){
                this.currentFrameIndex++;

                if(!previousFrame){
                    return;
                }
                return this.calculateFrameScore(previousFrame);
            }
            if(!previousFrame){
                return;
            }
            return this.calculateFrameScore(previousFrame);
        }

        if(frame.first_roll + pinValue > 10 )throw new Error("Invalid roll combination");
        frame.second_roll = pinValue;
        this.calculateFrameScore(frame);

        this.currentFrameIndex++;
    }   

    isStrike(frame) {
           return frame.first_roll == 10;
    }

    calculateFrameScore(frame) {
        if(!frame.isComplete()) return "Cannot calculate frame score until after a second roll";

        if(frame.isRegular()){
            return frame.score = frame.first_roll + frame.second_roll;
        }

        if(frame.isSpare()){
            return this.addSpareBonus(frame);
        }
    }

    addSpareBonus(previousFrame) {
       previousFrame.score = previousFrame.first_roll + previousFrame.second_roll + this._frames[this.currentFrameIndex].first_roll;
    }

    addStrikeBonus(previousFrame) {
        let previousFrameScore = previousFrame.score;
        let firstBonusRoll = this._frames[this.currentFrameIndex].first_roll;
        let secondBonusRoll = this._frames[this.currentFrameIndex].second_roll;

        if (previousFrame && previousFrame.isStrike()) {
            
            previousFrame.score += this._frames[this.currentFrameIndex].second_roll;
        }
    }

    get frames(){
        return [...this._frames];
    }
}
