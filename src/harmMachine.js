//get seq of chords , and check the prob of this option

class HarmMachine {
  constructor() {
    this.valid_chords_porg = [
      ["C", "Am", "F", "G7"],
      ["C", "Em", "F", "G7"],
      ["C", "F", "Am", "G7"],
      ["C", "Am", "Dm", "G7"],
      ["C", "G", "F", "G7"],
      // ["Dm", "G", "C", "F", "Bdim", "E7", "Am"],
      // ["Am", "C", "F", "E7"],
    ];

    this.probMap = {};
    for (let chordProg of this.valid_chords_porg) {
      this.updateProbMap(chordProg);
    }

    this.convertToProb();
  }

  generateNGram(n) {
    var nGram = {};

    //generate all n-1 permutations :
    for (let chord of Object.keys(this.probMap)) {
      let perm = this.permutations(chord, n - 1, "");
      perm = perm.split("_");
      perm = perm.slice(0, perm.length - 1);


      for (let p of perm) {
        let prob = 1;
        let perm_as_list = p.split(",");
        for (let i = 0; i < perm_as_list.length - 1; i++) {
          prob *= this.probMap[perm_as_list[i]][perm_as_list[i + 1]];
        }
        nGram[p] = prob;
      }
    }

    console.log(nGram);
    return nGram;
  }

  permutations(chord, m, prefix) {
    let ans = "";
    if (m === 1) {
      return prefix + chord + "_";
    } else {
      let options = Object.keys(this.probMap[chord]);
      for (let option of options) {
        let pre = prefix + chord + ",";
        ans += this.permutations(option, m - 1, pre);
      }
      return ans;
    }
  }

  updateProbMap(data) {
    let map = this.probMap;
    //initialize
    for (let chord of data) {
      if (map[chord] == null) {
        map[chord] = {};
      }
    }

    // counter
    for (let i = 0; i < data.length - 1; i++) {
      map[data[i]][data[i + 1]] =
        map[data[i]][data[i + 1]] == null ? 1 : map[data[i]][data[i + 1]] + 1;
    }
    this.probMap = map;
  }

  convertToProb() {
    let map = this.probMap;
    for (let chord of Object.keys(map)) {
      let sum = 0;
      for (let nextChord of Object.keys(map[chord])) {
        sum += map[chord][nextChord];
      }

      for (let nextChord of Object.keys(map[chord])) {
        map[chord][nextChord] /= sum;
      }
    }

    this.probMap = map;
  }
}

export default HarmMachine;
