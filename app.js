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

function start() {
  // hide instructions
  $('#general-instructions-div').hide();
  
  // start selected interface
  startNewInterface(studyInfo.interfaceId);
}

// generate the active interface being used
    // familiarization instructions
    // familiarization actions
    // performance instructions
    // familiarization actions

// generate next interface
    // familiarization instructions
    // familiarization actions
    // performance instructions
    // familiarization actions

// fill in table

// display data