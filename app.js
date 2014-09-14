var START_INTERFACE = null;
var START_SET = null;

// select condition 1, 2, 3, or 4
function setVariables(condition) {

    // set the start interface and command set
    if (condition == 1) {
        START_INTERFACE = 0;
        START_SET = 0;
    } else if (condition == 2) {
        START_INTERFACE = 0;
        START_SET = 1;
    } else if (condition == 3) {
        START_INTERFACE = 1;
        START_SET = 0;
    } else {
        START_INTERFACE = 1;
        START_SET = 1;
    }

    // hide the consent form
    $('#consent-div').hide();
    // display the general instructions
    $('#general-instructions-div').show();
}

function start() {
    
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