
let allDecks = []
let dealerHand = []
let playerHand = []
const CARD_MODEL = document.createElement('div');
CARD_MODEL.classList.add('card');
const DEALER = document.getElementById("dealer")
const PLAYER = document.getElementById("player")
const HIT_BUTTON = document.getElementById("hit-button")
const PASS_BUTTON = document.getElementById("pass-button")
const BUTTON_CONTAINER = document.getElementById("button-container")
const NOTICE = document.getElementById("notice")
const NEX_HAND_BUTTON = document.getElementById("next-hand-button")

function makeDeck(){
const suits = ["H", "C", "D", "S"];
const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
let deck = []


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
 
const selectRandomCard = () => {
  const randomIndex = Math.floor(Math.random()* 52)
  const newDeck = makeDeck()
  allDecks = [ ...allDecks, ...newDeck]
  const card = allDecks[randomIndex]
  allDecks.splice(randomIndex, 1)
  return card;
}
const randomCard = selectRandomCard()

 
const dealHands = () => {
    dealerHand = [selectRandomCard(), selectRandomCard()]
    dealerHand.forEach((card, index)=>{
      const newCard = CARD_MODEL.cloneNode(true);
      index === 0 ? newCard.classList.add('back') : newCard.innerHTML = card;
      (card[card.length -1] === "D" || card[card.length - 1] === "H") && newCard.setAttribute('data-red', true)
      DEALER.append(newCard);
    })
    playerHand = [selectRandomCard(), selectRandomCard()]
    playerHand.forEach((card)=>{
      const newCard = CARD_MODEL.cloneNode(true);
      newCard.innerHTML = card;
      (card[card.length -1] === "D" || card[card.length - 1] === "H") && newCard.setAttribute('data-red', true)
      PLAYER.append(newCard);
    })
}

const calcValue = (hand) => {
  let value = 0;
  hand.forEach((card) => {
    if(card.length === 2){
      (card[0] === 'K' || card[0] === "Q" || card[0] === "J")? value+=10: value += Number(card[0])
    } else {
      value+= 10
    }
  })
  return value
}

const hitPlayer = () => {
  const newCard = selectRandomCard()
  playerHand.push(newCard);
  const newCardNode = CARD_MODEL.cloneNode(true);
  newCardNode.innerHTML = newCard;
  PLAYER.append(newCardNode)
  const handValue = calcValue (playerHand);
  if(handValue > 21){
    console.log("bust")
    alert("bust")
  } 
}

const decideWinneer = async() => {
  let dealerValue = await calcValue(dealerHand)
  let playerValue = await calcValue(playerHand)

 alert(`Dealer has ${dealerValue}, you have ${playerValue}`)
  dealerValue > playerValue? alert("dealer wins!"): alert("player wins")
}

const hitDealer = async() => {
  const hiddenCard = DEALER.children[0];
  hiddenCard.classList.remove("back");
  hiddenCard.innerHTML = dealerHand[0];
  let handValue = await calcValue(dealerHand);
  if(handValue < 16){
    let newCard = selectRandomCard();
    dealerHand.push(newCard)
    const newCardNode = CARD_MODEL.cloneNode(true);
    newCardNode.innerHTML = newCard;
    DEALER.append(newCardNode)
    handValue = await calcValue(dealerHand)
  }
  if(handValue < 16 ){
    hitDealer();
  } else if (handValue === 21){
    alert("dealer has 21!")
  } else if (handValue > 21){
    alert("dealer bust")
  } else {
    decideWinneer()
  }

}

HIT_BUTTON.addEventListener('click', hitPlayer)
PASS_BUTTON.addEventListener('click', hitDealer)
dealHands()