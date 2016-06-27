// lenses getter / setter interface for data

const {lensProp, lensIndex, compose, toUpper, reverse} = require('ramda');
const {over, view, set} = require('ramda-lens');


const addrs = [
  {street: '99 Walnut Dr.', zip: '04821'},
  {street: '2321 Crane Way', zip: '08082'}
];

const user = {id: 3, name: 'Charles Bronson', addresses: addrs};

const name = lensProp('name');

console.log(view(name, user));
// Charles Bronson

const newuser = set(name, 'Richard Branson', user);

console.log(newuser);

const user2 = over(name, toUpper, user);

console.log('user2', user2);

const addresses = lensProp('addresses');
const street = lensProp('street');
const first = lensIndex(0);

const firstStreet = compose(addresses, first, street);

console.log(view(firstStreet, user));
// 99 Walnut Dr.

const user3 = over(firstStreet, reverse, user);
console.log('user3', user3);
