// dealing with side effects
// in a pure way
/* eslint-disable func-names */
const _ = require('ramda');

function IO(f) {
  this.value = f;
}

IO.of = (x) => new IO(() => x);

IO.prototype.map = function (f) {
  return new IO(_.compose(f, this.value));
};

IO.prototype.isNothing = function isNothing() { // instance method (public)
  const isValid = this.value === null || this.value === undefined;
  return isValid;
};


IO.prototype.join = function () {
  return this.isNothing() ? IO.of(null) : this.value;
};

IO.prototype.chain = function (f) {
  return this.map(f).join();
};

module.exports = IO;
