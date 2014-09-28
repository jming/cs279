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

  // from above start info, set order info
  studyInfo.interfaceOrder = [studyInfo.interfaceId, 1 - studyInfo.interfaceId];
  studyInfo.setOrder = [studyInfo.setId, 1 - studyInfo.setId];

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
    'Soon you will be presented with the <b>Ribbon</b> interface. ' +
    'You can click on a desired command by:' +
    '<ul>' +
    '  <li>Clicking on the pane label on top that describes the command, and then</li>' +
    '  <li>Clicking on the command itself</li>' +
    '</ul>',
    'Soon you will be presented with the <b>CommandMap</b> interface. ' +
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

    studyInfo.demography = [document.getElementById('age').value,
    document.getElementById('gender').value,
    document.getElementById('usage_hour').value,

    document.getElementById('input_device').value,
    document.getElementById('browser').value,
    document.getElementById('os').value];

  displaydata();
}

// display and save data
function displaydata() {
    var outfile = new Blob([
      'trials: ', JSON.stringify(studyInfo.data),
      '\nage: ', studyInfo.demography[0], 
      ', gender: ', studyInfo.demography[1],
      ', usage_hour: ', studyInfo.demography[2],
      ', input_device: ', studyInfo.demography[3], 
      ', browser: ', studyInfo.demography[4],
      ', os: ', studyInfo.demography[5],

      '\nribbon: ', studyInfo.ribbon,
      '\ncommap: ', studyInfo.commap
      ], {type:"text/plain;charset=utf-8"});
    saveAs(outfile, "studyInfo.txt");
}
