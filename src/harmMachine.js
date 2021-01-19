//get seq of chords , and check the prob of this option

class HarmMachine {
  constructor() {
    this.valid_chords_porg = [
      ["C", "Am", "F", "G7"],
      ["C", "Em", "F", "G7"],
      ["C", "F", "Am", "G7"],
      ["C", "Am", "Dm", "G7"],
      ["C", "G", "F", "G7"],
      ["Dm", "G", "C", "F", "Bdim", "E7", "Am"],
      ["Am", "C", "F", "E7"],
    ];
  }


getNgram(sequence, n) {
  var ngramsArray = [];
  for (var i = 0; i < sequence.length - (n - 1); i++) {
      var subNgramsArray = [];
      for (var j = 0; j < n; j++) {
          subNgramsArray.push(sequence[i + j])
      }
      ngramsArray.push(subNgramsArray);
  }
  return ngramsArray
}

createProbabilitiesMap(n) {
  let sequence = this.valid_chords_porg;
  let result = {}
  let items = []
  for (let prog of sequence){
    items = items.concat(this.getNgram(prog, n));
  }

  for (let subarray of items) {
      let x = subarray[0], y = subarray[1]
      if (result[x] === undefined) {
          result[x] = []
      } 
      result[x].push(y)
  }
  // { 60: [62, 62, 62, 65], 64: [64, 64, 62, 62]}
  Object.keys(result).map(key => {
      result[key] = this.getProbabilities(result[key])
  })
  
  return result
}

getProbabilities(sequence) {
  let freq = this.getFrequencyMap(sequence)
  let length = Object.values(freq).reduce((a, b) => a + b);
  Object.keys(freq).map(key => {
      freq[key] /= length  // 3 > 3/4, 1 > 1/4
  })

  return freq;
}

getFrequencyMap(sequence) {
  let freq = {}
  for (let item of sequence) {
      if (freq[item]) freq[item]++
      else  freq[item] = 1
  }

  return freq;
}




/*
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
  */
 
}

export default HarmMachine;
