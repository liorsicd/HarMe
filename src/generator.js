// get input from user - seq of notes
// receive chord seq from melody Machine
//check chord seq is good (harm Machine)
import HarmMachine from "./harmMachine";
import MelodyMachine from "./melodyMachine.js";
import * as Tone from "tone";

//n-gram parameter
const N = 4;
//similarity parameter (0 to 8)
const SIMILARITY_VAR = 0;
class Generator {
  constructor() {
    this.melodyM = new MelodyMachine();
    this.harmM = new HarmMachine();
    this.probMap = this.harmM.createProbabilitiesMap(N);
  }

  //get list of notes as numbers, return list of notes as letters.
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

  //get list of notes as numbers
  // return list of 3 most likely harmonies that match to those notes
  generateHarmony(notes) {
    console.log(this.probMap);
    var harmonies = [];
    let i = 0;

    while (i < 2) {
      var part = this.translateNumbersToNotes(notes).slice(i * 16, i * 16 + 16);
      var progressions = this.melodyM.getChordsForMelody(part);
      var harm = [];

      for (let p of progressions) {
        let prob = 1;
        for (let j = 1; j < p.length; j++) {
          if (
            this.probMap[p[j - 1]] !== undefined &&
            this.probMap[p[j - 1]][p[j]] !== undefined
          ) {
            prob *= this.probMap[p[j - 1]][p[j]];
          }
        }

        if (!isNaN(prob)) {
          harm.push({ chords: p, prob: prob });
        }
      }

      harm.sort((a, b) => b.prob - a.prob);
      let differentHarms = [harm[0]];
      for (let h = 1; h < harm.length; h++) {
        let notTooSimilar = null;
        for (let d = 0; d < differentHarms.length; d++) {
          notTooSimilar = this.IsNotTooSimilar(differentHarms[d], harm[h]);
          if (notTooSimilar === false) {
            break;
          }
        }
        if (notTooSimilar) {
          differentHarms.push(harm[h]);
        }
        if (differentHarms.length === 3) {
          break;
        }
      }

      harmonies.push(differentHarms);
      i++;
    }

    var concatHarm = [];
    for (let i = 0; i < harmonies[0].length; i++) {
      concatHarm.push(harmonies[0][i].chords.concat(harmonies[1][i].chords));
    }

    return concatHarm;
  }

  //get to chords lists
  //return true if there is less then SIMILARITY_VAR equals chords (at same position)
  IsNotTooSimilar(h1, h2) {
    let counter = 0;
    for (let i = 0; i < h1.chords.length; i++) {
      if (h1.chords[i] === h2.chords[i]) {
        counter++;
      }
    }
    return counter <= SIMILARITY_VAR;
  }
}
export default Generator;
