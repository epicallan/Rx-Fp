// simple maybe functor with internal state
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

// use cases

const match = _.curry((regex, str) => str.match(regex));

Maybe.of('Allan Lukwago').map(_.compose(console.log, match(/al/gi)));

const student = {
  name: 'Dinah',
  age: 14,
};

Maybe.of(student)
  .map(_.prop('age'))
  .map(_.compose(console.log, _.add(10)));


Maybe.of(student)
  .map(_.prop('class'))
  .map(console.log);

// Monads
/* eslint-disable func-names */
Maybe.prototype.join = function () {
  return this.isNothing() ? Maybe.of(null) : this.value;
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

const streetAddresses = {
  addresses: [{
    street: {
      name: 'Mulburry',
      number: 8402,
    },
    postcode: 'WC2N',
  }],
};


const firstAddressStreet = _.compose(
  join, _.map(safeProp('street')), join, _.map(safeHead), safeProp('addresses')
);
const street = firstAddressStreet(streetAddresses).value;
console.log(1, street);


const firstAddressStreet2 = _.compose(
  chain(safeProp('street')), chain(safeHead), safeProp('addresses')
);
const street2 = firstAddressStreet2(streetAddresses).value;
console.log(2, street2);
