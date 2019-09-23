var gameport = document.getElementById("gameport");


var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
							
var cancelAnimationFrame = window.cancelAnimationFrame ||
							window.mozCancelAnimationFrame ||
							window.webkitCancelAnimationFrame ||
							window.msCancelAnimationFrame;



var renderer = PIXI.autoDetectRenderer({width:1000, height:300});
renderer.backgroundColor = 0x3A36F3;
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();


var hitTracker= 0;

var characterTextureStanding = PIXI.Texture.fromImage("character_standing.png");
var characterTextureDodging = PIXI.Texture.fromImage("character_dodging.png");
var arrowTexture = PIXI.Texture.fromImage("arrow.png");
var arrowTextureRed = PIXI.Texture.fromImage("arrowRed.png");
var healthTextureFull = PIXI.Texture.fromImage("healthFull.png");
var healthTexture3q = PIXI.Texture.fromImage("healthQuarter.png");
var healthTextureHalf = PIXI.Texture.fromImage("healthHalf.png");
var healthTextureQ = PIXI.Texture.fromImage("health3q.png");
var healthTextureZero = PIXI.Texture.fromImage("healthNone.png");

var correctKey;

var sprite = new PIXI.Sprite(characterTextureStanding);
var arrowSprite = new PIXI.Sprite(arrowTexture);
var healthSprite = new PIXI.Sprite(healthTextureFull);

var originalXPosition = 50;

var originalYPosition = 200;

//sprite.anchor.x = 0.5;
//sprite.anchor.y = 0.5;

sprite.position.x = originalXPosition;
sprite.position.y = originalYPosition;

generateArrow();

/*
arrowSprite.position.x = 400;
arrowSprite.position.y = 100;
*/

healthSprite.position.x = 0;
healthSprite.position.y = 0;


sprite.scale.set( 3, 3 );
stage.addChild(sprite);
stage.addChild(arrowSprite);
stage.addChild(healthSprite);
var savekey = 0;
var jumpCount,grounded,tagged = false;
var pressed = false;

var requestIDForJump, requestIDForArrow;

function keydownEvenHandler(e)
   {
	if(e.keyCode == 87 /*w key*/ && pressed == false)
	   {
		   pressed = true;
		   savekey = 87; 
		   
			   jump();
			 				   
			jumpCount,grounded = false;
	   }
	   
	if(e.keyCode == 70 /*f key*/ && pressed == false)
	   {
		   pressed == true;
		   savekey = 70;
		   restart();
	   }
	   
		   
			
	     
	if(e.keyCode == 83 /*s key*/ && pressed == false)
	   {
		pressed = true;
		sprite.texture = characterTextureDodging;
		sprite.position.y += 10;
		savekey = 83;
	   }
   }
   
function jump()
{
	if(!jumpCount)
	{
		sprite.position.y -= 10;
		requestIDForJump = requestAnimationFrame(jump);
		if( sprite.position.y == 100 )
		{
			jumpCount = true;
			//cancelAnimationFrame(requestIDForJump);
		}
	} else if(!grounded)
	{
		sprite.position.y += 10;
		requestIDForJump = requestAnimationFrame(jump);
		if( sprite.position.y >= 200 )
		{
			grounded = true;
			cancelAnimationFrame(requestIDForJump);
			grounded = false;
			jumpCount = false;
		}
	}
}

function land()
{
	if(!grounded)
	{
		sprite.position.y += 10;
		requestIDForLand = requestAnimationFrame(land);
		if(sprite.position.y == 200)
		{
			grounded = true;
			cancelAnimationFrame(requestIDForLand);
			
		}
		
	}
}

function updateHealth()
{
	if(hitTracker == 1){
		healthSprite.texture = healthTexture3q;
	}
	else if(hitTracker == 2){
		healthSprite.texture = healthTextureHalf;
	}
	else if(hitTracker == 3 ){
		healthSprite.texture = healthTextureQ;
	}
	else if(hitTracker ==4) {
		healthSprite.texture = healthTextureZero;
	}
	else{
		healthSprite.texture = healthTextureFull;
	}
	
}

function restart()
	{
		hitTracker = 0;
		updateHealth();
	}


function checkIfHit(key)
{
	if(arrowSprite.position.x == sprite.position.x)
	{
		if(key != correctKey)
		{
			//tagged = true;
			hitTracker+=1;
		}
		else if(arrowSprite.position.y == sprite.position.y)
		{
			//tagged = true;
			hitTracker+= 1;
		}
	}
}
  
   
function moveArrow()
{
	arrowSprite.position.x -= 10;
	checkIfHit(savekey);
	updateHealth();
	if(hitTracker < 4)
	{
		
		if(arrowSprite.position.x <= 0)
		{
			generateArrow();
		}
	}
	requestAnimationFrame(moveArrow);
	
	
	//cancelAnimationFrame(requestIDForArrow);
}
moveArrow();


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


/**
Function that creates arrows randomly and passes the 
*/

function generateArrow()
{
	try{
		stage.removeChild(arrowSprite);
	} catch(err)
	{
		stage.addChild(arrowSprite);
	}
	let randNum = getRndInteger(1,2);
	if( randNum == 2 )
	{
		correctKey = 83;
		arrowSprite.texture = arrowTexture;
		stage.addChild(arrowSprite);
		arrowSprite.position.x = 600;
		arrowSprite.position.y = 200;
	}
	else if(randNum == 1){
		correctKey = 87;
		arrowSprite.texture = arrowTextureRed;
		stage.addChild(arrowSprite);
		arrowSprite.position.x = 600;
		arrowSprite.position.y = 200;
	}
}

   
function keyupEventHandler()
   {
	sprite.texture = characterTextureStanding;
	pressed = false;
	
	/*if(savekey == 87)
	   {
		sprite.position.y = 200;
	   }
	   */
	   
	if(savekey == 83)
	   {
		sprite.position.y = 200;
	   }
   }

function animate()
{
		
	requestAnimationFrame(animate);
	window.addEventListener('keydown', keydownEvenHandler);
	window.addEventListener('keyup', keyupEventHandler);
	renderer.render(stage);
}

animate();

