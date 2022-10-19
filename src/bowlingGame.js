module.exports = class Game {
    constructor(){
       this.players = [
        {name: 'player1', score: []}
       ];
    
    }
 
    recordThrow = (playerValue, pinValue) => {
        if(playerValue === this.players[0].name){
            let playerScore = this.players[0].score;
            return playerScore.push(pinValue);
        };
    }

}