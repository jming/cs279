// global variables

var canvas = document.getElementById('ribbon-canvas');
var context = canvas.getContext('2d');
var current_page = 0;
var target_rect = 11;

// initialize the basic screen

var head = new Image();
var home = new Image();
var body = new Image();

head.onload = function() {
	context.drawImage(head, 0, 0, 1280, 55);
};

home.onload = function() {
	context.drawImage(home, 0, 55, 1280, 98);
};

body.onload = function() {
	context.drawImage(body, 0, 155, 1280, 648);
};

head.src = 'screenshots/header.png';
home.src = 'screenshots/0home.png';
body.src = 'screenshots/body.png';

// define the active regions

var home_rect = {x:10, y:55, w:80, h:22, n:0};
var layout_rect = {x:90, y:55, w:70, h:22, n:1};
var docelt_rect = {x:160, y:55, w:145, h:22, n:2};
var tables_rect = {x:305, y:55, w:70, h:22, n:3};
var charts_rect = {x:375, y:55, w:67, h:22, n:4};
var smartart_rect = {x:442, y:55, w:83, h:22, n:5};
var review_rect = {x:525, y:55, w:72, h:22, n:6};

var rects = [home_rect, layout_rect, docelt_rect, tables_rect, charts_rect, smartart_rect, review_rect];
var urls = ['0home', '1layout', '2docelt', '3tables', '4charts', '5smartart', '6review'];

var bold = {x:7,y:125,w:28,h:20,n:0};
var italicize = {x:35,y:125,w:28,h:20,n:1};
var justify = {x:407,y:125,w:28,h:20,n:2};
var center = {x:351,y:125,w:28,h:20,n:3};
var insertpic = {x:1140,y:95,w:50,h:55,n:4};
var inserttb = {x:1040,y:95,w:50,h:55,n:5};

var home_rects = [bold, italicize, justify, center, insertpic, inserttb];

var orientation = {x:7,y:92,w:60,h:58,n:0};
var size = {x:67,y:92,w:55,h:58,n:1};
var bottommar = {x:350,y:95,w:45,h:20,n:2};
var leftmar = {x:255,y:125,w:45,h:20,n:3};

var layout_rects = [orientation, size, bottommar, leftmar];

var accept = {x:445,y:92,w:53,h:58,n:0};
var reject = {x:497,y:92,w:50,h:58,n:1};

var review_rects = [accept, reject];

// check the click event
canvas.addEventListener('click', function(e) {

	// check if a tab rectangle is clicked
	var rect = collides(rects, e.offsetX, e.offsetY);
	if (rect) {
		current_page = rect.n;

		var imageObject = new Image();
		imageObject.onload = function() {
			context.drawImage(imageObject, 0, 55, 1280, 98);
		};
		imageObject.src = 'screenshots/'+urls[rect.n]+'.png';
	}
	else {

		if (current_page === 0) {
			rect = collides(home_rects, e.offsetX, e.offsetY);
		}
		else if (current_page == 1) {
			rect = collides(layout_rects, e.offsetX, e.offsetY);
		}
		else if (current_page == 6) {
			rect = collides(review_rects, e.offsetX, e.offsetY);
		}

		if (rect) {
			alert('some target clicked');
		}

		if (rect.n == target_rect) {
			// TODO: alert correct
			// alert('target clicked');
		}
		else {
			// TODO: alert incorrect
			// alert('nontarget clicked');
		}
	}

	// TODO: record click timing and location
	console.log(rect);
});

// see if click is on an active region
function collides(rs,x,y) {

	var isCollision = false;
	for (var i=0, len=rs.length; i<len; i++) {
		var left = rs[i].x, right = rs[i].x+rs[i].w;
		var top = rs[i].y, bottom = rs[i].y+rs[i].h;
		if (right >= x && left <= x && bottom >= y && top <= y) {
			isCollision = rs[i];
		}
	}
	return isCollision;
}

