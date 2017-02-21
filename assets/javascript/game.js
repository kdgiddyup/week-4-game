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
gameTracker = {
	chars: {
		leia: {
			image: assets/images/leia.jpg,
			hp: <health points>,
			ap: <attack points>
			},
		chewbacca: {
			image: assets/images/chewbacca.jpg,
			hp: <health points>,
			ap: <attack points>
			},
		phasma: {
			image: assets/images/phasma.jpg,
			hp: <health points>,
			ap: <attack points>
			},
		kylo: {
			image: assets/images/kylo.jpg,
			hp: <health points>,
			ap: <attack points>
			}
		},
	defendersRemaining:4	
	}

userChar will be one of the char objects assigned to it by user choice
opponent will be one of the remaining char objects assigned to it by user choice
*/