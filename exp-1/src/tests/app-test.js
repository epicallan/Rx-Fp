import { expect } from 'chai';
import data from './data.json';
import _ from 'ramda';
import { createListItem, app } from '../app.js';

describe('tests for app', () => {
  it('renderNames should render repo names as list items', () => {
    // const listOfNames = renderNames(data);
    const listOfNames = _.map(createListItem)(data);
    console.log(listOfNames);
    expect(listOfNames).to.be.an('array');
  });
  /* eslint-disable func-names */
  it('should return an observerable with github data', function (done) {
    this.timeout(5000);
    app
    .subscribe(
      response => {
        expect(response.data).to.be.a('array');
      },
      err => { console.log('error', err); },
      () => {
        console.log('completed');
        done();
      }
    );
  });
});
