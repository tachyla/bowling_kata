module.exports = class Frame{
    constructor(frameNumber){
        this.frameNumber = frameNumber ? frameNumber : 0;
        this.first_roll = null;
        this.second_roll = null;
        this.score = null;
    }
    isComplete() {
        if(!this.first_roll  && !this.second_roll){
            return false;
        }
        return true;
    }
}