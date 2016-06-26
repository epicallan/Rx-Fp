/* eslint-disable func-names */

function Just(value) {
  this.value = value;
}

Just.prototype.bind = function bind(transform) {
  return transform(this.value);
};

function doM(gen) {
  function step(value) {
    const result = gen.next(value);
    if (result.done) return result.value;
    return result.value.bind(step);
  }
  return step();
}

const result = function* () {
  const value = yield new Just(5);
  const value2 = yield new Just(6);
  return new Just(value + value2);
};

// console.log(result().next());
console.log(doM(result()));
