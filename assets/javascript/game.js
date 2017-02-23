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
	$(".character-box").each(function(){
		$(this).append('<p class="hp">Health: '+gameData.chars[this.id].hp+'</p>').on("click",chooser)
	});

	function chooser(){
		if (gameData.choice == 'user') {
			userChar=this;
			// set base power; we'll need this in the attack round
			basePower=gameData.chars[this.id].ap;
			$(userChar).off().css('cursor','auto');
			$('#userCharacter').append(userChar);
			$('#instructions').html('Choose an opponent');
			
			// reset background image to match user character
			$('body').css('background-image','url('+gameData.chars[this.id].bg+')').css('background-position','right').css('color','#fff');
			$('.character-box p').css('color','#000');
			gameData.choice = 'opponent'
		}
		else if (gameData.choice == 'opponent') {
			opponent=this;
			// turn off all click listeners
			$(".character-box").off().css('cursor','auto');
			
			// move choice of opponent to 'defender' area
			$('#defender').append(opponent);
			$('#instructions').html('Time to attack!');
			$('#attackButton').fadeIn('slow').on("click",attack);
		}
	}

	function attack() {
		var user = gameData.chars[userChar.id];
		var opp = gameData.chars[opponent.id];
		
		// user attacks
		opp.hp=opp.hp-user.ap;

		// opponent counter attacks
		user.hp=user.hp-opp.ap;

		// user attack power always rises by base power for next round
		user.ap=user.ap+basePower;

		// update health point display
		$(userChar).children(".hp").html(user.hp);
		$(opponent).children(".hp").html(opp.hp);
		
		// to do: calculate results
		console.log('user hp: '+user.hp+'; opp hp: '+opp.hp+'; user ap: '+user.ap);
		
	}

	});  // end doc ready