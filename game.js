var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var characterTextureStanding = PIXI.Texture.fromImage("character_standing.png");
var characterTextureDodging = PIXI.Texture.fromImage("character_dodging.png");

var spriteStand = new PIXI.Sprite(characterTextureStanding);
var spriteDodge = new PIXI.Sprite(characterTextureDodging);

var originalXPosition = 200;

var originalYPosition = 200;

//sprite.anchor.x = 0.5;
//sprite.anchor.y = 0.5;

sprite.position.x = originalXPosition;
sprite.position.y = originalYPosition;



sprite.scale.set( 1, 1 );
stage.addChild(spriteStand);

function animate()
{
	requestAnimationFrame(animate);
	window.addEventListener( "keydown", function( event )
	{
		event.preventDefault();
		sprite.position.x += 0.05;
	});

	window.addEventListener( "keyup", function( event )
	{
		event.preventDefault();
        sprite.position.x -= 0.05;	
	});
	//sprite.rotation += 0.1;
	renderer.render(stage);
}

animate();

