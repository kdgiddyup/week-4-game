/* pseudo code
------------------------
Game flow
1. User chooses character from character bank
2. Character is moved from character bank to player character area
3. User chooses opponent
4. Opponent is moved to defender area
5. User clicks Attack button
6. Game round:
	a) user HP goes down by defender's attack power
	b) opponent HP goes down by user attack power
	c) user attack power goes up by <?>
7. Results calculated
	a) Are user HP <= 0?
		Game over message and restart option
	b) Opponent HP <= 0?
		User wins round
			1. Is this last defender?
				User wins game
					Message and restart option
			2. Not last defender?
				Move on
8. User chooses new opponent
9. New opponent moves to Defender area
10. Back to step 5.


Variables
----------------


userChar will be one of the char objects assigned to it by user choice
opponent will be one of the remaining char objects assigned to it by user choice
*/

$(document).ready(function(){

var gameData = {
	chars: {
		leia: {
			bg: 'assets/images/leia-bg.jpg',
			hp: 140,
			ap: 6
			},
		chewbacca: {
			bg: 'assets/images/chewbacca-bg.jpg',
			hp: 180,
			ap: 8
			},
		phasma: {
			bg: 'assets/images/phasma-bg.jpg',
			hp: 140,
			ap: 10
			},
		kylo: {
			bg: 'assets/images/kylo-bg.jpg',
			hp: 160,
			ap: 11
			}
		},
	defendersRemaining: 4,	
	choice: 'user'
	}

	// fx is the sound effects player object
	var fx = document.createElement('audio');

	clicksOn();

	function chooser(){
		if (gameData.choice == 'user') {
			userChar=this;
			// set base power; we'll need this in the attack round
			basePower=gameData.chars[this.id].ap;
			$(userChar).off().css('cursor','auto');
			$('#userCharacter').append("<h2>Your character</h2>").append(userChar);
			$('#instructions').html('Choose an opponent');
			
			// reset background image to match user character
			$('body').css('background-image','url('+gameData.chars[this.id].bg+')').css('color','#fff');
			$('.character-box p').css('color','#000');
			gameData.choice = 'opponent'
		}
		else if (gameData.choice == 'opponent') {
			opponent=this;
			// turn off all click listeners
			$(".character-box").off().css('cursor','auto');
			
			// move choice of opponent to 'defender' area
			$('#defender').append("<h2>Defender</h2>").append(opponent);
			$('#instructions').html('Time to attack!');
			$('#attackButton').fadeIn('slow').on("click",attack);
		}
	}

	function clicksOn() {
		$(".character-box").each(function(){
		$(this).append('<p class="hp">Health: '+gameData.chars[this.id].hp+'</p>').on("click",chooser).css('color','#000')
		});
	};
	
	function attack() {
		// choose random sound file and play it
		var soundfile = Math.floor(Math.random()*5+1);
		fx.setAttribute('src','assets/sounds/sound'+soundfile+'.mp3');
		fx.play();
		
		var user = gameData.chars[userChar.id];
		var opp = gameData.chars[opponent.id];
		
		// user attacks
		opp.hp=opp.hp-user.ap;
		
		// user attack power goes up
		user.ap=user.ap+basePower;

		// is opponent defeated?
		if (opp.hp <= 0) {
			// defender count decrements
			gameData.defendersRemaining--;
			// no defenders left?
			if (gameData.defendersRemaining==0)
				gameOver('win')
			else 
				//round is over but not game
				roundOver();
			}
		
		else  
			// just update opponent health points
			$(opponent).children(".hp").html('Health: '+opp.hp);

		// opponent counter attacks
		user.hp=user.hp-opp.ap;
		if (user.hp <= 0) {
			// user character health is at 0 - game over
			user.hp = 0;
			// update health point display
			$(userChar).children(".hp").html('Health: '+user.hp);
			gameOver('lose')
			}
		else // just update user HP
			$(userChar).children(".hp").html('Health: '+user.hp);
		
		// user attack power always rises by base power for next round
		
		
		function roundOver(){
			//remove defeated opponent from stage
			$("#defender").empty();
			
			// hide attack button
			$('#attackButton').fadeOut('slow');
			// re-activate character divs
			clicksOn();
			// instruct player to choose new opponent
			$('#instructions').html('Choose another opponent');
		}
		
	}

	});  // end doc ready