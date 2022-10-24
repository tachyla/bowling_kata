module.exports = class Game {

    constructor(){
        this._frames = [];
        for(let i = 0; i < 10; i++){
            this._frames.push({frameNumber: i, first_roll: null, second_roll: null, totalFrameScore: null});
        }
        this.currentFrame = 0;
    }

    recordThrow = (pinValue) => { 

        if(pinValue > 10 || pinValue < 0){
            throw new RangeError("Valid throws are 0 - 10");
        }
        
        if(!this._frames[this.currentFrame].first_roll){
            this._frames[this.currentFrame].first_roll = pinValue;
            return;
        }

        let frameTotal = this._frames[this.currentFrame].first_roll + pinValue;

        if(frameTotal > 10 ){
            throw new Error("Invalid throw combination");
        }
        this._frames[this.currentFrame].second_roll = pinValue;
        
        //updates totalFrameScore after the throw
        this._frames[this.currentFrame].totalFrameScore = this._frames[this.currentFrame].first_roll + this._frames[this.currentFrame].second_roll;
        this.currentFrame++;
    }  

    calculateFrameScore = () => {  
        let currentFrameScore = this._frames[this.currentFrame].totalFrameScore;
        let preceedingFrameScore = this._frames[this.currentFrame - 1].totalFrameScore;
        return currentFrameScore + preceedingFrameScore;

        if(frameTotal === 10){
            return 'spare';
        }
    }

    

    get frames(){
        return [...this._frames];
    }
}

