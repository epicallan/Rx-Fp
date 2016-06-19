// handling side effects
/* eslint-disable func-names */

import _ from 'ramda';

function IO(f) {
  this.value = f;
}

IO.of = x => new IO(() => x);


IO.prototype.map = function map(f) {
  return new IO(_.compose(f, this.value));
};

// implementation
const ioWindow = new IO(function () {
  return window;
});

const newIo = ioWindow.map(function (win) {
  return win.innerWidth;
}).value();

console.log(newIo);
