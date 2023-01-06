Wireframe

![Wireframe](asset/wireframe.png)

You can also see the wireframe in index.html

User Stories. BlackJack

As a user, all the 52 cards needs to come out. MakeDeck() function needs to be there. You need to make an array of spades, hearts, clover and diamond. Then, you need to create array of Ace to king cards. Then, you need to use for method and put all the cards inside the deck.

       suits = ["H", "C", "D", "S"] const nums = ["2" to "10", "J", "Q", 
       "K", "A"]

       deck = []

       function makeDeck(){
        for( let suitCounter = 0; suitCounter < 4; suitCounter++){
        for( let numCounter = 0; numCounter < 13; numCounter++){
        deck.push(nums[numCounter] + suits[suitCounter])
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
As a user, you need to draw a random card. You need to get a randomIndex first to generate a random number.

         function selectRandomCard(){ 
          const randomIndex = Math.floor(Math.random()* 52)    take out one 
          card and show the card on the screen 
          ...
          ...
          const card = allDecks[randomIndex]
          allDecks.splice(randomIndex, 1)
          return card;
          } 

As a user, you need to present two cards on the table both on the computer hand and on the player hand. So, you need to use 
you need to use selectRandom function twice and need to make a deal Hands function. And connect with CARD_MODEL which has div already. 
That the dealer's hand is hidden at the first card is realized by using classlist.add('back') 

    const dealHands = () => {
    dealerHand = [selectRandomCard(), selectRandomCard()]
    dealerHand.forEach((card, index)=>{
      const newCard = CARD_MODEL.cloneNode(true);
      index === 0 ? newCard.classList.add('back') : newCard.innerHTML = 
       card;
      ...
      DEALER.append(newCard);
    })
    playerHand = [selectRandomCard(), selectRandomCard()]
    playerHand.forEach((card)=>{
      const newCard = CARD_MODEL.cloneNode(true);
      newCard.innerHTML = card;
     ...
      PLAYER.append(newCard);
    })
    }

As a user, you need to have a hit button to draw another cards or more cards. So, you need to make a function, hit player function. In the case, you need to use a selectRandom function again and you need to push to the player hand. Then you need to put a div and connect with newCardNode.


     function hitPlayer(){  
       const newCard = selectRandomCard()
       playerHand.push(newCard);
       const newCardNode = CARD_MODEL.cloneNode(true);
       newCardNode.innerHTML = newCard;
       PLAYER.append(newCardNode)
       ...
       }  
As a user, you need to have a stay or stand button not to draw another card and match against the opponent

      function stay(){  
        not draw any card and add the total number of points  
        display total number of points of computer and player and display 
         the winner  
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

As a user, the player can bet money and it starts from $500. If the money becomes 0, the game is over.

      function bet(money){  
       deduct bet money from all the money player have  
       change all the money player have on the screen   
       show bet money on the screen  
       }  

2.

As a user, the player can see the statistics like how many times the computer wins and the player wins.


     function numOfWins(){ 
       if(player wins){  
       numOfWins++.   
       player: totalW.appendChild(win)  
       } else if (computer wins){  
       numOfWins++  
       computer: totalW.appendChild(win)  
       }  
       }  

As a user, if the user won more than 10 times, the winning percentage score board and the number of wins score board will be shown on the board. 

       function showBoard(){
         (numberOfWins > 10){
        score.style.display  = "block"
         }
        }

3. 

As a user, the player can see the score board of the money which the player got by winning.

      function score(){  
       add to the overall the money that player have. 
       display to the screen how much the user have. 
       }  
As a user, the player can see the champion cup if the money of the player got went over $5000.

       function showCup(){
        if(money > 5000){
         cup.style.display = "block";
        }
       }

