module.exports = class Game {

    constructor(){
        this._scores = [];
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

