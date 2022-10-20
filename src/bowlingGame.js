module.exports = class Game {

    constructor(){
        this._scores = [];
    }
    
    executeFrame = (rollValues) => {
        if(rollValues.length > 2){
            throw new Error("Only two rolls are allowed per frame");
        }

        else{
            this.recordThrow(rollValues[0]);
            this.recordThrow(rollValues[1]);
        }
    }

    recordThrow = (pinValue) => {    
        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid rolls are 0 - 10");
        }  
 
        this._scores.push(pinValue);
    }

    get scores(){
        return [...this._scores];
    }

}

