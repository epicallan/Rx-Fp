/* eslint-disable prefer-arrow-callback*/
/* eslint-disable func-names */
// const _ = require('ramda');
const { Maybe, safeProp } = require('./lib/Maybe.js');


// Exercise 1
// ==========
// Use safeProp and map/join or chain to safely get the street name when given
// a user.

const user = {
  id: 2,
  name: 'albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
};

const address = Maybe.of(user)
  .chain(safeProp('address'))
  .chain(safeProp('street'));

console.log(address.value);
