// get input from user - seq of notes
// receive chord seq from mm
//check chord seq is good (harm Machine)

import HarmMachine from "./harmMachine";
import MelodyMachine from "./melodyMachine.js";
import * as Tone from "tone";

//n-gram parameter
const N = 3;
class Generator {
  constructor() {
    this.melodyM = new MelodyMachine();
    this.harmM = new HarmMachine();
    this.probMap = this.harmM.createProbabilitiesMap(N);
  }

  translateNumbersToNotes(notesAsNumbers) {
    var translated = [];
    for (let note of notesAsNumbers) {
      if (note === -1) {
        translated.push(note);
      } else {
        translated.push(Tone.Frequency(note, "midi").toNote()[0]);
      }
    }

    return translated;
  }

  generateHarmony(notes) {
    var harmonies = [];
    let i = 0;
    while (i < 2) {
      var part = this.translateNumbersToNotes(notes).slice(i * 16, i * 16 + 16);
      var progressions = this.melodyM.getChordsForMelody(part);
      var harm = [];
      for (let p of progressions) {
        let prob = 1;
        for (let i = 1; i < p.length; i++) {
          prob *= this.probMap[p[i - 1]][p[i]];
        }

        if (!isNaN(prob)) {
          harm.push({ chords: p, prob: prob });
        }
      }

      harm.sort((a, b) => b.prob - a.prob);
      harm = harm.slice(0, 3);
      harmonies.push(harm);
      i++;
    }

    var concatHarm = [];
    for (let i = 0; i < harmonies[0].length; i++) {
      concatHarm.push(harmonies[0][i].chords.concat(harmonies[1][i].chords));
    }

    return concatHarm;
  }
}
export default Generator;
