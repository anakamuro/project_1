
let allDecks = []
let dealerHand = []
let playerHand = []
const CARD_MODEL = document.createElement('div');
CARD_MODEL.classList.add('card');
const DEALER = document.getElementById("dealer")
const PLAYER = document.getElementById("player")
const HIT_BUTTON = document.getElementById("hit-button")
const PASS_BUTTON = document.getElementById("pass-button")
const RESET_BUTTON = document.getElementById("reset-button")
const BUTTON_CONTAINER = document.getElementById("button-container")
const NOTICE = document.getElementById("notice")
const NEX_HAND_BUTTON = document.getElementById("next-hand-button")


function init() {
  game.main = document.querySelector('#game');
  game.main.textContent = "Hello World";

  game.dashboard = document.createElement('div')
  game.playerCash = document.createElement('div');
  game.playerCash.classList.add('message');
  game.playerCash.textContent = "Player Cash $100";
  game.append(game.playerCash)
  
  game.cash = 100;
  game.bet = 0;
  game.scoreboard = document.createElement('div')
  game.status = document.createElement('div')
  game.scoreboard.textContent = "Dealer 0 vs Player 0";
  game.scoreboard.style.fontSize = "2em";
  game.append(game.scoreboard)
  game.main.append(game.scoreboard)

  inputBet = document.createElement('div')
  inputBet.setAttribute('type', 'number');
  inputBet.style.width = "4em";
  inputBet.style.height = "2em";
  inputBet.style.fontSize = "1.4em";
  inputBet.style.marginTop = "1em";
  inputBet.value = 0;
  game.append(inputBet)

  betButton = document.createElement('div')
  betButton.textContent = "Bet Amount"
  betButton.classList.add('btn')
  game.append(betButton)
  updateCash();
  return {
    init: init
  }
}

function updateCash(){
console.log(isNaN(inputBet.value));
if(isNaN(inputBet.value) || (inputBet.value.length < 1)){
  game.inputBet.value = 0;
}
if(game.inputBet.value > game.cash){
  game.inputBet.value = game.cash
}
game.bet = Number(game.inputBet.value)
//game.playerCash.textContent = "Player Cash $"+ (game.cash - game.bet)
}

function lockWager(tog){
  game.inputBet.disabled = tog;
  game.betButton.disabled = tog;
}

function setBet(){
  game.status.textContent = "You bet $"+ game.bet;
  game.cash = game.cash - game.bet;
  game.playerCash.textContent = "Player Cash $"+game.cash;
  lockWager(true);
}

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
  let hasAce = 0;
  hand.forEach((card) => {
    if(card.length === 2){
      if(card[0] === 'A'){
        hasAce += 1
      } else {
        (card[0] === 'K' || card[0] === "Q" || card[0] === "J")? value+=10: value += Number(card[0])
      }
    } else {
      value+= 10
    }
  })

  if(hasAce > 0){
   value + 11 > 21 ? value +=1 : value += 11;
   value += (hasAce-1)+1;
  }
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
 if(dealerValue === playerValue){
  game.cash = game.cash + game.bet
  alert("dealer and player are tie.")
} else if ( dealerValue > playerValue){
   alert("dealer wins!")
} else {
  alert("player wins")
  game.cash = game.cash + (game.bet * 2)
}
}

if(game.cash < 1){
  game.cash = 0;
  game.bet = 0;
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

 function reset(){
  allDecks = 0;
  dealerHand = 0;
  playerHand = 0;
  deck = 0;
  
 }

 document.addEventListener('DOMContentLoaded', init)
HIT_BUTTON.addEventListener('click', hitPlayer)
PASS_BUTTON.addEventListener('click', hitDealer)
RESET_BUTTON.addEventListener('click', reset)
dealHands()
betButton.addEventListener('click', setBet)
inputBet.addEventListener('change', updateCash)

RESET_BUTTON.addEventListener("click", function (){
    location.reload();
  })