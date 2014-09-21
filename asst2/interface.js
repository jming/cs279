// global variables
var studyInfo = {
  // number of interfaces completed
  numInterfacesDone: 0,
  // interface used (0: ribbon, 1: command maps)
  interfaceId: 0,
  // order in which interfaces are shown
  interfaceOrder: [],
  // index of command set used
  setId: 0,
  // order in which command sets are shown
  setOrder: [],
  // index of current phase (0: familiarization, 1: performance)
  phaseId: 0,
  // index of trial within block (30 familiarization, 90 performance)
  trialId: 0,
  /*
   * data that holds participant accuracy and timing. has following properties:
   *   interfaceOrder: (int array) copied from studyInfo,
   *   interfaceId: (int) copied from studyInfo,
   *   setOrder: (int array) copied from studyInfo,
   *   setId: (int) copied from studyInfo,
   *   phaseId: (int) copied from studyInfo,
   *   trialId: (int) copied from studyInfo,
   *   command: (Obj) command for trial (from commandSets)
   *   sameParent: (bool) is this command in same parent pane as last one?
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
  // total time elapsed from midnight Jan 1, 1970 until current trial of study
  totalTime: Date.now(),
  // sound to play when user clicked incorrectly
  wrongSound: new Audio('audio/buzzer.m4a'),
  // instructions for each phase of study
  instructions: [
    'Practice Phase (30 trials): Click [here] when you\'re ready to start!',
    'Test Phase (90 trials): Click [here] when you\'re ready to start!'
  ],
  // number of trials in each phase (familiarization and performance)
  numTrials: [18, 36],
  // pre-computed shuffled sets of commands to use
  sets: [],
  // center X coordinate for drawing
  centerX: 645,
  // Y coordinate for drawing command (ribbon and cms)
  commandYs: [300, 500],
  // Y coordinate for drawing text
  textYs: [360, 560],
  // user must click next to continue to next trial
  mustClickNext: false
};

// define the active regions
var home_rect = {x:10, y:55, w:80, h:22, n:0};
var layout_rect = {x:90, y:55, w:70, h:22, n:1};
var docelt_rect = {x:160, y:55, w:145, h:22, n:2};
var tables_rect = {x:305, y:55, w:70, h:22, n:3};
// var charts_rect = {x:375, y:55, w:67, h:22, n:4};
// var smartart_rect = {x:442, y:55, w:83, h:22, n:5};
// var review_rect = {x:525, y:55, w:72, h:22, n:6};
// var next_rect = {x:600, y:750, w:100, h:50, n:7};

// create rects to describe each pane
var rects = [home_rect, layout_rect, docelt_rect, tables_rect];
var urls = ['0home', '1layout', '2docelt', '3tables'];

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
    // {t:'Accept revision',x:445,y:92,w:53,h:58,p:6,n:0}
    {t:'Change cell shading',x:1002,y:95,w:45,h:30,p:3,n:0}
  ],
  [
    {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
    {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
    {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},
    {t:'Change size',x:67,y:92,w:55,h:58,p:1,n:1},
    {t:'Change left margin',x:255,y:125,w:43,h:20,p:1,n:3},
    // {t:'Reject revision',x:497,y:92,w:50,h:58,p:6,n:1}
    {t:'Change cell lines',x:1002,y:120,w:45,h:30,p:3,n:1}
  ]],
  // command maps interface (different y coordinates)
  [[
    {t:'Bold text',x:9,y:125,w:28,h:20,p:0,n:0},
    {t:'Justify text',x:407,y:125,w:28,h:20,p:0,n:2},
    {t:'Insert picture',x:1140,y:95,w:50,h:55,p:0,n:4},
    {t:'Change orientation',x:7,y:192,w:60,h:58,p:1,n:0},
    {t:'Change bottom margin',x:350,y:195,w:45,h:20,p:1,n:2},
    // {t:'Accept revision',x:445,y:681,w:53,h:58,p:6,n:0}
    {t:'Change cell shading',x:1002,y:390,w:45,h:30,p:3,n:0}
  ],
  [
    {t:'Italicize text',x:35,y:125,w:28,h:20,p:0,n:1},
    {t:'Center text',x:351,y:125,w:28,h:20,p:0,n:3},
    {t:'Insert text box',x:1040,y:95,w:50,h:55,p:0,n:5},
    {t:'Change size',x:67,y:192,w:55,h:58,p:1,n:1},
    {t:'Change left margin',x:255,y:225,w:45,h:20,p:1,n:3},
    // {t:'Reject revision',x:497,y:681,w:50,h:58,p:6,n:1}
    {t:'Change cell lines',x:1002,y:420,w:45,h:30,p:3,n:1}
  ]]
];

// quasi-command for next button wth invariant that p and n not overlapping
// with actual command! two entries, one for each interface
var nextCommand = [
  {t:'Good job! :)',x:572,y:268,w:155,h:70,p:9,n:9},
  {t:'Good job! :)',x:572,y:468,w:155,h:70,p:9,n:9}
];

// in ribbons interface, change pane based on click event and
// return true iff pane was updated
function maybeChangePane(e) {
  rect = collides(rects, e.offsetX, e.offsetY);
  if (rect) {
    config.currentPane = rect.n;
 
    var imageObject = new Image();
    imageObject.onload = function() {
      config.context.drawImage(imageObject, 0, 55, 1280, 98);
    };
    imageObject.src = 'screenshots/'+urls[rect.n]+'.png';

    return true;
  }

  return false;
}

// check all click events
function clickHandler(e) {
  // handle clicks from new phases
  if (studyInfo.trialId === 0) {
    startNewTrial();
    config.totalTime = Date.now();
    
    return;
  }

  // handle clicks where user must click 'next'
  if (config.mustClickNext) {
    // user actually clicked 'next' button/command
    if (collides([nextCommand[studyInfo.interfaceId]], e.offsetX, e.offsetY)) {
      config.mustClickNext = false;
      startNewTrial();
      config.totalTime = Date.now();
    }

    return;
  }

  // handle clicks from within phase by looking at current trial
  var currentTrial = studyInfo.data[studyInfo.data.length - 1];

  var changedPane = false;
  if (studyInfo.interfaceId === 0) {
    changedPane = maybeChangePane(e);
  }

  // pane is correct if in cms interface (1) or in correct ribbons interface
  var correctPane =
    studyInfo.interfaceId || config.currentPane == currentTrial.command.p;

  // clicked on correct target
  if (correctPane && collides([currentTrial.command], e.offsetX, e.offsetY)) {
    // update time info for current task
    currentTrial.time = Date.now() - config.totalTime;
    config.totalTime += currentTrial.time;
    
    // examine previous command parent pane if second trial or onward
    if (studyInfo.trialId > 1) {
      var prevTrial = studyInfo.data[studyInfo.data.length - 2];
      currentTrial.sameParent = currentTrial.command.p === prevTrial.command.p;
    }

    console.log(currentTrial);
    // end of trial - handle update
    handleTrialUpdate();
  }
  // no change to correct pane
  else if (studyInfo.interfaceId || !correctPane || !changedPane) {
    config.wrongSound.play();
    currentTrial.correct = false;
  }

  console.log(e.offsetX + ' ' + e.offsetY);
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
}

// setup for command map specifically
function setupCommandMap() {
  // initialize cm-specific screen
  config.commandMapInterface = new Image();
  config.commandMapInterface.src = 'screenshots/command_maps.png';
  config.commandMapInterface.onload = function() {
    config.context.drawImage(config.commandMapInterface, 0, 55, 1280, 400);
  };
  
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
  var commandSet = rawShuffleCommands(
    commandSets[studyInfo.interfaceId][studyInfo.setId]);
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

// clear command section depending on interface
function clearPrevCommand() {
  if (studyInfo.interfaceId === 0) {
    config.context.clearRect(250, 250, 800, 500);
  }
  else {
    config.context.clearRect(250, 460, 800, 500);
  }
}

// draw command onto page
function drawCommand(commandToDraw) {
  clearPrevCommand();
  config.command = new Image();
  config.command.src = 
    'screenshots/icons/' + commandToDraw.p + commandToDraw.n + '.png';
  config.command.onload = function() {
    loadCommand(commandToDraw.t);
  };
}

// when loaded, draw image and corresponding text
function loadCommand(text) {
  config.context.drawImage(
    config.command,
    config.centerX - 0.5 * config.command.width,
    config.commandYs[studyInfo.interfaceId] - 0.5 * config.command.height
  );

  config.context.fillText(
    text, config.centerX, config.textYs[studyInfo.interfaceId]);
}

// start new interface for study
function startNewInterface(interfaceId) {
  // show correct canvas div
  var interfaceDiv = '#'+config.interfaceNames[interfaceId]+'-div';
  $(interfaceDiv).show();
  
  // configure canvas and context based on interface
  config.canvas = document.getElementById(
    config.interfaceNames[interfaceId]+'-canvas');
  config.context = config.canvas.getContext('2d');
  
  // also set text options on context
  config.context.font = '24px sans-serif';
  config.context.textAlign = 'center';
  
  // precompute shuffled commands to avoid doing this on the fly 
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
  
  config.canvas.addEventListener('click', clickHandler);

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
  clearPrevCommand();

  // display new instructions
  config.context.fillText(
    config.instructions[newPhaseNum],
    config.centerX,
    config.textYs[studyInfo.interfaceId]
  );
  
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
    interfaceOrder: studyInfo.interfaceOrder,
    setId: studyInfo.setId,
    setOrder: studyInfo.setOrder,
    phaseId: studyInfo.phaseId,
    trialId: ++studyInfo.trialId,
    command: newCommand,
    sameParent: false,   
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
  else if (studyInfo.phaseId === 0 && 
           studyInfo.trialId === config.numTrials[0]) {
    startNewPhase(++studyInfo.phaseId);
  }
  else {
    config.mustClickNext = true;
    drawCommand(nextCommand[studyInfo.interfaceId]);
  }
}