// global variables
var canvas = document.getElementById('ribbon-canvas');
var context = canvas.getContext('2d');
var current_pane = 0;
var target_rect = 11;

// also set text options on context
context.font = '24px sans-serif';
context.textAlign = 'center';

// initialize the basic screen
var head = new Image();
var home = new Image();
var body = new Image();
var command = new Image();

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

// create rects to describe each pane
var rects = [home_rect, layout_rect, docelt_rect, tables_rect, charts_rect, smartart_rect, review_rect];
var urls = ['0home', '1layout', '2docelt', '3tables', '4charts', '5smartart', '6review'];

// information for commands of interest
// t (text), x and y (position), w and h (dimension), p (pane), n (number)
var commandSets = [
  [
    {t:'Bold text',x:7,y:125,w:28,h:20,p:0,n:0},
    {t:'Justify text',x:407,y:125,w:28,h:20,p:0,n:2},
    {t:'Insert picture',x:1140,y:95,w:50,h:55,p:0,n:4},
    {t:'Change orientation',x:7,y:92,w:60,h:58,p:1,n:0},
    {t:'Change bottom margin',x:350,y:95,w:45,h:20,p:1,n:2},
    {t:'Accept revision',x:445,y:92,w:53,h:58,p:6,n:0}
  ],
  [
    {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
    {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
    {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},
    {t:'Change size',x:67,y:92,w:55,h:58,p:1,n:1},
    {t:'Change left margin',x:255,y:125,w:45,h:20,p:1,n:3},
    {t:'Reject revision',x:497,y:92,w:50,h:58,p:6,n:1}
  ],
];

// info about study
var studyInfo = {
  // index of command set used
  setId: 0,
  // index of block used (0: familiarization, 1: performance)
  blockId: 0,
  // index of trial within block (30 total for familiarization, 90 total for performance)
  trialId: 0,
  // holds total time elapsed from midnight Jan 1, 1970 until current trial of study
  totalTime: Date.now(),
  // data that holds participant accuracy and timing
  data: [{
    // copied from above
    blockId: 0,
    trialId: 0,
    
    // time in ms needed to complete trial
    time: 0,
    
    // was user error-free in completing task?
    correct: true
  }]
};

// check the click event
canvas.addEventListener('click', function(e) {
  var command = commandSets[studyInfo.setId][studyInfo.trialId % commandSets[0].length];
  var currentData = studyInfo.data[studyInfo.data.length - 1];
	// re-render if any pane is clicked
	var rect = collides(rects, e.offsetX, e.offsetY);
	if (rect) {
		current_pane = rect.n;

		var imageObject = new Image();
		imageObject.onload = function() {
			context.drawImage(imageObject, 0, 55, 1280, 98);
		};
		imageObject.src = 'screenshots/'+urls[rect.n]+'.png';
	}
	
	// check if correct command clicked on correct pane
	if (current_pane == command.p && collides([command], e.offsetX, e.offsetY)) {
		// log time needed for task
		studyInfo.totalTime += currentData.time;
		currentData.time = Date.now() - studyInfo.totalTime;
		console.log(JSON.stringify(studyInfo));
		// TODO: clean this
		studyInfo.trialId++;
		var newCommand = commandSets[studyInfo.setId][studyInfo.trialId % commandSets[0].length];
		drawCommand(newCommand);
	}
	// did not click correct pane, either
	else if (current_pane != command.p || !rect) {
	  currentData.correct = false;
	}
});

// see if click is on one of active regions in rs
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

// shuffles commands in user's command set
function shuffleCommandSet() {
  var commandSet = commandSets[studyInfo.setId];
  for (var i = commandSet.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = commandSet[i];
      commandSet[i] = commandSet[j];
      commandSet[j] = temp;
  }
}

// generate new order of commands safely, i.e., such that at least half involve tab switch
function safelyReorderCommands() {
  shuffleCommandSet();
  var numSwitches = 0;
  var commandSet = commandSets[studyInfo.setId];
  for (var i = 1; i < commandSet.length; i++) {
    // yay, we need tab switch
    if (commandSet[i].p != commandSet[i - 1].p) {
      numSwitches++;
    }
  }
  
  if (numSwitches < 0.5 * commandSet.length) {
    safelyReorderCommands();
  }
}

// wrapper for drawing target command onto document (literally)
function drawCommand(commandToDraw) {
  context.clearRect(400, 250, 500, 500);
  command.src = 'screenshots/icons/' + commandToDraw.p + commandToDraw.n + '.png';
  command.onload = function() {
    var centerX = 617;
    context.drawImage(command, centerX - 0.5 * command.width, 300 - 0.5 * command.height);
  	context.fillText(commandToDraw.t, centerX, 360);
  };
}

// update study info
function updateStudyInfo() {
  //
}

function init() {
  // reorder commands
  safelyReorderCommands();
  
  // draw first command
  drawCommand(commandSets[studyInfo.setId][0]);
}

window.onload = init;