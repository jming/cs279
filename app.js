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
    happyform();
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

    // hide the consent form
    $('#consent-div').hide();
    // hide the general instructions
    $('#general-instructions-div').hide();
    // display the happiness form
    $('#happy-form-div').show();

    displaydata();
}

// display and save data
function displaydata() {
    console.log("me studyInfo ", studyInfo.setId, studyInfo.phaseId, studyInfo.trialId, 
        studyInfo.data, studyInfo.ribbon, studyInfo.commap); 


    var outfile = new Blob(["setId: ", studyInfo.setId, "  phaseId: ", studyInfo.phaseId, "  trialId: ", studyInfo.trialId, 
        "  data: ", studyInfo.data, "  ribbon: ", studyInfo.ribbon, "  commap: ", studyInfo.commap], {type: "text/plain;charset=utf-8"});
    saveAs(outfile, "studyInfo.txt");
}

