// global variables
var studyInfo = {
  // number of interfaces completed
  numInterfacesDone: 0,
  // interface used (0: ribbon, 1: command maps)
  interfaceId: 0,
  // index of command set used
  setId: 0,
  // index of current phase (0: familiarization, 1: performance)
  phaseId: 0,
  // index of trial within block (30 total for familiarization, 90 total for performance)
  trialId: 0,
  /*
   * data that holds participant accuracy and timing. has following properties:
   *   interfaceId: (int) copied from studyInfo,
   *   setId: (int) copied from studyInfo,
   *   phaseId: (int) copied from studyInfo,
   *   trialId: (int) copied from studyInfo,
   *   command: (Obj) command for trial (from commandSets)
   *   time: (int) time in ms needed to complete trial,
   *   correct: (bool) was user error-free in completing task?
   */
  data: [],
  // new property for happiness test
  ribbon: [],
  commap: []
};

// config vars for study
var config = {
  interfaceNames: ['ribbon', 'commandmap'],
  // holds total time elapsed from midnight Jan 1, 1970 until current trial of study
  totalTime: Date.now(),
  // sound to play when user clicked incorrectly
  wrongSound: new Audio('audio/buzzer.m4a'),
  // instructions for each phase of study
  instructions: [
    'Practice Phase (30 trials): Click this sentence when you\'re ready to start!',
    'Test Phase (90 trials): Click this sentence when you\'re ready to start!'
  ],
  // number of trials in each phase (familiarization and performance, respectively)
  numTrials: [30, 90], // can change to any positive multiple of 6 for testing! :D
  // pre-computed shuffled sets of commands to use
  sets: [],
  // center X coordinate for drawing
  centerX: 645,
  // Y coordinate for drawing command
  commandY: 300,
  // Y coordinate for drawing text
  textY: 360
}

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
  // ribbon interface
  [[
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
  ]],
  // command maps interface (different y coordinates)
  [[
    {t:'Bold text',x:9,y:125,w:28,h:20,p:0,n:0},
    {t:'Justify text',x:407,y:125,w:28,h:20,p:0,n:2},
    {t:'Insert picture',x:1140,y:95,w:50,h:55,p:0,n:4},
    {t:'Change orientation',x:7,y:192,w:60,h:58,p:1,n:0},
    {t:'Change bottom margin',x:350,y:195,w:45,h:20,p:1,n:2},
    {t:'Accept revision',x:445,y:681,w:53,h:58,p:6,n:0}
  ],
  [
    {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
    {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
    {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},
    {t:'Change size',x:67,y:192,w:55,h:58,p:1,n:1},
    {t:'Change left margin',x:255,y:225,w:45,h:20,p:1,n:3},
    {t:'Reject revision',x:497,y:681,w:50,h:58,p:6,n:1}
  ]]
];

// check the click event
function ribbonClick(e) {
  // handle clicks from new phases
  if (studyInfo.trialId === 0) {
    startNewTrial();
    config.totalTime = Date.now();
    
    return;
  }
  
  // handle clicks from within phase by looking at current trial
  var currentTrial = studyInfo.data[studyInfo.data.length - 1];
    
  // re-render pane if clicked to new pane
  rect = collides(rects, e.offsetX, e.offsetY);
  if (rect) {
 		config.currentPane = rect.n;
 
 		var imageObject = new Image();
 		imageObject.onload = function() {
 			config.context.drawImage(imageObject, 0, 55, 1280, 98);
 		};
 		imageObject.src = 'screenshots/'+urls[rect.n]+'.png';
 	}

	// check if correct command clicked on correct pane
	if (config.currentPane == currentTrial.command.p &&
	    collides([currentTrial.command], e.offsetX, e.offsetY)) {
		// update time info for current task
		currentTrial.time = Date.now() - config.totalTime;
		config.totalTime += currentTrial.time;
		
		// end of trial - handle update
		handleTrialUpdate();
	}
	// did not click correct pane, either
	else if (config.currentPane != currentTrial.command.p || !rect) {
	  config.wrongSound.play();
	  currentTrial.correct = false;
	}
}

function commandMapClick(e) {
  // handle clicks from new phases
  if (studyInfo.trialId === 0) {
    startNewTrial();
    config.totalTime = Date.now();
    
    return;
  }
  
  // handle clicks from within phase by looking at current trial
  var currentTrial = studyInfo.data[studyInfo.data.length - 1];
  
  // check if correct command clicked with interface activated
  if (config.activeCommandMapInterface &&
      collides([currentTrial.command], e.offsetX, e.offsetY)) {
    // update time info for current task
		currentTrial.time = Date.now() - config.totalTime;
		config.totalTime += currentTrial.time;
		
		// end of trial - handle update
		handleTrialUpdate();
  }
  else {
    config.wrongSound.play();
	  currentTrial.correct = false;
  }
}

function commandMapKeyDown(e) {
  // do not allow for toggling during non-trial!
  if (studyInfo.trialId === 0) {
    return;
  }
  
  config.keysPressed[e.keyCode] = true;
  
  // Ctrl Shift Z
  if (config.keysPressed[17] && config.keysPressed[16] && config.keysPressed[90]) {
    // not active, so draw it
    if (!config.activeCommandMapInterface) {
      drawCommandMapInterface();
    }
    // toggle by clearing it and drawing command instead
    else {
      drawCommand(studyInfo.data[studyInfo.data.length - 1].command);
    }
    
    config.activeCommandMapInterface = !config.activeCommandMapInterface;
  }
}

function commandMapKeyUp(e) {
  config.keysPressed[e.keyCode] = false;
}

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

// setup for ribbon specifically
function setupRibbon() {
  // index of pane that user is on
  config.currentPane = 0;

  // initialize the basic screen
  config.home = new Image();
  config.body = new Image();
  
  config.home.src = 'screenshots/0home.png';
  config.body.src = 'screenshots/body.png';

  config.head.onload = function() {
  	config.context.drawImage(config.head, 0, 0, 1280, 55);
  };
  
  config.home.onload = function() {
  	config.context.drawImage(config.home, 0, 55, 1280, 98);
  };
  
  config.body.onload = function() {
  	config.context.drawImage(config.body, 0, 155, 1280, 648);
  	startNewPhase(0);
  };
  
  config.canvas.removeEventListener('click', commandMapClick);
  window.removeEventListener('keydown', commandMapKeyDown, true);
  window.removeEventListener('keyup', commandMapKeyUp);
  
  config.canvas.addEventListener('click', ribbonClick);
}

// setup for command map specifically
function setupCommandMap() {
  // has user activated command maps interface?
  config.activeCommandMapInterface = false;
  
  // container of keys that were pressed down
  config.keysPressed = {};
  
  // initialize cm-specific screen
  config.commandMapInterface = new Image();
  config.commandMapInterface.src = 'screenshots/command_maps.png';
  
  config.canvas.removeEventListener('click', ribbonClick);
  
  config.canvas.addEventListener('click', commandMapClick);
  window.addEventListener('keydown', commandMapKeyDown);
  window.addEventListener('keyup', commandMapKeyUp);
  
  startNewPhase(0);
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

// safely shuffles commands (with constraint)
function safeShuffleCommands() {
  var commandSet = rawShuffleCommands(commandSets[studyInfo.interfaceId][studyInfo.setId]);
  var numSwitches = 0;
  
  for (var i = 1; i < commandSet.length; i++) {
    // yay, need pane switch
    if (commandSet[i].p != commandSet[i - 1].p) {
      numSwitches++;
    }
  }
  
  // not enough switches, so try again
  if (numSwitches < 0.5 * commandSet.length) {
    return safeShuffleCommands();
  }
  
  return commandSet;
}

// wrapper for drawing the command maps interface
function drawCommandMapInterface() {
  config.context.drawImage(config.commandMapInterface, 0, 55, 1280, 700);
}

// wrapper for clearing document stuff
function clearDoc() {
  config.context.clearRect(250, 250, 800, 500);
}

// wrapper for clearing entire screen
function clearScreen() {
  config.context.clearRect(0, 55, 1280, 700);
}

// draw command onto page
function drawCommand(commandToDraw) {
  // wipe out only doc in ribbon, but whole screen in cms
  if (studyInfo.interfaceId === 0) {
    clearDoc();
  }
  else {
    clearScreen();
  }

  config.command = new Image();
  config.command.src = 'screenshots/icons/' + commandToDraw.p + commandToDraw.n + '.png';
  config.command.onload = function() {
    loadCommand(commandToDraw.t);
  };
}

// when loaded, draw image and corresponding text
function loadCommand(text) {
  config.context.drawImage(
    config.command,
    config.centerX - 0.5 * config.command.width,
    config.commandY - 0.5 * config.command.height
  );
	config.context.fillText(text, config.centerX, config.textY);
	
	// put reminder about Ctrl Shift Z activation
	if (studyInfo.interfaceId === 1) {
	  config.context.fillText(
	    'Press Ctrl-Shift-Z to toggle the interface!',
	    config.centerX,
	    config.textY - 200
	  );
	}
}

// start new interface for study (note: does not check for whether all interfaces done)
function startNewInterface(interfaceId) {
  // show correct canvas div
  var interfaceDiv = '#'+config.interfaceNames[interfaceId]+'-div';
  $(interfaceDiv).show();
  
  // configure canvas and context based on interface
  config.canvas = document.getElementById(config.interfaceNames[interfaceId]+'-canvas');
  config.context = config.canvas.getContext('2d');
  
  // also set text options on context
  config.context.font = '24px sans-serif';
  config.context.textAlign = 'center';
  
  // precompute shuffled commands to avoid doing this on the fly during experiment
  for (var i = 0; i < config.numTrials.length; i++) {
    config.sets[i] = [];
    for (var j = 0; j < config.numTrials[i]; j++) {
      config.sets[i].push(safeShuffleCommands());
    }
  }
  
  // set up basic components common to both interfaces
  config.head = new Image();
  config.head.src = 'screenshots/header.png';
  config.head.onload = function() {
  	config.context.drawImage(config.head, 0, 0, 1280, 55);
  };
  
  // ribbon-specific setup
  if (interfaceId === 0) {
    setupRibbon();
  }
  // commandmap-specific setup
  else {
    setupCommandMap();
  }

  studyInfo.phaseId = 0;
}

// update for new phase (familiarization 0, performance 1)
function startNewPhase(newPhaseNum) {
  // clear whatever was there before
  if (studyInfo.interfaceId === 0) {
    clearDoc();
  }
  else {
    clearScreen();
  }
  
  // display new instructions
  config.context.fillText(config.instructions[newPhaseNum], config.centerX, config.textY);
  
  studyInfo.trialId = 0;
}

// push clean data for new trial and draw corresponding command
function startNewTrial() {
  // which set of shuffled sets of commands to use
  var shuffledSetId = Math.floor(studyInfo.trialId / commandSets[0][0].length);
  var indexInSet = studyInfo.trialId % commandSets[0][0].length;
	var newCommand = config.sets[studyInfo.phaseId][shuffledSetId][indexInSet];
	studyInfo.data.push({
	    interfaceId: studyInfo.interfaceId,
	    setId: studyInfo.setId,
      phaseId: studyInfo.phaseId,
      trialId: ++studyInfo.trialId,
      command: newCommand,
      time: 0,
      correct: true
    });
	drawCommand(newCommand);
}

// update study info for trial
function handleTrialUpdate() {
  // end of phase 1 - finished an interface!
  if (studyInfo.phaseId === 1 && studyInfo.trialId === config.numTrials[1]) {
    studyInfo.numInterfacesDone++;
    
    // toggle interface and set (this hack okay because only two of them...)
    studyInfo.interfaceId = 1 - studyInfo.interfaceId;
    studyInfo.setId = 1 - studyInfo.setId;
    
    startInstructions();
  }
  // end of phase 0 (familiarization)
  else if (studyInfo.phaseId === 0 && studyInfo.trialId === config.numTrials[0]) {
    startNewPhase(++studyInfo.phaseId);
  }
  else {
    startNewTrial();
  }
  
  if (studyInfo.interfaceId === 1) {
    config.activeCommandMapInterface = false;
  }
}