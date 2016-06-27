const _ = require('ramda');
const { Maybe } = require('./lib/Maybe.js');

Maybe.prototype.ap = function (otherContainer) {
  return otherContainer.map(this.value); // this.value is a function
};

const liftA2 = _.curry(function (f, functor1, functor2) {
  return functor1.map(f).ap(functor2);
});

const val = Maybe.of(2).chain(function (n) {
  return Maybe.of(3).map(_.add(n));
});
console.log(val);

const val2 = Maybe.of(_.add).ap(Maybe.of(2)).ap(Maybe.of(3));
console.log(val2);

// liftA2(createUser, checkEmail(user), checkName(user));
const val3 = liftA2(_.add, Maybe.of(2), Maybe.of(3));
console.log(val3);
