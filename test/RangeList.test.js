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
