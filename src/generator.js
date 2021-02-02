// get input from user - seq of notes
// receive chord seq from mm
//check chord seq is good (harm Machine)

import HarmMachine from "./harmMachine";
import MelodyMachine from "./melodyMachine.js";

//n-gram parameter
const N = 3;
class Generator {
  constructor() {
    this.melodyM = new MelodyMachine();
    this.harmM = new HarmMachine();
    this.probMap = this.harmM.createProbabilitiesMap(N);
  }

  translateNumbersToNotes(notesAsNumbers){
    //get list of notes as numbers
    //return notes as letters - capital.

  }

  generateHarmony(notes) {
    var progressions = this.melodyM.getChordsForMelody(notes);
    var harmonies = [];
    //debugger;
    for (let p of progressions) {
      let prob = 1;
      for (let i = 1; i < p.length; i++){
        prob *= this.probMap[p[i - 1]][p[i]];
      } 

      if (!isNaN(prob)) {
        harmonies.push({chords:p, prob: prob });
      }
    }

    harmonies.sort((a, b) => b.prob - a.prob);

    return harmonies.slice(0, 3);
  }
}
export default Generator;
