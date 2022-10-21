module.exports = class Game {

    constructor(){
        this._scores = [];
        this._frames = [];
    }

    recordThrow = (pinValue) => {  
        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid rolls are 0 - 10");
        }

        this._frames.push({first_roll: "", second_roll: ""}); 

        this._scores.push(pinValue);
        
        if(!this._frames[0].first_roll){
            this._frames[0].first_roll = pinValue;
            return;
        }
        
        this._frames[0].second_roll = pinValue;
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

