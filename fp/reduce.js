const _ = require('ramda');

const numbers = [1, 2, 5];
// reduce as a map function
const doubled = numbers.reduce((alredyDoubled, x) => {
  alredyDoubled.push(x * 2);
  return alredyDoubled;
}, []);
console.log(doubled);

const by2 = (x) => x * 2;

const reduceMap = (fn) => (mapped, x) => {
  mapped.push(fn(x));
  return mapped;
};

const doubled2 = numbers.reduce(reduceMap(by2), []);

console.log(doubled2);

// reduce as filter
const lessThan5 = (x) => (x < 5);
const small = numbers.filter(lessThan5);
console.log(small);

const reduceFilter = (fn) => (mapped, x) => {
  if (fn(x)) mapped.push(x);
  return mapped;
};

const smallReduce = numbers.reduce(reduceFilter(lessThan5), []);
console.log(smallReduce);

// simplifying with curry
const filter = _.curry((fn, mapped, x) => {
  if (fn(x)) mapped.push(x);
  return mapped;
});
filter.start = [];

const each = _.curry((fn, mapped, x) => {
  mapped.push(fn(x));
  return mapped;
});
each.start = [];

// reduce as Transducer
const reducer = (combinator, fn, list) =>
  list.reduce(combinator(fn), combinator.start);

const newBy2 = reducer(each, by2, numbers);
console.log(newBy2);

const newSmall2 = reducer(filter, lessThan5, numbers);
console.log(newSmall2);
