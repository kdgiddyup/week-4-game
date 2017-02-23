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
			ap: 40
			},
		chewbacca: {
			bg: 'assets/images/chewbacca-bg.jpg',
			hp: 180,
			ap: 80
			},
		phasma: {
			bg: 'assets/images/phasma-bg.jpg',
			hp: 140,
			ap: 70
			},
		kylo: {
			bg: 'assets/images/kylo-bg.jpg',
			hp: 160,
			ap: 90
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
			$(userChar).off().css('cursor','auto');
			$('#userCharacter').append(userChar);
			$('#instructions').html('Choose an opponent');
			
			// reset background image to match user character
			$('body').css('background-image','url('+gameData.chars[this.id].bg+')').css('background-position','right');
			gameData.choice = 'opponent'
		}
		else if (gameData.choice == 'opponent') {
			opponent=this;
			$(opponent).off().css('cursor','auto');
			$('#defender').append(opponent);
			$('#instructions').html('Time to attack!')
		}
	}

	});  // end doc ready
//$(this).append("<p>Health: "+gameData[$(this).id].hp+"</p>")