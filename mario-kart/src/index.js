const players = {
    1: {
        Nome: "Mario",
        Velocidade: 4,
        Manobrabilidade: 3,
        Poder: 3,
        Pontos: 0
    },
    2: {
        Nome: "Peach",
        Velocidade: 3,
        Manobrabilidade: 4,
        Poder: 2,
        Pontos: 0
    },
    3: {
        Nome: "Yoshi",
        Velocidade: 2,
        Manobrabilidade: 4,
        Poder: 3,
        Pontos: 0
    },
    4: {
        Nome: "Luigi",
        Velocidade: 3,
        Manobrabilidade: 4,
        Poder: 4,
        Pontos: 0
    },
    5: {
        Nome: "Bowser",
        Velocidade: 5,
        Manobrabilidade: 2,
        Poder: 5,
        Pontos: 0
    },
    6: {
        Nome: "Donkey Kong",
        Velocidade: 2,
        Manobrabilidade: 2,
        Poder: 5,
        Pontos: 0
    }
};
const blocks = {
    0: "reta",
    1: "curva",
    2: "confronto"
}
const atributesForBlock = {
    reta: "Velocidade",
    curva: "Manobrabilidade",
    confronto:"Poder"
}
const NUMBER_OF_ROUNDS = 5;

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;

}

async function randomPlayer(){
    let number = await rollDice();
 
    return players[number];
}

async function randomBlocks(NUMBER_OF_ROUNDS){
    let blocksToReturn = []
    for(let i = 0; i < NUMBER_OF_ROUNDS; i++){
        blocksToReturn.push(blocks[Math.floor(Math.random()*3)]);
    }
    return blocksToReturn;
}

async function contest(p1,p2,typeOfContest){
    dataToReturn = ["\n\n", `${p1.Nome} encontra ${p2.Nome} em um(a) ${typeOfContest}`, "\n\n"];
    const diceForP1= await rollDice();
    const diceForP2= await rollDice();
    const totalForP1= p1[atributesForBlock[typeOfContest]] + diceForP1;
    const totalForP2 = p2[atributesForBlock[typeOfContest]] + diceForP2;
    dataToReturn.push(`${p1.Nome} joga o 🎲 e recebe ${diceForP1} pontos ficando com um total de ${totalForP1}`);
    dataToReturn.push(`${p2.Nome} joga o 🎲 e recebe ${diceForP2} pontos ficando com um total de ${totalForP2}`);
    if(totalForP1==totalForP2){
        dataToReturn.push("empate");
        return dataToReturn;
    }else{
        totalForP1 > totalForP2?  dataToReturn.push(`${p1.Nome} Venceu`) :  dataToReturn.push(`${p2.Nome} Venceu`) ;
        
    }
    return dataToReturn;
}

(async function main() {
    let player1 = await randomPlayer();
    let player2 = await randomPlayer();
    while(player1.Nome ==player2.Nome){
        player2 = await randomPlayer();
    }
    console.log(`🏁🚦Corrida iniciada entre ${player1.Nome} e ${player2.Nome}`);
    const blocksForPlay = await randomBlocks(NUMBER_OF_ROUNDS);

    for(let i = 0; i <blocksForPlay.length; i++){
        let result = await contest(player1,player2,blocksForPlay[i]);
        result.forEach(contest =>{
            console.log(contest);
        } )
    }
    console.log(player1.Pontos);
    
    console.log(player2.Pontos);
})()