// each picture has a border and text
// 	border changes colors according to which div class they're in
// player picks a character by clicking on picture
// that character moves into your characte div
	// append img to new div
// all other characters move to enemies div
// player picks an enemy 
// enemy moves to defender div
// player clicks attack button 
// results displayed
// 	You attacked ___ for __ damage 
// 		your damage increases each time (triple each time?)
// 	Enemy attacked you back for __ damage
// 		enemy attacks same damage each time
// 	your character and enemy's score decreases 
// if your score <= 0 and enemy score >0,  you lose
// if enemy score 0, enemy photo hides
// player picks new enemy
// if click attack and defender div is empty results = no enemy here 
// enemy moves to div 	
// repeat
// until enemies = 0 == you won
// restart 

$(document).ready(function(){
	var wins = 0;
	var loses = 0;

	var baseState = {
		havePlayer: false,
		haveEnemy: false,
		multiplier: 1,
		dead: 0,

		characters: {
		A :{
			id: 'A',
			health: 100,
			attackPoints: 20
		}, 
		B :{
			id: 'B',
			health: 125,
			attackPoints: 15
		}, 
		C :{
			id: 'C',
			health: 150,
			attackPoints: 35
		}, 
		D :{
			id: 'D',
			health: 175,
			attackPoints: 20
		}} 
	};

	var gameState = {
		havePlayer: false,
		haveEnemy: false,
		multiplier: 1,
		dead: 0,		

		characters: {
		A :{
			id: 'A',
			health: 100,
			attackPoints: 20
		}, 
		B :{
			id: 'B',
			health: 125,
			attackPoints: 15
		}, 
		C :{
			id: 'C',
			health: 150,
			attackPoints: 35
		}, 
		D :{
			id: 'D',
			health: 175,
			attackPoints: 20
		}} 
	};

	function attack() {
		$(".results").html("You attack " + gameState.enemy + " with " + (gameState.yourAttack * gameState.multiplier) + "<br>" +
			gameState.enemy + " attacks you with " + gameState.enemyAttack);
		gameState.EnemyHealth = gameState.enemyHealth -= (gameState.yourAttack * gameState.multiplier);
		gameState.PlayerHealth = gameState.yourHealth -= gameState.enemyAttack;
		console.log(gameState.EnemyHealth);
		console.log(gameState.PlayerHealth);
		$("." + gameState.yourPlayer).html(gameState.PlayerHealth);
		$("." + gameState.enemy).html(gameState.EnemyHealth);		
		}

	$(".option").on("click", function(){
		if (!gameState.havePlayer) {
			// on click move everything to enemies except what was clicked
			$(".enemies").append($(".option").not(this));
			// move character selected to your character
			$(".yourCharacter").append(this);
			gameState.yourPlayer = this.id

			console.log(gameState.yourPlayer);
			
			gameState.yourHealth = gameState.characters[gameState.yourPlayer].health;
			gameState.yourAttack = gameState.characters[gameState.yourPlayer].attackPoints;
			console.log(gameState.yourHealth);	
			gameState.havePlayer = true;
			$(".results").html("Pick your opponent");


			// prevent your player from being selected again
		} else if ((gameState.yourPlayer !== this.id) && !gameState.haveEnemy && gameState.havePlayer) {
			$(".defender").append(this);
			gameState.enemy = this.id
			gameState.haveEnemy = true;
			console.log(this.id);
			gameState.enemyHealth = gameState.characters[gameState.enemy].health;
			gameState.enemyAttack = gameState.characters[gameState.enemy].attackPoints;
			console.log(gameState.enemyHealth);
			$(".results").html("Attack");
		}
	});

	$(".attack").on("click", function(){
	console.log("frog");
		if(!gameState.havePlayer || !gameState.haveEnemy) {
			$(".results").html("Choose character and enemy!");	
		} else if (gameState.enemyHealth > 0 && gameState.yourHealth > 0){
			attack();
			gameState.multiplier++;
			if (gameState.enemyHealth > 0 && gameState.yourHealth <= 0 || gameState.enemyHealth <= 0 && gameState.yourHealth <= 0 ) {
				loses++; 
			$(".results").html("You lose! Reset game.");
			$(".loses").html("Loses: " + loses);


			} else if(gameState.enemyHealth < 0 && gameState.yourHealth >= 0) {
				$(".restults").html("You defeated " + gameState.enemy + " choose the next opponent");
				$(".dead").append($("#"+gameState.enemy));
				gameState.dead++;
				gameState.haveEnemy = false;
					if(gameState.dead === 3) {
						$(".results").html("You won!");	
						wins++;
						$(".wins").html("Wins: " + wins);
					}
			}
		} 

	});

	$(".reset").on("click", function(){
		console.log("numnum");
		gameState = baseState;
		$(".results").html("Pick your character");
		$(".characters").html($(".option"))
		$(".A").html(baseState.characters["A"].health);
		$(".B").html(baseState.characters["B"].health);
		$(".C").html(baseState.characters["C"].health);
		$(".D").html(baseState.characters["D"].health);
	});	

})