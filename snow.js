
var canvasSnow;
var ctxSnow;
var w;
var h;
var animationFrame;
var arr;
var skyColor = 'hsla(255, 95%, 3%, 3)';

$(document).ready(function(){
	canvasSnow = $('#snow')[0];
	ctxSnow = canvasSnow.getContext("2d");
	w = canvasSnow.width = window.innerWidth;
	h = canvasSnow.height = window.innerHeight;
	arr = [];
	Snowy(100);
});

function Snowy(num) {
	var snow;
	var arrw = [];
	tsc = 1, sp = 1;
	var sc = 1.3, t = 1, mv = 10, min = 1;	
	for (var i = 0; i < num; ++i) {
		snow = new Flake();
		snow.y = Math.random() * (h + 50);
		snow.x = Math.random() * w;
		snow.t = .1;
		snow.sz = (100 / (10 + (Math.random() * 150))) * sc;
		snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
		snow.sp = snow.sp < min ? min : snow.sp;
		snow.moving = true;
		arrw.push(snow);
	}
	arr = arr.concat(arrw);

	window.cancelAnimationFrame(animationFrame)
	go();

	function go(){			
		ctxSnow.clearRect(0, 0, w, h);
		ctxSnow.fillStyle = skyColor;
		ctxSnow.fillRect(0, 0, w, h);
		ctxSnow.fill();
		var flakeToRemove = [];
		for (var i = 0; i < arr.length; ++i) {
			
			f = arr[i]

			if (typeof f !== 'undefined'){
				if (f.moving){
					f.t += Math.random() * .05;
					f.t = f.t >= Math.PI * 2 ? 0 : f.t;
					f.y += f.sp + (Math.random() * 1 ) - 1 ;
					f.x += Math.sin(f.t * tsc) * (f.sz * .3) + .5;
					if (f.y > h) {
						f.moving = false;
						f.y = window.innerHeight;
						flakeToRemove.push(i);
						setTimeout(function(){
							arr[flakeToRemove[0]].y = 0;
							arr[flakeToRemove[0]].moving = true;
							flakeToRemove.shift();
						}, (Math.random() * 5000));
					}
					if (f.x > w + mv) f.x = - mv;
					if (f.x < - mv) f.x = w + mv;
				}
				f.draw();

			}
		}
		animationFrame = window.requestAnimationFrame(go);			
	}
	function Flake() {
		this.draw = function() {
			this.g = ctxSnow.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
			this.g.addColorStop(0, color); /*Variavel cor é buscada do script.js*/
			this.g.fillStyle
			this.g.addColorStop(1, color + "00");
			ctxSnow.moveTo(this.x, this.y);
			ctxSnow.fillStyle = this.g;
			ctxSnow.beginPath();
			ctxSnow.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
			ctxSnow.fill();
		}
	}
}
window.addEventListener('resize', function(){
	canvasSnow.width = w = window.innerWidth;
	canvasSnow.height = h = window.innerHeight;
}, false);