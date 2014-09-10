var canvas = document.getElementById('ribbon-canvas');
var context = canvas.getContext('2d');
var current_page = 0;

// initialize the basic initial screen

var head = new Image();
var home = new Image();
var body = new Image();

head.onload = function() {
	context.drawImage(head, 0, 0, 1280, 55);
};

home.onload = function() {
	context.drawImage(home, 0, 55, 1280, 98);

	// context.rect(10,55,80,22);
	// context.stroke();
	// context.rect(90,55,70,22);
	// context.stroke();
	// context.rect(160,55,145,22);
	// context.stroke();
	// context.rect(305,55,70,22);
	// context.stroke();
	// context.rect(375,55,67,22);
	// context.stroke();
	// context.rect(442,55,83,22);
	// context.stroke();
	// context.rect(525,55,72,22);
	// context.stroke();

	// context.rect(7,125,28,20);
	// context.stroke();
	// context.rect(35,125,28,20);
	// context.stroke();

	// context.rect(407,125,28,20);
	// context.stroke();
	// context.rect(351,125,28,20);
	// context.stroke();

	// context.rect(1140,95,50,55);
	// context.stroke();
	// context.rect(1040,95,50,55);
	// context.stroke();

};

body.onload = function() {
	context.drawImage(body, 0, 155, 1280, 648);
};

head.src = 'screenshots/header.png';
home.src = 'screenshots/0home.png';
body.src = 'screenshots/body.png';

// create the rectangles

var home_rect = {x:10, y:55, w:80, h:22, n:0};
var layout_rect = {x:90, y:55, w:70, h:22, n:1};
var docelt_rect = {x:160, y:55, w:145, h:22, n:2};
var tables_rect = {x:305, y:55, w:70, h:22, n:3};
var charts_rect = {x:375, y:55, w:67, h:22, n:4};
var smartart_rect = {x:442, y:55, w:83, h:22, n:5};
var review_rect = {x:525, y:55, w:72, h:22, n:6};

var rects = [home_rect, layout_rect, docelt_rect, tables_rect, charts_rect, smartart_rect, review_rect];
var urls = ['0home', '1layout', '2docelt', '3tables', '4charts', '5smartart', '6review'];
// click handlers

var bold = {x:7,y:125,w:28,h:20};
var justify = {x:407,y:125,w:28,h:20};
var insertpic = {x:1140,y:95,w:50,h:55};
var italicize = {x:35,y:125,w:28,h:20};
var center = {x:351,y:125,w:28,h:20};
var inserttb = {x:1040,y:95,w:50,h:55};

var orientation = {x:7,y:92,w:60,h:58};
var size = {x:67,y:92,w:55,h:58};

// orientation
// bottom margin
// size
// left margin

// accept
// reject


canvas.addEventListener('click', function(e) {
	var rect = collides(rects, e.offsetX, e.offsetY);

	if (rect) {
		// console.log(rect);
		current_page = rect.n;

		var imageObject = new Image();
		imageObject.onload = function() {
			context.drawImage(imageObject, 0, 55, 1280, 98);
			context.rect(7,92,60,58);
			context.stroke();
			context.rect(67,92,55,58);
			context.stroke();
		};
		imageObject.src = 'screenshots/'+urls[rect.n]+'.png';
	}
	else {
		// alert('WRONG!');
	}
});

function collides(rects,x,y) {
	var isCollision = false;
	for (var i=0, len=rects.length; i<len; i++) {
		var left = rects[i].x, right = rects[i].x+rects[i].w;
		var top = rects[i].y, bottom = rects[i].y+rects[i].h;
		if (right >= x && left <= x && bottom >= y && top <= y) {
			isCollision = rects[i];
		}
	}
	return isCollision;
}

