class NotesToChord {
  constructor(notes, chords) {
    this.notes = notes;
    this.chords = chords;
  }
}


class MelodyMachine {
  constructor() {
    this.notesToChordList = [
      //C
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //D
      new NotesToChord(["D", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["D", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["D", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //E
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //F
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //G
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //A
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),

      //B
      new NotesToChord(["C", "C"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "D"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "E"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "F"], { C: 0.5, Am: 0.23, Em: 0.9 }),
      new NotesToChord(["C", "G"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "A"], { C: 0.33, Am: 0.33, Em: 0.33 }),
      new NotesToChord(["C", "B"], { C: 0.33, Am: 0.33, Em: 0.33 }),
    ];
  }

  getNMaxLikelyChords(notes, N) {
    let ans = this.notesToChordList.find(
      (e) => e.notes[0] === notes[0] && e.notes[1] === notes[1]
    );

    ans = Object.keys(ans.chords).sort((a, b) => ans.chords[b] - ans.chords[a]);
    ans = N < 0 || N >= ans.length ? ans : ans.slice(0, N);
    return ans;
  }
}
export default MelodyMachine;
