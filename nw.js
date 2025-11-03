// Użycie: node nw.js sekwencje.fasta
import * as process from "node:process";
import * as fs from "node:fs";

const scores = {
  match: 1,
  mismatch: -1,
  gap: -2,
};

if (process.argv.length === 2) {
  console.error("Użycie: node nw.js sekwencje.fasta");
  process.exit(1);
}

// read fasta files
const file = fs.readFileSync(process.argv[2], "utf-8");
const [seq1, seq2] = file
  .split(">")
  .slice(1)
  .map((entry) => {
    entry = entry.replace(/\r/g, "");
    const lines = entry.split("\n");
    const header = lines.shift();
    let dna = " " + lines.join("");
    return { header, dna };
  });

// create matrix
const rows = seq1.dna.length;
const columns = seq2.dna.length;
const matrix = Array.from({ length: rows }, () => Array(columns).fill(0));
const printMatrix = (arr) => arr.forEach((row) => console.log(row.join("\t")));

// pre-fill matrix
for (let row = 0; row < rows; row += 1) {
  matrix[row][0] = row * scores.gap;
}
for (let column = 0; column < columns; column += 1) {
  matrix[0][column] = column * scores.gap;
}

// fill matrix
for (let row = 1; row < rows; row += 1) {
  for (let column = 1; column < columns; column += 1) {
    const diag =
      matrix[row - 1][column - 1] +
      (seq1.dna[row] === seq2.dna[column] ? scores.match : scores.mismatch);
    const top = matrix[row - 1][column] + scores.gap;
    const side = matrix[row][column - 1] + scores.gap;

    matrix[row][column] = Math.max(diag, top, side);
  }
}

// printMatrix(matrix);

// traceback
let seq1text = "";
let seq2text = "";
let row = rows - 1;
let column = columns - 1;
while (row != 0 || column != 0) {
  const diag =
    matrix[row - 1][column - 1] +
    (seq1.dna[row] === seq2.dna[column] ? scores.match : scores.mismatch);
  const top = matrix[row - 1][column] + scores.gap;
  const side = matrix[row][column - 1] + scores.gap;

  if (matrix[row][column] === diag) {
    seq1text += seq1.dna[row];
    seq2text += seq2.dna[column];
    row -= 1;
    column -= 1;
  } else if (matrix[row][column] === top) {
    seq1text += seq1.dna[row];
    seq2text += "_";
    row -= 1;
  } else {
    // matrix[row][column] === side
    seq1text += "_";
    seq2text += seq2.dna[column];
    column -= 1;
  }
}

// built backwards -> reverse
seq1text = [...seq1text].reverse().join("");
seq2text = [...seq2text].reverse().join("");

// print out & save
const output = [
  `Dopasowanie ${seq1.header} i ${seq2.header}:`,
  seq1text,
  seq2text,
].join("\n");
fs.writeFileSync("alignment.txt", output);
console.log(output, "\nDopasowanie zapisane do alignment.txt");
