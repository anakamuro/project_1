const cardModel = document.createElement('div');
cardModel.classList.add('card');
const dealer = document.getElementById("dealer")
const player = document.getElementById("player")
const hitButton = document.getElementById("hit-button")
const passButton = document.getElementById("pass-button")
const resetButton = document.getElementById("reset-button")
const resetScore = document.getElementById("reset-score")
const resetMoney = document.getElementById("reset-money")
const betButton = document.querySelector('.bet-amount');
const inputBet = document.querySelector('input')
const player1 = document.querySelector('.player1');
const dealer1 = document.querySelector('.dealer1');
const result = document.querySelector('.result');
let playerCash = document.querySelector('.player-cash')
playerCash.textContent = "Player Cash $100";
let dealerScore1 = document.querySelector('.dealer-score')
let playerScore1 = document.querySelector('.player-score')

let allDecks = []
let dealerHand = []
let playerHand = []
let cash = 100;
let bet = 0;
let dealerScore = 0;
let playerScore = 0;
let testDeck = makeDeck()
shuffle(testDeck)

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

const selectRandomCard = () => {
	const randomIndex = Math.floor(Math.random()* 52)
	const newDeck = makeDeck()
	allDecks = [ ...allDecks, ...newDeck]
	const card = allDecks[randomIndex]
	allDecks.splice(randomIndex, 1)
	return card;
}

const dealHands = () => {
	console.log(testDeck)
    dealerHand = [testDeck.pop(), testDeck.pop()]
	console.log(dealerHand)
	console.log(testDeck)
	playerHand = [testDeck.pop(), testDeck.pop()]
	console.log(playerHand)
	console.log(testDeck)
	
    dealerHand.forEach((card, index)=>{
      const newCard = cardModel.cloneNode(true);
      index === 0 ? newCard.classList.add('back') : newCard.innerHTML = card;
      (card[card.length -1] === "D" || card[card.length - 1] === "H") && newCard.setAttribute('data-red', true)
      dealer.append(newCard);
    })
    playerHand.forEach((card)=>{
      const newCard = cardModel.cloneNode(true);
      newCard.innerHTML = card;
      (card[card.length -1] === "D" || card[card.length - 1] === "H") && newCard.setAttribute('data-red', true)
      player.append(newCard);
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
	const newCardNode = cardModel.cloneNode(true);
	newCardNode.innerHTML = newCard;
	player.append(newCardNode)
	const handValue = calcValue(playerHand);
	if(handValue > 21){
		dealerScore++;
		player1.textContent = "Player busts. Dealer wins"
	} 
}

const decideWinneer = () => {
	let dealerValue = calcValue(dealerHand)
	let playerValue = calcValue(playerHand)

	result.textContent = (`Dealer has ${dealerValue}, you have ${playerValue}`)
	if(dealerValue === playerValue){
	cash = cash + bet
	player1.textContent = "dealer and players are tie."
	} else if ( dealerValue > playerValue){
	dealerScore++;
	dealer1.textContent = "dealer wins";
	cash = cash - bet
	} else if ( playerValue === 21){
	playerScore++;
	player1.textContent = "player has 21. BlackJack!!!";
	cash = cash + (bet * 2)
	} else if (dealerValue === 21){
		dealerScore++;
		cash = cash - bet
        dealer1.textContent = "Dealer got 21. BlackJack!!! Dealer won."
	} else if (dealerValue > 21){
		playerScore++;
		dealer1.textContent = "Dealer Bust. Player won."
		cash = cash + (bet * 2)
	} else {
	playerScore++;
	player1.textContent = "player wins."
	cash = cash + (bet * 2)
	}
	if(cash < 1){
		cash = 0;
		bet = 0;
	}
	Score()
}


const hitDealer = async() => {
	const hiddenCard = dealer.children[0];
	hiddenCard.classList.remove("back");
	hiddenCard.innerHTML = dealerHand[0];
	let handValue = await calcValue(dealerHand);
	if(handValue < 16){
		let newCard = selectRandomCard();
		dealerHand.push(newCard)
		const newCardNode = cardModel.cloneNode(true);
		newCardNode.innerHTML = newCard;
		dealer.append(newCardNode)
		handValue = await calcValue(dealerHand)
	}
	if(handValue < 16 ){
		hitDealer();
	}  else {
		decideWinneer()
		Score()
	}
}

function updateCash(){
	console.log(isNaN(inputBet.value));
	if(isNaN(inputBet.value) || (inputBet.value.length < 1)){
		inputBet.value = 0;
	}
	if(inputBet.value > cash){
		inputBet.value = cash
	}
	bet = Number(inputBet.value)
	playerCash.textContent = "Player Cash $"+ (cash - bet)
}

function setBet(){
    const status = document.querySelector('.message')
    status.textContent = "You bet $"+bet;
    cash = cash - bet;
    playerCash.textContent = "Player Cash $"+cash;
    console.log('hello')
}
function Score(){
	dealerScore1.textContent = `${dealerScore}`
	playerScore1.textContent = `${playerScore}`
}
function resetScore1(){
	dealerScore1.textContent = 0
    playerScore1.textContent = 0
}
function resetMoney1(){
	cash = 100
	playerCash.textContent = "Player Cash $"+ 100
}

function resetCards(){
	dealerHand = []
	playerHand = []
	while (dealer.hasChildNodes()){
		console.log(dealer.childNodes)
		dealer.removeChild(dealer.firstElementChild)
	}
	while (player.hasChildNodes()){
		console.log(player.childNodes)
		player.removeChild(player.firstElementChild)
	}
	player1.innerHTML = ""
	dealer1.innerHTML = ""
	result.innerHTML = ""
	testDeck = makeDeck()
    shuffle(testDeck)
	dealHands()
}

hitButton.addEventListener('click', hitPlayer)
passButton.addEventListener('click', hitDealer)
resetButton.addEventListener('click', resetCards)
dealHands()
betButton.addEventListener('click', setBet)
inputBet.addEventListener('change', updateCash)
resetScore.addEventListener('click', resetScore1)
resetMoney.addEventListener('click', resetMoney1)
