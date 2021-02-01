import HarmMachine from "./harmMachine";

import MelodyMachine from "./melodyMachine.js"
/*
var h = new HarmMachine();
for (let i =2; i<6; i++)
console.log(h.createProbabilitiesMap(i))
*/


const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

const seq1 = { "C": 0.5, "F": 0.25, "D": 0.25};
const seq2 = { "Cm": 0.5, "Fm": 0.25, "Dm": 0.25};

let keys1 = Object.keys(seq1).map(item => item)
let keys2 = Object.keys(seq2).map(item => item)
let output2 = cartesian(keys1,keys2);

//console.log(output2);

let M = new MelodyMachine();
let c = M.getNMaxLikelyChords(["C", "D"], 3)
//console.log(c)
