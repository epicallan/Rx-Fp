/* eslint-disable prefer-arrow-callback*/
/* eslint-disable func-names */
const {
  Maybe,
  chain,
  safeProp,
  safeHead,
  join
} = require('./lib/Maybe.js');
const _ = require('ramda');

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

const val = Maybe.of(3).chain(function (three) {
  return Maybe.of(2).map(_.add(three));
}).value;
console.log('val', val);
