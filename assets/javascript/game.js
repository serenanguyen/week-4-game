$(document).ready(function(){
	var wins = 0;
	var loses = 0;

	var baseState = {
		havePlayer: false,
		haveEnemy: false,
		multiplier: 1,
		dead: 0,

		characters: {
		Peach :{
			health: 100,
			attackPoints: 20
		}, 
		Darryl :{
			health: 125,
			attackPoints: 15
		}, 
		Kody :{
			health: 150,
			attackPoints: 35
		}, 
		Eustice :{
			health: 175,
			attackPoints: 20
		}} 
	};

	var gameState = {
		havePlayer: false,
		haveEnemy: false,
		multiplier: 1,
		dead:0,

		characters: {
		Peach :{
			health: 100,
			attackPoints: 20
		}, 
		Darryl :{
			health: 125,
			attackPoints: 15
		}, 
		Kody :{
			health: 150,
			attackPoints: 35
		}, 
		Eustice :{
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
		$("img." + gameState.yourPlayer).effect("shake");	
		$("img." + gameState.enemy).effect("shake");
		}
//.css()to change font color according to what role they play?
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
				$("img." + gameState.yourPlayer).animate({opacity: "0"});
				$(".results").html("You lose! Reset game.");
				$(".loses").html("Loses: " + loses);
			} else if(gameState.enemyHealth <= 0 && gameState.yourHealth >= 0) {
				$(".restults").html("You defeated " + gameState.enemy + " choose the next opponent");
				$("img." + gameState.enemy).animate({opacity: "0"});
				setTimeout(function(){
				$(".dead").append($("#"+gameState.enemy))}, 1000);
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
		$(".Peach").html(baseState.characters["Peach"].health);
		$(".Darryl").html(baseState.characters["Darryl"].health);
		$(".Kody").html(baseState.characters["Kody"].health);
		$(".Eustice").html(baseState.characters["Eustice"].health);
		gameState.havePlayer = false;
		gameState.haveEnemy = false;
		gameState.dead = 0;
		gameState.multiplier =1;
		$("img").css({opacity: "1"});
	});	

})