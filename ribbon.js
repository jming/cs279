// global variables
var canvas = document.getElementById('ribbon-canvas');
var context = canvas.getContext('2d');
var currentPane = 0;

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

command.onload = function() {
  context.drawImage(command, 580, 300);
}

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
var next_rect = {x:600, y:750, w:100, h:50, n:7};

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

    {t:'Orientation',x:7,y:92,w:60,h:58,p:1,n:0},
    {t:'Bottom margin',x:350,y:95,w:45,h:20,p:1,n:2},

    {t:'Change orientation',x:7,y:92,w:60,h:58,p:1,n:0},
    {t:'Change bottom margin',x:350,y:95,w:45,h:20,p:1,n:2},

    {t:'Accept revision',x:445,y:92,w:53,h:58,p:6,n:0}
  ],
  [
    {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
    {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
    {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},

    {t:'Size',x:67,y:92,w:55,h:58,p:1,n:1},
    {t:'Left margin',x:255,y:125,w:45,h:20,p:1,n:3},

    {t:'Change size',x:67,y:92,w:55,h:58,p:1,n:1},
    {t:'Change left margin',x:255,y:125,w:45,h:20,p:1,n:3},

    {t:'Reject revision',x:497,y:92,w:50,h:58,p:6,n:1}
  ],
];


var studyInfo = {
  // index of command set used
  setId: 0,
  // index of current phase  (0: familiarization, 1: performance)
  phaseId: 0,
  // index of trial within block (30 total for familiarization, 90 total for performance)
  trialId: 0,
  /*
   * data that holds participant accuracy and timing. has following properties:
   *   phaseId: (int) copied from studyInfo,
   *   trialId: (int) copied from studyInfo,
   *   command: (Obj) command for trial (from commandSets)
   *   time: (int) time in ms needed to complete trial,
   *   correct: (bool) was user error-free in completing task?
   */
  data: []
};

// config vars for study
var config = {
  // holds total time elapsed from midnight Jan 1, 1970 until current trial of study
  totalTime: Date.now(),
  // sound to play when user clicked incorrectly
  wrongSound: new Audio('audio/buzzer.mp3'),
  // instructions for each phase of study
  instructions: [
    'Familiarization instructions!',
    'Performance instructions!'
  ],
  // number of trials in each phase
  numTrials: [30, 90],
  // pre-computed shuffled sets of commands to use
  sets: [],
  // center X coordinate for drawing
  centerX: 617,
  // Y coordinate for drawing command
  commandY: 300,
  // Y coordinate for drawing text
  textY: 360
}

// check the click event
canvas.addEventListener('click', function(e) {
  // handle clicks from new phases
  if (studyInfo.trialId === 0) {
    startNewTrial();
    config.totalTime = Date.now();
    
    return;
  }
  
  // handle clicks from within phase by looking at current trial
  var currentTrial = studyInfo.data[studyInfo.data.length - 1];

  //check if clicked next and user can go to next interface
  rect = collides(next_rect, e.offsetX, e.offsetY);
  if(rect && next)
    drawCommandMap();

	// check if correct command clicked on correct pane
	if (currentPane == currentTrial.command.p &&
	    collides([currentTrial.command], e.offsetX, e.offsetY)) {
		// update time info for current task
		currentTrial.time = Date.now() - config.totalTime;
		config.totalTime += currentTrial.time;
		
		// end of trial - handle update
		handleTrialUpdate();
	}
	// did not click correct pane, either
	else if (currentPane != currentTrial.command.p || !rect) {
	  config.wrongSound.play();
	  currentTrial.correct = false;
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

// shuffles given commands
function rawShuffleCommands(commands) {
  // do quasi-deep copy
  var newCommands = commands.slice();
  for (var i = newCommands.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = newCommands[i];
      newCommands[i] = newCommands[j];
      newCommands[j] = temp;
  }
  
  return newCommands;
}

// draw CommandMaps
function drawCommandMap() {
    var imageObject = new Image();
    var imageButton = new Image();
    imageObject.onload = function() {
      context.drawImage(imageObject, 0, 55, 1280, 700);
      context.drawImage(body, 0, 700, 1280, 648);

      if (studyInfo.next)
        context.drawImage(imageButton, 600, 750, 100, 50);
      
    }
    imageObject.src = 'screenshots/command_maps.png';
    imageButton.src = 'screenshots/next.png';
}

// wrapper for clearing document stuff
function clearDoc() {
    context.clearRect(400, 250, 500, 500);
}

// draw target command onto document (literally)
function drawCommand(commandToDraw) {
  clearDoc();
  command.src = 'screenshots/icons/' + commandToDraw.p + commandToDraw.n + '.png';
  command.onload = function() {
    loadCommand(commandToDraw.t);
  };
}

// when loaded, draw image and corresponding text
function loadCommand(text) {
  context.drawImage(
    command,
    config.centerX - 0.5 * command.width,
    config.commandY - 0.5 * command.height
  );
	context.fillText(text, config.centerX, config.textY);
}

// update study info for trial
function handleTrialUpdate() {
  console.log('phase: ' + studyInfo.phaseId + '\ntrial: ' + studyInfo.trialId);
  // end of study!
  if (studyInfo.phaseId === 1 && studyInfo.trialId === 90) {
    alert('done!');
    return;
  }
  
  // end of phase 0 (familiarization)
  if (studyInfo.phaseId === 0 && studyInfo.trialId === 30) {
    startNewPhase(++studyInfo.phaseId);
    return;
  }
  
	startNewTrial();
}

// update for new phase (intro 0, familiarization 1, performance 2)
function startNewPhase(newPhaseNum) {
  clearDoc();
  
  // TODO: set pane to blank or whatever
  
  // display new instructions
  context.fillText(config.instructions[newPhaseNum], config.centerX, config.textY);
  
  studyInfo.trialId = 0;
}

// push clean data for new trial and draw corresponding command
function startNewTrial() {
  // which set of shuffled sets of commands to use
  var shuffledSetId = Math.floor(studyInfo.trialId / commandSets[0].length);
  var indexInSet = studyInfo.trialId % commandSets[0].length;
	var newCommand = config.sets[studyInfo.phaseId][shuffledSetId][indexInSet];
	studyInfo.data.push({
      phaseId: studyInfo.phaseId,
      trialId: ++studyInfo.trialId,
      command: newCommand,
      time: 0,
      correct: true
    });
	drawCommand(newCommand);
}

function init() {
  // TODO: set to random and record in data
  studyInfo.setId = 0;
  
  // precompute shuffled commands to avoid doing this on the fly during experiment
  for (var i = 0; i < config.numTrials.length; i++) {
    config.sets[i] = [];
    for (var j = 0; j < config.numTrials[i]; j++) {
      config.sets[i].push(safeShuffleCommands());
    }
  }
  
  startNewPhase(0);
}

window.onload = init;