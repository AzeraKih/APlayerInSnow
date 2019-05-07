var canvasGame;
var ctxGame;
var w;
var h;
var gravidade = 5;
var player;
var flagPulo = false;
var pressionadoDireita;
var pressionadoEsquerda;
var color = "#00FF00"

function setColor(c){
	color = c;
	if(color == "#000000"){
		/*Variavel skyColor provem de snow.js*/
		skyColor = 'hsla(250, 50%, 75%, 1)';
	} else {
		skyColor = 'hsla(255, 95%, 3%, 3)';
	}

	$("#moon").css({"background-color": color, 
	"box-shadow": "10px 10px 50px " + color});
	$("button").css({"color": color, 
	"box-shadow": "0 0 3px " + color,
	"background-color": skyColor});
}

$(document).ready(function(){
	canvasGame = $('#game')[0];
	ctxGame = canvasGame.getContext("2d");
	w = canvasGame.width = window.innerWidth;
	h = canvasGame.height = window.innerHeight;
	player = new Player();
	frameAtt();
});

function frameAtt() {
	ctxGame.clearRect(0, 0, w, h);
	ctxGame.fillStyle = 'rgba(255, 255, 255, 0';
	ctxGame.fillRect(0, 0, w, h);
	ctxGame.fill();
	player.draw();
	window.requestAnimationFrame(frameAtt);
}

function Jump(){
	if (flagPulo){
		return;
	}
	flagPulo = true;
	goUp();
	function goUp(){
		if (player.y < h - player.forcaPulo){
			window.cancelAnimationFrame(anmUp);
			goDown();
			return;
		}
		let dist = player.y - (h - player.forcaPulo);
		player.y -= (dist * .07) + player.sp/2 ;
		anmUp = window.requestAnimationFrame(goUp);
	};
	function goDown(){
		if (player.y > h - player.sz){
			player.y = h - player.sz;
			window.cancelAnimationFrame(anmDown);
			flagPulo = false;
			return;
		}

		player.y += gravidade;

		anmDown = window.requestAnimationFrame(goDown);
	}
}

function moveRight(){
	if(player.x >= w){
		player.x = - player.sz;
	} else {
		player.x += player.sp;
	}
}
function moveLeft(){
	if(player.x < - player.sz){
		player.x = w;
	} else {
		player.x -= player.sp;
	}
}

function Player() {
	this.forcaPulo = 200;
	this.sp = 3;
	this.sz = 50;
	this.x = 0;
	this.y = h - this.sz;
	this.img = new Image(this.sz, this.sz);
	this.img.src = "Player.png";
	this.draw = function() {
		ctxGame.moveTo(this.x, this.y);
		ctxGame.fillStyle = this.g;
		ctxGame.beginPath();
		ctxGame.drawImage(this.img, this.x, this.y, this.sz, this.sz);
	}
}

window.addEventListener('resize', function(){
	canvasGame.width = w = window.innerWidth;
	canvasGame.height = h = window.innerHeight;
}, false);


$(document).on("keydown", function(evt) {
	if (evt.keyCode === 68){
		if (!pressionadoDireita){
			pressionadoDireita = setInterval(function(){
				anmRight = window.requestAnimationFrame(moveRight);
				player.img.src = "PlayerW1.png"
			}, 10);
		}
	} else
	if (evt.keyCode === 65){
		if (!pressionadoEsquerda){
			pressionadoEsquerda = setInterval(function(){
				anmLeft = window.requestAnimationFrame(moveLeft);
				player.img.src = "PlayerW2.png"
			}, 10);
		}
	}
});

$(document).on("keypress", function(evt) {
	if (evt.keyCode === 32 || evt.keyCode === 119){
		Jump();
	} else
	if (evt.keyCode === 100){
		moveRight();
	}
});

$(document).on("keyup", function(evt) {
	if (evt.keyCode === 68){
		clearInterval(pressionadoDireita);
		pressionadoDireita = null;
		player.img.src = "Player.png"

	} else
	if (evt.keyCode === 65){
		clearInterval(pressionadoEsquerda);
		pressionadoEsquerda = null;
		player.img.src = "Player.png"
	}
});


function replaceColor(){

    var canvasData = ctxGame.getImageData(player.x, player.y, player.sz, player.sz), //faz uma copia para manipular
        pix = canvasData.data; 

    for (var i = 0, n = pix.length; i < n; i += 4) {//corre pixel por pixel para repor a cor selecionada
        if (pix[i+3] != 0){
        	pix[ i ] = 255;
        	pix[i+1] = 255;
        	pix[i+2] = 255;
        	pix[i+3] = 255;	
        }
    }

    canvasContext.putImageData(canvasData, 0, 0); //repoe o canvas original com a copia modificada
}

