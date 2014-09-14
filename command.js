var canvas = document.getElementById('command-canvas');
var context = canvas.getContext('2d');

var head = new Image();
var commandmap = new Image();
var body = new Image();

head.onload = function() {
	context.drawImage(head, 0, 0, 1280, 55);
};

body.onload = function() {
	context.drawImage(body, 0, 55, 1280, 648);
};

commandmap.onload = function() {
	context.drawImage(commandmap, 0, 55, 1280, 686);

	rect(0,0,100,100);
};

head.src = 'screenshots/header.png';
commandmap.src = 'screenshots/command_maps.png';
body.src = 'screenshots/body.png';

canvas.addEventListener('click', function(e) {
	console.log(e.offsetX, e.offsetY);
});

// {t:'Bold text',x:9,y:125,w:28,h:20,p:0,n:0},
// {t:'Justify text',x:407,y:125,w:28,h:20,p:0,n:2},
// {t:'Insert picture',x:1140,y:95,w:50,h:55,p:0,n:4},

// {t:'Orientation',x:7,y:192,w:60,h:58,p:1,n:0},
// {t:'Bottom margin',x:350,y:195,w:45,h:20,p:1,n:2},

// {t:'Change orientation',x:7,y:192,w:60,h:58,p:1,n:0},
// {t:'Change bottom margin',x:350,y:195,w:45,h:20,p:1,n:2},

// {t:'Accept revision',x:445,y:681,w:53,h:58,p:6,n:0}

// {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
// {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
// {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},

// {t:'Size',x:67,y:192,w:55,h:58,p:1,n:1},
// {t:'Left margin',x:255,y:225,w:45,h:20,p:1,n:3},

// {t:'Change size',x:67,y:192,w:55,h:58,p:1,n:1},
// {t:'Change left margin',x:255,y:225,w:45,h:20,p:1,n:3},

// {t:'Reject revision',x:497,y:681,w:50,h:58,p:6,n:1}


