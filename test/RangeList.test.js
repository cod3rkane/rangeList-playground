import RangeList from '../src/RangeList';

const rl = new RangeList();

test('first case test', () => {
  rl.add([1, 5]);
  expect(rl.print()).toBe('[1, 5)');
  // Should display: [1, 5)
});
