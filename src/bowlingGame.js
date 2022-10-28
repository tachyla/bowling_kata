const Frame = require('./frame');
module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push(new Frame(i));
        }
        this.currentFrameIndex = 0;
    }

    recordRoll(pinValue) { 
        let frame = this._frames[this.currentFrameIndex];
        
        frame.recordRoll(pinValue);

        if (frame.isComplete()) {
            this.currentFrameIndex++;
        }
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
