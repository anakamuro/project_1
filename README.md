Wireframe

 https://www.figma.com/file/7AUhwduPCCY3riFeUj5Kn5/Black-Jack-wireframe?node-id=0%3A1&t=Kb7kCNK5lQP23K8I-1

 You can also see the wireframe in index.html

User Stories. BlackJack

1.
As a user, all the 52 cards needs to come out. MakeDeck() function needs to be there. You need to make an array of spades, hearts, clover and diamond. Then, you need to create array of Ace to king cards. Then, you need to use for method and put all the cards inside the deck. 

 deck = []

    function makeDeck(){
     for(){
     for(){
       deck.push()
    }
}
return deck
}

As a user, the player need to shuffle deck. Because to play the game of blackjack, random card needs to be picked. So, you need to create a shuffle function. 

     function shuffle(deck){
     for(let i = 0; i < 52; i++) {
    let tempCard = deck[i]
    let randomIndex = Math.floor(Math.random() * 52);
    ...
     }

As a user, all the cards needs to be counted as point. so, countDeck function is needed. J, Q, K are counted as 10 and A is counted as 1 or 11 depending on the situation. 

function countDeck(){
    case J
    return 10
    case Q
    return 10
    case K
    return 10
}

As a user, you need to draw a card. The last item needs to be picked so pop method needs to be used. 

  function drawCard(){
    .....pop()

    return card
  }

As a user, you need to have a hit button to draw another cards or more cards. 

   function hit(){
    .....pop()
   }

As a user, you need to have a stay or stand button not to draw another card and match against the opponent

   function stay(){

   }

As a user, you need to have a determineWinner function and inside the function, put all the logic.

   function determineWinner(){
    (yourHand > 21){
        return You lose
    } else if (yourHand < comHand <= 21){
        return you lose
    } else if (comHand < yourHand <= 21){
        return you win
    } else if (comHand === yourHand < 21){
       return you are tie
    }
   }

As a user, the player can play a match with a computer.



2. 

As a user, the player can see the statistics like how many times the computer wins and the player wins.

   function numOfWins(){
    if(player wins){
        numOfWins++
    }
   }

As a user, the computer can hide the second card which the player will become more difficulty to guess how many points the computer will get. 

As a user, the player can bet money and it starts from $500. If the money becomes 0, the game is over. 

  function bet(money){

  }

3.

As a user, the player can see the score board of the money which the player got by winning. 

 function score(){
    
 }

As a user, the player can see the champion cup if the money of the player got went over $5000. 
