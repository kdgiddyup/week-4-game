$(document).ready(function(){

// opponents is a clone of the character divs that will be removed during game play, for reset
var opponents = jQuery.extend(true,{}, $(".character-box"));

// our game data tracing object
var gameData = {
	chars: {
		leia: {
			bg: 'assets/images/leia-bg.jpg',
			hp: 120,
			ap: 8
			},
		chewbacca: {
			bg: 'assets/images/chewbacca-bg.jpg',
			hp: 125,
			ap: 10
			},
		phasma: {
			bg: 'assets/images/phasma-bg.jpg',
			hp: 140,
			ap: 15
			},
		kylo: {
			bg: 'assets/images/kylo-bg.jpg',
			hp: 170,
			ap: 18
			}
		},
	defendersRemaining: 3,
	choice: 'user'
	};

// add click events to attack and reset buttons
$("#attackButton").on("click",attack);
$("#resetButton").on("click",reset);

// fx is the audio player object, for sound fx
var fx = document.createElement('audio');

// add click listeners to character divs
clicksOn();

// make a clone of gameData to ease reset
var resetData = jQuery.extend(true,{}, gameData);

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
		$('#defender').empty().append("<h2>Defender</h2>").append(opponent);
		
		// tell user what to do now
		$('#instructions').html('Time to attack!');
		
		// provide an attack button
		$('#attackButton').fadeIn("slow");
	}
}

// <this> in clicksOn function is each character div in the html for the user to choose from
// we append health pts from gameData object and an event listener that invokes the chooser function, and adjusts cursor style to pointer
// we also change the font color because chooser changes the gamestage background
function clicksOn() {
	$(".character-box").off().each(function(){
	$(this).append('<p class="hp">Health: '+gameData.chars[this.id].hp+'</p>').on("click",chooser).css('color','#000').css('cursor','pointer');
	});
};

function attack() {
	// kill any as-yet playing fx
	soundOff();
	// choose new random fx file and play it
	var soundfile = Math.floor(Math.random()*5+1);
	sound('assets/sounds/sound'+soundfile+'.mp3');
	
	var user = gameData.chars[userChar.id];
	var opp = gameData.chars[opponent.id];
	
	// user attacks
	opp.hp=opp.hp-user.ap;
	
	// user attack power goes up
	user.ap=user.ap+basePower;

	// is opponent defeated?
	if (opp.hp <= 0) 
		//round is over 
		roundOver()		
	else { 
		// just update opponent health points
		$(opponent).children(".hp").html('Health: '+opp.hp);

		// opponent counter attacks
		user.hp=user.hp-opp.ap;
		if (user.hp <= 0) {
			// user character health is at 0 - game over
			user.hp = 0;
			// update health point display
			$(userChar).children(".hp").html('Health: '+user.hp);
			gameOver(0)
			}
		else // just update user HP
			$(userChar).children(".hp").html('Health: '+user.hp);
		}
}
	
function roundOver(){

	//remove defeated opponent from stage
	$("#defender").empty();
	
	// hide attack button
	$('#attackButton').fadeOut("slow");
	
	// defender count decrements
	gameData.defendersRemaining--;
	
	// any defenders left?
	if (gameData.defendersRemaining <= 0)
		gameOver(1)

	else {
		// re-activate character divs
		clicksOn();
	
		// instruct player to choose new opponent
		$('#instructions').html('Choose another opponent')
	}
}

function gameOver(win) {
	if (win) {
		// cue the victory march; make it a timeout to give the attack sound effect time to play
		sound('assets/sounds/victory.mp3');
		$("#defender").empty();
		$("#instructions").html('You are the victor! May the Force be with you!')
	}
	else {
		// cue the dark side; make it a timeout to give the attack sound effect time to play
		sound('assets/sounds/vader.mp3');
		$("#userCharacter").empty();
		$("#instructions").html('You have been defeated by the Dark Side!')
	}
	// hide attack button 
	$("#attackButton").fadeOut("slow");
	
	// show reset button and add click function
	$("#resetButton").fadeIn("slow");

} // end gameOver function

function reset() {

	// kill any fx
	soundOff();
	
	// set gameData and game message to initial values
	gameData = resetData;
	$("#instructions").html("Choose a character");

	
	//empty user and opponent character area
	$("#userCharacter").empty();
	$("#defender").empty();

	// restore characters
	$(opponents).each(function(){
		$("#characters").append(this)
		});

	// restore click listeners on character divs
	clicksOn();

	// hide reset button
	$("#resetButton").fadeOut("slow");

	//reset body background
	$("body").css("background-image","url(assets/images/background.jpg");

}  // end click function on reset button

function sound(file) {
	fx.setAttribute('src',file);
	fx.play();
}

function soundOff() {
	fx.pause();
}

});  // end doc ready