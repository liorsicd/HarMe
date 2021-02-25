import Generator from "./generator";
import * as Tone from 'tone';


const NOTE_TO_NUM = {
  C: 60,
  "C#": 61,
  D: 62,
  "D#": 63,
  Eb: 63,
  E: 64,
  F: 65,
  "F#": 66,
  Gb: 66,
  G: 67,
  "G#": 68,
  Ab: 68,
  A: 69,
  "A#": 70,
  Bb: 70,
  B: 71,
};

const CHORD_FORM = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
};

//dummy from generator
var chordsFromGen = [
  [
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
  ],
  [
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
  ],
  [
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
  ],
];
var currentCol = 0;
var synth = new Tone.PolySynth().toDestination();
var sequencerElements = [];
var chordsTranslation = Translator(chordsFromGen);
var chordsToPlay = chordsFromGen[0].slice();
//var notesToHarmonize = new Array(32);
var sequencer = new Array(32);

window.addEventListener("load", () => initialize());

function initialize() {
  
  //get sequncer object as list
  var listOfCols = document
    .getElementById("stepSeq")
    .shadowRoot.childNodes[2].querySelectorAll(".column");
  for (let i = 0; i < listOfCols.length; i++) {
    sequencerElements.push(listOfCols[i].querySelectorAll(".cell"));
  }
  
  for(let i=0; i<sequencerElements.length; i++){
    for (let j =0; j<sequencerElements[i].length; j++){
      sequencerElements[i][j].setAttribute("id", i+","+j)
      
    } 
  }
  document
  .querySelector("tone-play-toggle")
  .addEventListener("start", () => {
    window.transport.start();
    console.log()
  });
document
  .querySelector("tone-play-toggle")
  .addEventListener("stop", () => {
    window.transport.stop();
    currentCol = 0;
  });


  document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
  
  window.transport.scheduleRepeat(function (time) {
    playChords(time);
  }, "4n");

  document
    .getElementById("harme")
    .addEventListener("click", () => harme());


  var cells = document
    .getElementById("stepSeq")
    .shadowRoot.childNodes[2].querySelectorAll(".cell");

  cells.forEach((item) => {
    item.addEventListener("mousedown", function (e) {
      seqClickHandler(e);
    });
  });

  document
    .querySelector("tone-step-sequencer")
    .addEventListener("trigger", ({ detail }) => {
      playNote(detail.row, detail.time);
    });
  
  createChordTable();

  for (let c = 0; c < sequencer.length; c++) {
    sequencer[c] = new Array(8);
    for (let i = 0; i < sequencer[c].length; i++) {
      sequencer[c][i] = false;
    }
  }
}


function playNote(row, time) {
  //const now = Tone.now();
  let note = row < 3 ? 60 + row * 2 : 59 + row * 2;
  note -= note === 73 ? 1 : 0;
  synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(
    Tone.Frequency(note, "midi").toNote(),
    "16t",
    time
  );
}

function playChords(time) {
  
  let chordToPlay = chordsTranslation[chordsToPlay[currentCol]];
  synth.triggerAttackRelease(chordToPlay, "4t", time);
  currentCol++;
  if (currentCol === 16) {
    currentCol = 0;
  }
}

function chordTranslator(chordString) {
  let chordBase = chordString[0];
  chordBase +=
    chordString.length > 1 &&
    (chordString[1] === "b" || chordString[1] === "#")
      ? chordString[1]
      : "";
  let chord = [];
  let len = chordString.length;
  //major
  if (len === 1 || (len === 2 && chordBase.length === 2)) {
    for (let c of CHORD_FORM["major"]) {
      chord.push(NOTE_TO_NUM[chordBase] + c);
    }
  } else if (
    (len === 2 && chordString[1] === "m") ||
    (len === 3 && chordString[2] === "m")
  ) {
    for (let c of CHORD_FORM["minor"]) {
      chord.push(NOTE_TO_NUM[chordBase] + c);
    }
  }

  for (let i = 0; i < chord.length; i++) {
    chord[i] = Tone.Frequency(chord[i], "midi").toFrequency();
  }

  return chord;
}

function Translator(chordsLists) {
  let translatedChords = {};
  for (let l of chordsLists) {
    for (let c of l) {
      translatedChords[c] = chordTranslator(c);
    }
  }

  return translatedChords;
}

function createChordTable() {
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.setAttribute("id", "chordsTable");
  table.setAttribute("width", "600px");
  for (let i = 0; i < 3; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 16; j++) {
      let col = document.createElement("td");
      col.setAttribute("align", "center");
      let btn = document.createElement("button");
      let value = chordsFromGen[i][j];
      btn.setAttribute("id", i + "," + j);
      if (i === 0) {
        btn.setAttribute("style", "background-color:blue;");
      }
      btn.appendChild(document.createTextNode(value));
      btn.addEventListener("click", function (e) {
        updateChordsToPlay(j, e.path[0], e.path[0].id[0]);
      });
      col.appendChild(btn);

      row.appendChild(col);
    }
    table.appendChild(row);
  }
  document.getElementById("main").appendChild(table);
}

function updateChordsToPlay(index, button, row) {
  chordsToPlay[index] = chordsFromGen[row][index];
  for (let i = 0; i < 3; i++) {
    let currentChord = document.getElementById(i + "," + index);
    if (currentChord.textContent === button.textContent) {
      currentChord.setAttribute("style", "background-color:blue;");
    } else {
      currentChord.setAttribute("style", "background-color:none;");
    }
  }
}

function seqClickHandler(cell) {
  var parent = cell.path[0].parentNode;
  var row = Array.prototype.indexOf.call(parent.children, cell.path[0]);
  parent = cell.path[1].parentNode;
  var col = Array.prototype.indexOf.call(parent.children, cell.path[1]);
  var filledIndex = getFilledCellIndex(col);

  var isFilled = filledIndex === -1 ? true : false;
  sequencer[col][row] = isFilled;
  for (let c = 0; c < sequencerElements[col].length; c++) {
    if (c !== row) {
      if (isFilled) {
        sequencerElements[col][c].setAttribute("disabled", null);
      } else {
        sequencerElements[col][c].removeAttribute("disabled", null);
      }
    }
  }
}

function getFilledCellIndex(col) {
  for (let i = 0; i < sequencer[col].length; i++) {
    if (sequencer[col][i] === true) {
      return i;
    }
  }
  return -1;
}

function getNotesToHarmonize() {
  var notesToHarm = [];
  for (let i = 0; i < sequencer.length; i++) {
    var row = getFilledCellIndex(i);
    if (row !== -1) {
      let note = row < 5 ? 71 - (row - 1) * 2 : 74 - row * 2;
      note -= note === 73 ? 1 : 0;
      notesToHarm.push(note);
    } else {
      notesToHarm.push(-1);
    }
  }

  return notesToHarm;
}

function harme() {
  
  //send notesToHarmonize to generator
  // get list of chords (2 lists of 8)
  
  var generator = new Generator();
  chordsFromGen = generator.generateHarmony(getNotesToHarmonize());
  console.log(chordsFromGen)
  // update chords table in sequncer



  chordsToPlay = chordsFromGen[0].slice();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 16; j++) {
      let button = document.getElementById(i + "," + j);
      button.textContent = chordsFromGen[i][j];
      if (i === 0) {
        button.setAttribute("style", "background-color:blue;");
      } else {
        button.setAttribute("style", "background-color:none;");
      }
    }
  }
  //console.log(chordsToPlay);
  chordsTranslation = Translator(chordsFromGen);
}





