// Enum to maintain the start and end position of a range.
const RANGE_START = 'START';
const RANGE_END = 'END';

export default class RangeList {
  constructor() {
    this.rangesMap = new Map();
  }

  /**
  * Adds a range to the list
  * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
  */
  add(range) {
    if (range.length !== 2) return;

    const MIN = range[0];
    const MAX = range[1];

    if (MAX < MIN || MIN === MAX) return;

    // Set start and ending points of the new range
    this.rangesMap.set(MIN, RANGE_START);
    this.rangesMap.set(MAX, RANGE_END);

    // Sort the map keys into an array in ascending order
    const sortedRanges = Array.from(this.rangesMap.keys()).sort(RangeList.sortAscending);

    // Cleanup the map to get rid of any redundant values by iterating
    // the map and clearing the keys which are already within a range
    // i.e. between a starting point (START) and ending point (END)
    for (let i = 1; i < sortedRanges.length - 1; i += 1) {
      // Get the highest value greater than or equal to the current key
      // while making sure the key wasn't already removed
      let j = i - 1;
      while (!this.rangesMap.has(sortedRanges[j]) && j > 0) {
        j -= 1;
      }

      const previousValue = this.rangesMap.get(sortedRanges[j]);

      // Get the smallest value greater than or equal to the current key
      // while making sure the key wasn't already removed
      let k = i + 1;
      while (!this.rangesMap.has(sortedRanges[k]) && k < sortedRanges.length) {
        k += 1;
      }
      const nextValue = this.rangesMap.get(sortedRanges[k]);

      // Delete the key if it lies within a range
      if (previousValue === RANGE_START && nextValue === RANGE_END) {
        this.rangesMap.delete(sortedRanges[i]);
      }
    }
  }

  /**
  * Removes a range from the list
  * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
  */
  remove(range) {
    // Validating the inputs
    if (range.length !== 2) return;

    const MIN = range[0];
    const MAX = range[1];

    if (MAX < MIN || MIN === MAX) return;

    let sortedRanges = Array.from(this.rangesMap.keys()).sort(RangeList.sortAscending);
    // Delete any keys which lie in between the range to be removed
    for (let i = 0; i < sortedRanges.length; i += 1) {
      if (sortedRanges[i] >= MIN && sortedRanges[i] <= MAX) {
        this.rangesMap.delete(sortedRanges[i]);
      }
    }

    // Get the highest key smaller than the start of the range to be removed
    let minIndex;
    sortedRanges = Array.from(this.rangesMap.keys()).sort(RangeList.sortAscending);
    for (let i = 0; i < sortedRanges.length; i += 1) {
      if (sortedRanges[i] >= MIN) {
        minIndex = i - 1;
        break;
      }
    }

    // If minIndex is undefined
    // (the range to be removed is out of the existing range list), set the position of the
    // start of range to be removed to end position if the previous positino was set to start
    if (
      minIndex === undefined
      && this.rangesMap.get(sortedRanges[sortedRanges.length - 1])
      === RANGE_START
    ) {
      this.rangesMap.set(MIN, RANGE_END);

      return;
    }

    // if the direct previous key is an START (start of the range), end
    // the range at the min value (beginning of the range to be removed)
    const previousValue = this.rangesMap.get(sortedRanges[minIndex]);
    if (previousValue === RANGE_START) {
      this.rangesMap.set(MIN, RANGE_END);
    }

    // Get the smallest key higher than the start of the range to be removed
    let maxIndex;
    sortedRanges = Array.from(this.rangesMap.keys()).sort(RangeList.sortAscending);
    for (let i = 0; i < sortedRanges.length; i += 1) {
      if (sortedRanges[i] >= MAX) {
        maxIndex = i;
        break;
      }
    }

    // the range at the max value (end of the range to be removed)
    const nextValue = this.rangesMap.get(sortedRanges[maxIndex]);
    if (nextValue === RANGE_END) {
      this.rangesMap.set(MAX, RANGE_START);
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const sortedRanges = Array.from(this.rangesMap.keys()).sort(RangeList.sortAscending);
    const output = [];

    // Join the pairs for START and END to make a range and print it
    for (let i = 0; i < sortedRanges.length; i += 2) {
      output.push(`[${sortedRanges[i]}, ${sortedRanges[i + 1]})`);
    }

    if (output.length === 0) {
      console.log('EMPTY_RANGE');
      return;
    }

    console.log(output.join(' '));
  }

  /**
   * Simple Ascending method
   * @param {*} a
   * @param {*} b
   */
  static sortAscending(a, b) {
    return a - b;
  }
}
