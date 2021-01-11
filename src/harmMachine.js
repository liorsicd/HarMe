//get seq of chords , and check the prob of this option

class HarmMachine {
  constructor() {
    this.valid_chords_map = {
      C: { G: 0.25, F: 0.5, Am: 0.25 },
      Dm: { G: 0.25, F: 0.5, Am: 0.25 },
      Em: { G: 0.25, F: 0.5, Am: 0.25 },
      F: { G: 0.25, F: 0.5, Am: 0.25 },
      G: { G: 0.25, F: 0.5, Am: 0.25 },
      Am: { G: 0.25, F: 0.5, Am: 0.25 },
      Bdim: { G: 0.25, F: 0.5, Am: 0.25 },
    };

    this.valid_chords_porg = [
      "C",
      "Am",
      "F",
      "G",
      "Am",
      "Em",
      "F",
      "G",
      "C",
      "F",
      "G",
      "Am",
      "C",
      "F",
    ];

    this.probMap = this.getProbMap(this.valid_chords_porg);
  }

  getProbOfChordSeq(chords) {
    var ans = 1;
    for (let index = 0; index < chords.length - 1; index++) {
      let options = Object.keys(this.valid_chords_map[chords[index]]);
      let probs = Object.values(this.valid_chords_map[chords[index]]);

      let j = 0;
      while (j < options.length && options[j] !== chords[index + 1]) {
        j++;
      }

      if (j === options.length) {
        return 0;
      } else {
        ans *= probs[j];
      }
    }

    return ans;
  }

  generateNGram(n) {
    var nGram = {};

    //generate all n-1 permutations :
    for (let chord of Object.keys(this.probMap)) {
      let perm = this.permutations(chord, n - 1, "");
      perm = perm.split("_");
      perm = perm.slice(0, perm.length - 1);

      console.log(perm);
      
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

  getProbMap(data) {
    let map = {};
    //initialize
    for (let chord of data) {
      if (map[chord] !== null) {
        map[chord] = {};
      }
    }

    // counter
    for (let i = 0; i < data.length - 1; i++) {
      map[data[i]][data[i + 1]] =
        map[data[i]][data[i + 1]] == null ? 1 : map[data[i]][data[i + 1]] + 1;
    }

    //convert to prob
    for (let chord of Object.keys(map)) {
      let sum = 0;
      for (let nextChord of Object.keys(map[chord])) {
        sum += map[chord][nextChord];
      }

      for (let nextChord of Object.keys(map[chord])) {
        map[chord][nextChord] /= sum;
      }
    }

    return map;
  }
}

export default HarmMachine;
