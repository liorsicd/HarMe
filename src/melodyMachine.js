class NotesToChord {
  constructor(notes, chords) {
    this.notes = notes;
    this.chords = chords;
  }
}

class MelodyMachine {
  constructor() {
    this.notesToChordList = [
      
      new NotesToChord([-1, "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord([-1, "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord([-1, -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      
      
      
      //C
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //D
      new NotesToChord(["D", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["D", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //E
      new NotesToChord(["E", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["E", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["E", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //F
      new NotesToChord(["F", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["F", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["F", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //G
      new NotesToChord(["G", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["G", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["G", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //A
      new NotesToChord(["A", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["A", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", "B"], { F: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["A", -1], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //B
      new NotesToChord(["B", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["B", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["B", -1], { C: 0.33, Am: 0.33, Em: 0.33 })
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
