const cardModel = document.createElement("div"); // we may not need to add the card to the dom yet, I'd move this to another part of the app. 
cardModel.classList.add("card"); // with this to go with 
const dealer = document.getElementById("dealer"); // does this need to be a global  variable ?
const player = document.getElementById("player"); // names of these variables should be more specific, where if i see the variable referenced without th context of it's declaration, i should know what it is. player is ambiguous : use something like playerHandDisplay instead
const hitButton = document.getElementById("hit-button");
const passButton = document.getElementById("pass-button");
const resetButton = document.getElementById("reset-button");
const resetScore = document.getElementById("reset-score");
const resetMoney = document.getElementById("reset-money");
const betButton = document.querySelector(".bet-amount");
const inputBet = document.querySelector("input");
const player1 = document.querySelector(".player1");
const dealer1 = document.querySelector(".dealer1");
const result = document.querySelector(".result");
let trophy = document.getElementById("#trophy"); // why use `let` here instead of `const` ? Be consistent and intentional
let playerCash = document.querySelector(".player-cash");
playerCash.textContent = "Player Cash $100";
let dealerScore1 = document.querySelector(".dealer-score"); // use a better name for this. Reading dealerScore1 makes me think there should be a dealerScore2 : instead call it dealerScoreDisplay or something similar
let playerScore1 = document.querySelector(".player-score"); // see above

let allDecks = []; // do reference types need to have 'let' to be mutated ? no : use const instead since we don't ever want it to be anything other than an array. 
let dealerHand = []; // see line 21
let playerHand = []; // see line 21
let cash = 100;
let bet = 0;
let dealerScore = 0;
let playerScore = 0;
let testDeck = makeDeck(); 
shuffle(testDeck);

// my 'strong' personal preference and professional opinion is to use function expressions and or arrow functions instead of function declarations - because we want to be _intentional_.
// Relying on function declarations this way will lead you to _a lot_ of grief when you learn other languages, such as Python in unit 4, and is generally a bad practice.
// I know ths would be a BIG refactor for you, but just because we can doesn't mean we should( use function declarations ) - and we don't want this to lead to other bad habits, like calling functions before we declare them (see line 28, 29)
// "how do I make my global variables work nicely then Andrew?!" - "great question! : we can start with them being `null` knowing that we will re-write them with a function in the future. Remember null is the _intentional_ absence of value and the explicit `falsy`. See a theme here? : we like being intentional" 
function makeDeck() {
	const suits = ["♥", "♠", "♦", "♣"];
	const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
	let deck = [] // see line 21, also if we're going to put in our semicolons, do ALL of them, or remove them all. Be consistent ! 
// consider being more consistent with 'white space' ( empty horizontal lines )

	for (let suitCounter = 0; suitCounter < 4; suitCounter++) {
		for (let numCounter = 0; numCounter < 13; numCounter++) {
			deck.push(nums[numCounter] + suits[suitCounter])
		}
	}
	return deck;
}// good indentation


function shuffle(deck) { // lovely shuffle 
	for (let i = 0; i < 52; i++) {
		let tempCard = deck[i]
		let randomIndex = Math.floor(Math.random() * 52);
		deck[i] = deck[randomIndex]
		deck[randomIndex] = tempCard
	}
}

function dealHands() {
	dealerHand = [testDeck.pop(), testDeck.pop()] // i'd want to split this off into it's own function 
	playerHand = [testDeck.pop(), testDeck.pop()]
	// this is where i would move my declaration of the card model
	dealerHand.forEach((card, index) => { // this block of code doesn't read as your own ( why not use for each in your shuffle ?) Try and make this your own

		const newCard = cardModel.cloneNode(true) // i don't like this use of clone node, I would rather make one from scratch. 
		index === 0 ? newCard.classList.add('back') : (newCard.innerHTML = card)
		;(card[card.length - 1] === '♦' || card[card.length - 1] === '♥') &&
			newCard.setAttribute('data-red', true) // to access 2nd to last element, use the .at() method with -2 to count backwards !
			// ex. card.at(-2) === "♥"
		dealer.append(newCard)
	})
	playerHand.forEach((card) => { // writing the same loop twice, could be it's own function ! 
		const newCard = cardModel.cloneNode(true);
		newCard.innerHTML = card;
		(card[card.length - 1] === "♦" || card[card.length - 1] === "♥") && newCard.setAttribute("data-red", true)// why not use a css class here instead
		player.append(newCard);
	})
}
// consider this break down of the above into 3 functions: 
// dealCard = (hand, deck) => { // deal 1 card to a target hand from a deck 
// 	return hand.push(deck.pop())
// }
// renderCards = () => { // render all the cards to the dom
	// clear all the dom element cards ( see reset ) -> make it a separate clearCards function, call it here( will prevent duplicates if we render after each hit or hand)
	// do our first forEach for dealer hand
		// create a dom element for the card 
		// add the card class or 'back'
		// read the card and see if it's red or black
		// add appropriate class for red or blk 
		// append to hand display in the DOM
	// do other forEach for player hand 
		// ... same loop without 'back' class logic
// }
// startRound() => { // use the other functions we just wrote 
	// clear dealer hand
	// clear player hand
	// create a new deck 
	// shuffle the new deck 
	// call dealCard function 4 times: player-> dealer-> player-> dealer (maybe loop for multiple players when you get there ! )
	// call renderCards
