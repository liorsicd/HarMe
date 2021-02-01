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
    this.probMap = harmM.createProbabilitiesMap(N);
  }

  generateHarmony(notes) {
    var progressions = this.melodyM.getChordsForMelody(notes);
    var harmonies = [];
    for (let p of progressions) {
      let prob = 1;
      for (let i = 1; i < p.length; i++) {
        prob *= this.probMap[p[i - 1]][p[i]];
      }
      harmonies.push({ p: prob });
    }

    harmonies.sort((a, b) => a[1] - b[1]);

    return Object.keys(harmonies).slice(0,3);
  }
}
