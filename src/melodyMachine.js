class NotesToChord {
  constructor(notes, chords) {
    this.notes = notes;
    this.chords = chords;
  }
}

class MelodyMachine {
  constructor() {
    this.notesToChordList = [
      
      new NotesToChord([-1, "C"], { C: 0.33, F: 0.33, Am: 0.33 }),
      new NotesToChord([-1, "D"], { Dm: 0.33, G: 0.33, Bdim: 0.33 }),
      new NotesToChord([-1, "E"], { Em: 0.33, C: 0.33, Am: 0.33 }),
      new NotesToChord([-1, "F"], { F: 0.33, Dm: 0.33, Bdim: 0.33 }),
      new NotesToChord([-1, "G"], { G: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord([-1, "A"], { Am: 0.33, F: 0.33, C: 0.33 }),
      new NotesToChord([-1, "B"], { Bdim: 0.33, G: 0.33, Em: 0.33 }),
      new NotesToChord([-1, -1], { C: 0.33, Am: 0.33, G: 0.33 }),

      
      
      
      //C
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, F: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Dm: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { F: 0.33, Dm: 0.33, Fm: 0.33 }),
      new NotesToChord(["C", "G"], { C: 0.33, Cm: 0.33, Ab: 0.33 }),
      new NotesToChord(["C", "A"], { Am: 0.33, F: 0.33, "F#dim": 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", -1], { C: 0.33, Am: 0.33, F: 0.33 }),

      //D
      new NotesToChord(["D", "C"], { Dm: 0.33, F: 0.33, Am: 0.33 }),
      new NotesToChord(["D", "D"], { Dm: 0.33, G: 0.33, Bdim: 0.33 }),
      new NotesToChord(["D", "E"], { Dm: 0.33, C: 0.33, Am: 0.33 }),
      new NotesToChord(["D", "F"], { Dm: 0.33, Bb: 0.33, Bdim: 0.33 }),
      new NotesToChord(["D", "G"], { G: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord(["D", "A"], { Dm: 0.33, Bdim: 0.33, D: 0.33 }),
      new NotesToChord(["D", "B"], { Bdim: 0.33, G: 0.33, Dm: 0.33 }),
      new NotesToChord(["D", -1], { Dm: 0.33, G: 0.33, Bdim: 0.33 }),

      //E
      new NotesToChord(["E", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "D"], { Em : 0.33, G: 0.33, C: 0.33 }),
      new NotesToChord(["E", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "F"], { C: 0.33, Am: 0.33, F: 0.33 }),
      new NotesToChord(["E", "G"], { Em: 0.33, C: 0.33, Am: 0.33 }),
      new NotesToChord(["E", "A"], { Am: 0.33, F: 0.33, A: 0.33 }),
      new NotesToChord(["E", "B"], { Em: 0.33, E: 0.33, C: 0.33 }),
      new NotesToChord(["E", -1], { Em: 0.33, C: 0.33, Am: 0.33 }),

      //F
      new NotesToChord(["F", "C"], { F: 0.33, Fm: 0.33, Dm: 0.33 }),
      new NotesToChord(["F", "D"], { Dm: 0.33, Bdim: 0.33, Bb: 0.33 }),
      new NotesToChord(["F", "E"], { F: 0.33, Dm: 0.33, F: 0.33 }),
      new NotesToChord(["F", "F"], { F: 0.33, Dm: 0.33, Bdim: 0.33 }),
      new NotesToChord(["F", "G"], { F: 0.33, G: 0.33, Dm: 0.33 }),
      new NotesToChord(["F", "A"], { F: 0.33, Bdim: 0.33, Dm: 0.33 }),
      new NotesToChord(["F", "B"], { Bdim: 0.33, Em: 0.33, G: 0.33 }),
      new NotesToChord(["F", -1], { F: 0.33, Dm: 0.33, Bdim: 0.33 }),

      //G
      new NotesToChord(["G", "C"], { G: 0.33, Am: 0.33, Cm: 0.33 }),
      new NotesToChord(["G", "D"], { G: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord(["G", "E"], { C: 0.33, Em: 0.33, Am: 0.33 }),
      new NotesToChord(["G", "F"], { F: 0.33, Dm: 0.33, G: 0.33 }),
      new NotesToChord(["G", "G"], { G: 0.33, C: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "B"], { G: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord(["G", -1], { G: 0.33, C: 0.33, Em: 0.33 }),

      //A
      new NotesToChord(["A", "C"], { Am: 0.33, F: 0.33, Dm: 0.33 }),
      new NotesToChord(["A", "D"], { Dm: 0.33, Am: 0.33, D: 0.33 }),
      new NotesToChord(["A", "E"], { Am: 0.33, C: 0.33, "F#dim": 0.33 }),
      new NotesToChord(["A", "F"], { F: 0.33, Dm: 0.33, Bdim: 0.33 }),
      new NotesToChord(["A", "G"], { Am: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord(["A", "A"], { Am: 0.33, F: 0.33, Dm: 0.33 }),
      new NotesToChord(["A", "B"], { Am: 0.33, Bdim: 0.33, Em: 0.33 }),
      new NotesToChord(["A", -1], { Am: 0.33, Dm: 0.33, F: 0.33 }),

      //B
      new NotesToChord(["B", "C"], { C: 0.33, Bdim: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "D"], { Bdim: 0.33, G: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "E"], { Em: 0.33, E: 0.33, C: 0.33 }),
      new NotesToChord(["B", "F"], { Bdim: 0.33, Em: 0.33, G: 0.33 }),
      new NotesToChord(["B", "G"], { G: 0.33, Em: 0.33, C: 0.33 }),
      new NotesToChord(["B", "A"], { Am: 0.33, Bdim: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "B"], { Bdim: 0.33, G: 0.33, Em: 0.33 }),
      new NotesToChord(["B", -1], { Bdim: 0.33, G: 0.33, Em: 0.33 })
    ];
  }
  

  cartesian = (...a) =>
    a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

  getChordsForMelody(notes) {
    let possibleChordsList = [];
    //get list of notes - input melody
    //return - all possible chords progressions.
    for (let i = 0; i < notes.length; i++) {
      if (i % 2 === 1) continue;
      let possibleChords = this.notesToChordList.find(
        (e) => e.notes[0] === notes[i] && e.notes[1] === notes[i + 1]
      );

      possibleChordsList.push(
        Object.keys(possibleChords.chords).map((item) => item)
      );
    }

    let progressions = this.cartesian(
      possibleChordsList[0],
      possibleChordsList[1]
    );

    for (let i = 2; i < possibleChordsList.length; i++) {
      progressions = this.cartesian(progressions, possibleChordsList[i]);
    }

    return progressions;
  }

  // getNMaxLikelyChords(notes, N) {
  //   let ans = this.notesToChordList.find(
  //     (e) => e.notes[0] === notes[0] && e.notes[1] === notes[1]
  //   );

  //   ans = Object.keys(ans.chords).sort((a, b) => ans.chords[b] - ans.chords[a]);
  //   ans = N < 0 || N >= ans.length ? ans : ans.slice(0, N);
  //   return ans;
  // }
}
export default MelodyMachine;
