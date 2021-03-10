//get seq of chords , and check the prob of this option

class HarmMachine {
  constructor() {
    this.valid_chords_prog = [
      ["C", "C", "F", "C", "Dm", "C", "G", "C"],
      ["C", "Am", "F", "G", "C"],
      ["C", "Em", "F", "G", "C"],
      ["C", "F", "Am", "G", "C"],
      ["C", "F", "G", "F", "C"],
      ["C", "F", "C", "G", "C"],
      ["C", "F", "G", "Am"],
      ["C", "F", "Dm", "G"],
      ["C", "Am", "Dm", "G"],
      ["C", "Dm", "Em", "F", "G", "C"],
      ["C", "Em", "F", "Am"],
      ["C", "E", "Am", "F", "C"],
      ["C", "G", "F", "G"],
      ["Dm", "G", "C", "F", "Bdim", "E", "Am"],
      ["Am", "C", "F", "E"],
      ["Am", "F", "C", "G"],
      ["Am", "F", "Bdim", "E"],
      ["Am", "F", "D", "E"],
      ["Am", "G", "F", "E"],
      ["Am", "C", "Dm", "Em"],
      ["Am", "D", "E", "Am"],
      ["F", "G", "Am", "Em"],
      ["C", "F", "Bb", "F"],
      ["C", "C", "Bdim", "E", "Am", "Am", "F", "G"],
      ["C", "C", "F", "C", "G", "F", "C", "G"],
      ["C", "G", "Am", "F"],
      ["C", "G", "Am", "Em", "F", "C", "F", "G"],
    ];

    this.valid_chords_prog = this.valid_chords_prog.concat(
      this.duplicateProg()
    );
  }

  //returns chord progression of 2-times of each chord
  duplicateProg() {
    var dupProgs = [];
    for (let prog of this.valid_chords_prog) {
      let dup = [];
      for (let c of prog) {
        dup.push(c);
        dup.push(c);
      }
      dupProgs.push(dup);
    }
    return dupProgs;
  }

  
  getNgram(sequence, n) {
    var ngramsArray = [];
    for (var i = 0; i < sequence.length - (n - 1); i++) {
      var subNgramsArray = [];
      for (var j = 0; j < n; j++) {
        subNgramsArray.push(sequence[i + j]);
      }
      ngramsArray.push(subNgramsArray);
    }
    return ngramsArray;
  }

  createProbabilitiesMap(n) {
    let sequence = this.valid_chords_prog;
    let result = {};
    let items = [];
    for (let prog of sequence) {
      items = items.concat(this.getNgram(prog, n));
    }

    for (let subarray of items) {
      let x = subarray[0],
        y = subarray[1];
      if (result[x] === undefined) {
        result[x] = [];
      }
      result[x].push(y);
    }
    // eslint-disable-next-line
    Object.keys(result).map((key) => {
      result[key] = this.getProbabilities(result[key]);
    });

    return result;
  }

  getProbabilities(sequence) {
    let freq = this.getFrequencyMap(sequence);
    let length = Object.values(freq).reduce((a, b) => a + b);
    // eslint-disable-next-line
    Object.keys(freq).map((key) => {
      freq[key] /= length; // 3 > 3/4, 1 > 1/4
    });

    return freq;
  }

  getFrequencyMap(sequence) {
    let freq = {};
    for (let item of sequence) {
      if (freq[item]) freq[item]++;
      else freq[item] = 1;
    }

    return freq;
  }
}

export default HarmMachine;
