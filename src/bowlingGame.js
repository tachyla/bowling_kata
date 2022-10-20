module.exports = class Game {

    constructor(){
        this._scores = [];
    }
    
    executeFrame = (rollValues) => {
        if(rollValues.length > 2){
            throw new Error("Only two rolls are allowed per frame");
        }

        rollValues.forEach(this.recordThrow);
        let totalFrameValue  =  rollValues[0] + rollValues[1];

        if(totalFrameValue > 10){
            throw new RangeError("Total frame points cannot exceed 10");
        }

        return totalFrameValue;
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

