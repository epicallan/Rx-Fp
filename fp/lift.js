/* eslint-disable func-names */
function lift(fn) {
  return function (arr) {
    let myArr = arr;
    if (!Array.isArray(arr)) {
      /* eslint-disable prefer-rest-params*/
      myArr = Array.prototype.slice.call(arguments, 0);
    }
    return myArr.map(fn);
  };
}

function printOne(p) {
  console.log('user name', p.name);
}
const user1 = {
  name: 'joe'
};
const user2 = {
  name: 'ann'
};
const print = lift(printOne);
print([user1, user2]);
print(user1, user2);
print(user1);
print();
