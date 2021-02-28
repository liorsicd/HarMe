import Generator from "./generator";
import * as Tone from "tone";

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
/*
const midiNotes = []
midiNotes.push(await Midi.fromUrl("/src/midi/C3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/D3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/E3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/F3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/G3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/A3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/B3.mid"));
midiNotes.push(await Midi.fromUrl("/src/midi/C4.mid"));


const keys = new Tone.Players({
  urls: {
    0: "C3.mp3",
    1: "D3.mp3",
    2: "E3.mp3",
    3: "F3.mp3",
    4: "G3.mp3",
    5: "A3.mp3",
    6: "B3.mp3",
    7: "C4.mp3",
  },
  fadeOut: "64n",
  baseUrl: "/src/midi",
}).toDestination();

*/
var rev = new Tone.Reverb(2).toDestination();
var synth = new Tone.PolySynth().toDestination();
var chordSynth = new Tone.PolySynth().toDestination().connect(rev);
synth.volume.value = 10;
var lastCol = -1;

chordSynth.volume.value = -5;
var sequencerElements = [];
var chordsTranslation = null;
var chordsToPlay = null;
var sequencer = new Array(32);
//var mouseDown = false;
window.addEventListener("load", () => initialize());

function initialize() {
  //get sequencer object as list
  var listOfCols = document
    .getElementById("stepSeq")
    .shadowRoot.childNodes[2].querySelectorAll(".column");
  for (let i = 0; i < listOfCols.length; i++) {
    sequencerElements.push(listOfCols[i].querySelectorAll(".cell"));
  }

  for (let i = 0; i < sequencerElements.length; i++) {
    for (let j = 0; j < sequencerElements[i].length; j++) {
      sequencerElements[i][j].setAttribute("id", i + "," + j);
    }
  }
  document.querySelector("tone-play-toggle").addEventListener("start", () => {
    window.transport.start();
  });
  document.querySelector("tone-play-toggle").addEventListener("stop", () => {
    window.transport.stop();
    currentCol = 0;
  });

  document
    .querySelector("tone-slider")
    .addEventListener(
      "input",
      (e) => (Tone.Transport.bpm.value = parseFloat(e.target.value))
    );

  window.transport.scheduleRepeat(function (time) {
    playChords(time);
  }, "4n");

  document.getElementById("harme").addEventListener("click", () => harme());
  document.getElementById("clear").addEventListener("click", () => window.location.reload())
  /*
  document.getElementById("stepSeq").addEventListener("mousedown",e =>{
    mouseDown= true;
  })
  document.getElementById("stepSeq").addEventListener("mouseup",e =>{
    mouseDown= false;
  })
  */
  var cells = document
    .getElementById("stepSeq")
    .shadowRoot.childNodes[2].querySelectorAll(".cell");

  cells.forEach((item) => {
    item.addEventListener("mousedown", function (e) {
      seqClickHandler(e);
    });

    item.addEventListener("mouseup", function(e){
      unableAll();
    })
  });
  document
    .querySelector("tone-step-sequencer")
    .addEventListener("trigger", ({ detail }) => {
      playNote(detail.row, detail.time);
    });

  for (let c = 0; c < sequencer.length; c++) {
    sequencer[c] = new Array(8);
    for (let i = 0; i < sequencer[c].length; i++) {
      sequencer[c][i] = false;
    }
  }
}

function playNote(row, time) {
  // keys.player(row).start(time, 0, "16t");

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
  if (chordsTranslation !== null) {
    let chordToPlay = chordsTranslation[chordsToPlay[currentCol]];
    chordSynth.triggerAttackRelease(chordToPlay, "4t", time);
    currentCol++;
    if (currentCol === 16) {
      currentCol = 0;
    }
  }
}

function chordTranslator(chordString) {
  let chordBase = chordString[0];
  chordBase +=
    chordString.length > 1 && (chordString[1] === "b" || chordString[1] === "#")
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
    if (i === Number(row)) {
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
  disableAll(col);
  lastCol = col;
}


function disableAll(col) {
  for (let i = 0; i < sequencerElements.length; i++) {
    for (let j = 0; j < sequencerElements[i].length; j++) {
      if (i !== col) {
        sequencerElements[i][j].setAttribute("disabled", null);
      }
    }
  }
}

function unableAll(){
  for (let i = 0; i < sequencerElements.length; i++) {
    for (let j = 0; j < sequencerElements[i].length; j++) {
      if (i !== lastCol) {
        sequencerElements[i][j].removeAttribute("disabled", null);
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
  if (chordsToPlay === null) {
    createChordTable();
  }
  //send notesToHarmonize to generator
  // get list of chords
  var generator = new Generator();

  chordsFromGen = generator.generateHarmony(getNotesToHarmonize());
  
  chordsTranslation = Translator(chordsFromGen);

  // update chords table in sequencer
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
