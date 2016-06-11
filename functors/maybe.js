// simple maybe functor with internal state
const _ = require('ramda');

function Maybe(x) {
  this.__value = x;
}

Maybe.of = function of(x) { // static method
  return new Maybe(x);
};

Maybe.prototype.isNothing = function isNothing() { // instance method (public)
  const isValid = this.__value === null || this.__value === undefined;
  return isValid;
};

Maybe.prototype.map = function map(fn) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
};

// use cases

const match = _.curry((regex, str) => str.match(regex));

Maybe.of('Allan Lukwago').map(_.compose(console.log, match(/al/gi)));
