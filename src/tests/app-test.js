import { expect } from 'chai';
import { source, app } from '../app.js';

describe('tests for flickr app', () => {
  it('App should be a promise', () => {
    expect(app('cats')).to.be.a('Promise');
  });
  /* eslint-disable func-names */
  it('should return observer with images from flickr', function (done) {
    this.timeout(5000);
    source.subscribe(
      response => {
        expect(response.data).to.be.a('string');
      },
      err => { console.log('error', err); },
      () => {
        console.log('completed');
        done();
      }
    );
  });
});
