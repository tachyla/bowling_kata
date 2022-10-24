module.exports = class Game {

    constructor(){
        this._scores = [];
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push({frameNumber: i, first_roll: null, second_roll: null});
        }
        this.currentFrame = 0;
    }

    recordThrow = (pinValue) => { 

        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid rolls are 0 - 10");
        }

        this._scores.push(pinValue);
        
        if(!this._frames[this.currentFrame].first_roll){
            this._frames[this.currentFrame].first_roll = pinValue;
            return;
        }

        let frameTotal = this._frames[this.currentFrame].first_roll + pinValue;

        if(frameTotal > 10 ){
            throw new Error("Invalid roll combination");
        }
        
        this._frames[this.currentFrame].second_roll = pinValue;
        this.currentFrame++;
    }  

    calculateFrameScore = () => {
        return this._frames[0].first_roll + this._frames[0].second_roll;
    }

    get frames(){
        return [...this._frames];
    }

    get scores(){
        return [...this._scores];
    }
}

