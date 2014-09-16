// select condition 1, 2, 3, or 4
function setVariables(condition) {
  // set the start interface and command set
  if (condition == 1) {
      studyInfo.interfaceId = 0;
      studyInfo.setId = 0;
  } else if (condition == 2) {
      studyInfo.interfaceId = 0;
      studyInfo.setId = 1;
  } else if (condition == 3) {
      studyInfo.interfaceId = 1;
      studyInfo.setId = 0;
  } else {
      studyInfo.interfaceId = 1;
      studyInfo.setId = 1;
  }

  // hide the consent form
  $('#consent-div').hide();
  // display the general instructions
  $('#general-instructions-div').show();
}

function startInstructions() {
  // hide general instructions
  $('#general-instructions-div').hide();
  
  // hide previous canvas
  var otherDiv = '#'+config.interfaceNames[1 - studyInfo.interfaceId]+'-div';
  $(otherDiv).hide();
  
  // did all the interfaces - so happy!
  if (studyInfo.numInterfacesDone === 2) {
    startHappiness();
    return;
  }
  
  // for ribbons and command maps, respectively
  var instructions = [
    'Soon you will be presented with the <b>Ribbons</b> interface. ' +
    'You can click on a desired command by:' +
    '<ul>' +
    '  <li>Clicking on the pane label on top that describes the command, and then</li>' +
    '  <li>Clicking on the command itself</li>' +
    '</ul>',
    'Soon you will be presented with the <b>Command Maps</b> interface. ' +
    'You can click on a desired command by:' +
    '<ul>' +
    '  <li>Toggling the interface by pressing Ctrl-Shift-Z (together), and then</li>' +
    '  <li>Clicking on the desired command</li>' +
    '</ul>'
  ];
  
  // show instructions and corresponding div
  $('#interface-specifics').html(instructions[studyInfo.interfaceId]);
  $('#interface-instructions-div').show();
}

function startAction() {
  // hide interface instructions
  $('#interface-instructions-div').hide();
  
  // start selected interface
  startNewInterface(studyInfo.interfaceId);
}

function startHappiness() {
  // display the happiness form
  $('#happy-form-div').show();
}

// generate the active interface being used
    // instructions for the interface
    // familiarization instructions
    // familiarization actions
    // performance instructions
    // familiarization actions

// generate next interface
    // instructions for the interface
    // familiarization instructions
    // familiarization actions
    // performance instructions
    // familiarization actions

// fill in table
function happyform() {
    studyInfo.ribbon = [document.getElementById('ribbon_1').value,
    document.getElementById('ribbon_2').value,
    document.getElementById('ribbon_3').value,
    document.getElementById('ribbon_4').value,
    document.getElementById('ribbon_5').value];

    studyInfo.commap = [document.getElementById('commap_1').value,
    document.getElementById('commap_2').value,
    document.getElementById('commap_3').value,
    document.getElementById('commap_4').value,
    document.getElementById('commap_5').value];

    displaydata();
}

// display and save data
function displaydata() {
    console.log("me studyInfo ", studyInfo.setId, studyInfo.phaseId, studyInfo.trialId,
        studyInfo.data, studyInfo.ribbon, studyInfo.commap);
    // var outfile = new Blob(["setId: ", studyInfo.setId, "  phaseId: ", studyInfo.phaseId, "  trialId: ", studyInfo.trialId,
    //     "  data: ", studyInfo.data, "  ribbon: ", studyInfo.ribbon, "  commap: ", studyInfo.commap], {type: "text/plain;charset=utf-8"});
    var outfile = new Blob([
      'trials: ', JSON.stringify(studyInfo.data),
      '\nribbon: ', studyInfo.ribbon,
      '\ncommap: ', studyInfo.commap
      ], {type:"text/plain;charset=utf-8"});
    saveAs(outfile, "studyInfo.txt");
}