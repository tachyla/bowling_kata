module.exports = class Game {

    constructor(){
        this._scores = [];
    }
    
 
    recordThrow = (pinValue) => {    
        if(pinValue > 10){
            throw new RangeError("You can't roll more than 10");
        }  
           this._scores.push(pinValue);
    }

    get scores(){
        return [...this._scores];
    }

}

