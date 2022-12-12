// All of the code below is copied and adjusted from https://github.com/zandaqo/structurae

export type Bit = 0 | 1;

function getLog2(value: number): number {
  return Math.ceil(Math.log2(value));
}
export class BinaryGrid extends Uint32Array {
  size = 0;

  static get [Symbol.species](): Uint32ArrayConstructor {
    return Uint32Array;
  }

  // Create an Array that can hold 200_000 * 200_000 of 0|1 values
  static create(rows: number, columns = 1): BinaryGrid {
    const offset = getLog2(columns) - 5;
    const length = rows << offset;
    const grid = new this(length);
    grid.size = offset;
    return grid;
  }

  getCoordinates(row: number, column = 1): [bucket: number, position: number] {
    // Bucket is the part of the array for the coordinate, row * Math.pow(2, size) + (column / 32)
    const bucket = (row << this.size) + (column >> 5);
    // Position is the part of the Uint32 value holding 32 column values, column % 31
    return [bucket, column & 31];
  }

  conditionallySetValue(row: number, column: number, value: Bit = 1): number {
    const [bucket, position] = this.getCoordinates(row, column || 0);
    // Shift current value down to least significant bit and see if already set
    if ((this[bucket] >> position) & 1) {
      return 0;
    }

    // Set the bit at position
    this[bucket] = this[bucket] | (value << position);
    return 1;
  }
}
