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
      ["Am", "F","C", "G"],
      ["Am", "F", "Bdim", "E"],
      ["Am", "F", "D", "E"],
      ["Am", "G", "F", "E"],
      ["Am", "C", "Dm", "Em"],
      ["Am", "D", "E", "Am"],
      ["F", "G", "Am", "Em"],
      ["C", "F", "Bb", "F"],
      ["C", "C", "Bdim", "E7", "Am", "Am", "F", "G"],
      ["C", "C", "F", "C", "G", "F" , "C", "G"],
      ["C", "G", "Am", "F"],
      ["C","G","Am","Em","F","C","F","G"]
    ];

    this.valid_chords_prog = this.valid_chords_prog.concat(this.duplicateProg());
    
    
  }

duplicateProg(){
  var dupProgs = []
  for(let prog of this.valid_chords_prog){
    let dup = []
    for(let c of prog){
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
          subNgramsArray.push(sequence[i + j])
      }
      ngramsArray.push(subNgramsArray);
  }
  return ngramsArray
}

createProbabilitiesMap(n) {
  let sequence = this.valid_chords_prog;
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
