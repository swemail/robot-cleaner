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

  static create(rows: number, columns = 1): BinaryGrid {
    const offset = getLog2(columns);
    const length = rows << (offset - 5);
    const grid = new this(length || 1);
    grid.size = offset;
    return grid;
  }

  getCoordinates(row: number, column = 1): [bucket: number, position: number] {
    const bucket = (row << (this.size - 5)) + (column >> 5);
    return [bucket, column & 0x1f];
  }

  conditionallySetValue(row: number, column: number, value: Bit = 1): number {
    const [bucket, position] = this.getCoordinates(row, column || 0);
    if ((this[bucket] >> position) & 1) {
      return 0;
    }

    this[bucket] = (this[bucket] & ~(1 << position)) | (value << position);
    return 1;
  }
}
