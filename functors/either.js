// simple either functor
// not working i still dont  get the implementation details of an
// either container/functor
const _ = require('ramda');

function Left(x) {
  this.__value = x;
}

Left.of = function of(x) {
  return new Left(x);
};
/* eslint-disable no-unused-vars*/
Left.prototype.map = function map(f) {
  return this;
};

function Right(x) {
  this.__value = x;
}

Right.of = function of(x) {
  return new Right(x);
};
/* eslint-disable no-unused-vars*/
Right.prototype.map = function map(f) {
  return f(this.__value);
};

/* eslint-disable no-underscore-dangle*/
const either = (f, g, e) => {
  switch (e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
    default:
      return (new Error('unknown error'));
  }
};

// implementation

Right.of({
  host: 'localhost',
  port: 80,
}).map(_.compose(console.log, _.prop('host')));

// from ramda
const gt10 = x => x > 10;
const even = x => x % 2 === 0;
const f = _.compose(console.log, _.either(gt10, even));
f(101); // => true
f(8); // => true
f(7);
