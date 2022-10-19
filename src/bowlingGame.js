module.exports = class Game {
    constructor(){
       this.players = [
        {name: 'player1', score: []}
       ];
    
    }
 
    recordThrow = (playerValue, pinValue) => {
        if(playerValue === this.players[0].name){
            let playerScore = this.players[0].score;
            playerScore.push(pinValue);
            return playerScore[playerScore.length - 1];
        };
    }

    calculateScore = (playerValue) => {
        if(this.players[0].name === playerValue){
            let total = 0;

            for(let i = 0; i < this.players[0].score.length; i++){
                total += this.players[0].score[i];
            }
            return total;
        }
    }

}

