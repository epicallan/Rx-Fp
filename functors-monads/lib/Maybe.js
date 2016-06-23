/* eslint-disable func-names */
// simple Maybe Monad with some helper util functions
const _ = require('ramda');

function Maybe(x) {
  this.value = x;
}

Maybe.of = function of(x) { // static method
  return new Maybe(x);
};

Maybe.prototype.isNothing = function isNothing() { // instance method (public)
  const isValid = this.value === null || this.value === undefined;
  return isValid;
};

Maybe.prototype.map = function map(fn) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
};


Maybe.prototype.join = function () {
  return this.isNothing() ? Maybe.of(null) : this.value;
};

Maybe.prototype.chain = function (f) {
  return this.map(f).join();
};

function join(mma) {
  return mma.join();
}
//  chain :: Monad m => (a -> m b) -> m a -> m b
const chain = _.curry((f, m) => m.map(f).join()); // or compose(join, map(f))(m);

//  safeProp :: Key -> {Key: a} -> Maybe a
const safeProp = _.curry((x, obj) => new Maybe(obj[x]));

//  safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

module.exports = {
  Maybe,
  chain,
  safeProp,
  safeHead,
  join
};
