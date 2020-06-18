import RangeList from '../src/RangeList';

const rl = new RangeList();

let output = '';
const loggerCatch = (input) => {
  output = input;

  return true;
};
console.log = jest.fn(loggerCatch);

test('Should display: [1, 5)', () => {
  rl.add([1, 5]);
  rl.print();
  expect(output).toBe('[1, 5)');
});

test('Should display: [1, 5) [10, 20)', () => {
  rl.add([10, 20]);
  rl.print();
  expect(output).toBe('[1, 5) [10, 20)');
});

test('Should display: [1, 5) [10, 20)', () => {
  rl.add([20, 20]);
  rl.print();
  expect(output).toBe('[1, 5) [10, 20)');
});

test('Should display: [1, 5) [10, 21)', () => {
  rl.add([20, 21]);
  rl.print();
  expect(output).toBe('[1, 5) [10, 21)');
});

test('Should display: [1, 5) [10, 21)', () => {
  rl.add([2, 4]);
  rl.print();
  expect(output).toBe('[1, 5) [10, 21)');
});

test('Should display: [1, 8) [10, 21)', () => {
  rl.add([3, 8]);
  rl.print();
  expect(output).toBe('[1, 8) [10, 21)');
});

test('Should display: [1, 8) [10, 21)', () => {
  rl.remove([10, 10]);
  rl.print();
  expect(output).toBe('[1, 8) [10, 21)');
});

test('Should display: [1, 8) [11, 21)', () => {
  rl.remove([10, 11]);
  rl.print();
  expect(output).toBe('[1, 8) [11, 21)');
});

test('Should display: [1, 8) [11, 15) [17, 21)', () => {
  rl.remove([15, 17]);
  rl.print();
  expect(output).toBe('[1, 8) [11, 15) [17, 21)');
});

test('Should display: [1, 3) [19, 21)', () => {
  rl.remove([3, 19]);
  rl.print();
  expect(output).toBe('[1, 3) [19, 21)');
});
