function makeDeck(){
const suits = ["H", "C", "D", "S"];
const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
let deck = [];

for( let suitCounter = 0; suitCounter < 4; suitCounter++){
    for( let numCounter = 0; numCounter < 13; numCounter++){
        deck.push(nums[numCounter] + suits[suitCounter])
    }
}
return deck;
}


function shuffle(deck) {
    for(let i = 0; i < 52; i++) {
    let tempCard = deck[i]
    let randomIndex = Math.floor(Math.random() * 52);
    deck[i] = deck[randomIndex]
    deck[randomIndex] = tempCard
    }
}

 let testDeck = makeDeck()
 shuffle(testDeck)
 console.log(testDeck)
 

 function startGame(deck){
    makeDeck()
    shuffle()
 }