// } // then add bet logic as needed 
// if we did the above a lot of the following functions written would be a little easier, especially reset and the hits !
// REMEMBER: if we can, functions should only do 1 thing and do it well!
// not only wil this help clean up our code / make it dry. it will give us more flexibility in the future. 

function calcValue(hand) {
	let value = 0;
	let hasAce = 0;
	hand.forEach((card) => {
		if (card.length === 2) {
			if (card[0] === "A") {
				hasAce += 1;
			} else {
				(card[0] === "K" || card[0] === "Q" || card[0] === "J") ? value += 10 : value += Number(card[0])
			}
		} else {
			value += 10;
		}
	})

	if (hasAce > 0) {
		value + 11 > 21 ? value += 1 : value += 11;
		value += (hasAce - 1) * 1;
	}
	return value;
}

function hitPlayer() {
	const newCard = testDeck.pop()
	playerHand.push(newCard);
	const newCardNode = cardModel.cloneNode(true);
	newCardNode.innerHTML = newCard;
	player.append(newCardNode);
	const handValue = calcValue(playerHand);
	if (handValue > 21) {
		dealerScore++;
		cash = cash - bet;
		player1.textContent = "Player busts. Dealer wins";
	}
	Score();
}

function decideWinneer() { // typo: winner*
	let dealerValue = calcValue(dealerHand);
	let playerValue = calcValue(playerHand);

	result.textContent = (`Dealer has ${dealerValue}, you have ${playerValue}`);
	if (dealerValue === playerValue) {
		cash = cash + bet;
		player1.textContent = "dealer and players are tie.";
	} else if (dealerValue > playerValue) {
		dealerScore++;
		dealer1.textContent = "dealer wins";
		cash = cash - bet;
	} else if (playerValue === 21) {
		playerScore++;
		player1.textContent = "player has 21. BlackJack!!!";
		cash = cash + (bet * 2);
	} else {
		playerScore++;
		player1.textContent = "player wins.";
		cash = cash + (bet * 2);
	}
	if (cash < 1) {
		cash = 0;
		bet = 0;
	}
	Score()
}


function hitDealer() {
	const hiddenCard = dealer.children[0];
	hiddenCard.classList.remove("back");
	hiddenCard.innerHTML = dealerHand[0];
	let handValue = calcValue(dealerHand);
	if (handValue < 16) {
		let newCard = testDeck.pop();
		dealerHand.push(newCard);
		const newCardNode = cardModel.cloneNode(true);
		newCardNode.innerHTML = newCard;
		dealer.append(newCardNode);
		handValue = calcValue(dealerHand);
	}
	if (handValue < 16) {
		hitDealer();
	} else if (handValue === 21) {
		dealerScore++;
		cash = cash - bet;
		dealer1.textContent = "Dealer got 21. BlackJack!!! Dealer won.";
	} else if (handValue > 21) {
		playerScore++;
		dealer1.textContent = "Dealer Bust. Player won.";
		cash = cash + (bet * 2);
	} else {
		decideWinneer();
	}
	Score(); // what is this doing? idk because the name is ambiguous 
}

function updateCash() {
	if (isNaN(inputBet.value) || (inputBet.value.length < 1)) {
		inputBet.value = 0;
	}
	if (inputBet.value > cash) {
		inputBet.value = cash;
	}
	bet = Number(inputBet.value)
	playerCash.textContent = "Player Cash $" + (cash - bet);
	displayTrophy();
}

function setBet() {
	const status = document.querySelector(".message");
	status.textContent = "You bet $" + bet;
	cash = cash - bet;
	playerCash.textContent = "Player Cash $" + cash;
	displayTrophy();
}
function Score() { // displayScore
	dealerScore1.textContent = `${dealerScore}`;
	playerScore1.textContent = `${playerScore}`;
}
function resetScore1() { // only effects th dom, so make sure that clear with the name, consider combining with above Score function b y adding a value param
	// ex: function setScoreDisplay (dealer, player) { ... textContent etc.}
	dealerScore1.textContent = 0;
	playerScore1.textContent = 0;
}
function resetMoney1() { // this name doesn't make sense - see line 18
	cash = 100;
	playerCash.textContent = "Player Cash $" + 100;
}

function resetCards() { // nice clear name - see line 244
	document.getElementById("trophy").style.display = "none";
	dealerHand = [];
	playerHand = [];
	while (dealer.hasChildNodes()) {
		dealer.removeChild(dealer.firstElementChild);
	}
	while (player.hasChildNodes()) {
		console.log(player.childNodes);
		player.removeChild(player.firstElementChild);
	}
	player1.innerHTML = "";
	dealer1.innerHTML = "";
	result.innerHTML = "";
	testDeck = makeDeck(); //o no, we're doing al sorts of things in this function! see `dealHands` refactor notes above. 
	shuffle(testDeck);
	dealHands();
}

function displayTrophy() {
	if (`${cash}` >= 120) {
		document.getElementById("trophy").style.display = "block";
	}
}

dealHands()
hitButton.addEventListener('click', hitPlayer);
passButton.addEventListener('click', hitDealer);
resetButton.addEventListener('click', resetCards);
betButton.addEventListener('click', setBet);
inputBet.addEventListener('change', updateCash); // nice! 
resetScore.addEventListener('click', resetScore1);
resetMoney.addEventListener('click', resetMoney1);
