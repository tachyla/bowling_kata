module.exports = class BowlingGame{
    playerScores = {
        p1: [],
        p2: []
    };

    addToScore(player, frameScore){
        if(player === this.playerScores.p2){
            this.playersScores.p1.push(frameScore)
        }
    }


}

