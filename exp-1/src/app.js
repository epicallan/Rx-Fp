import axios from 'axios';
import Rx from 'rxjs/Rx';
import _ from 'ramda';

const url = user =>
  (`https://api.github.com/users/${user}/repos`);

const setHtml = _.curry((sel, html) =>
  (document.getElementById(sel).innerHTML = html.toString().replace(/,/g, '')));

export const repoNames = (name) => (`<li>${name}</li>`);

// _.prop returns a property from an object

export const namesAslistItems = _.compose(repoNames, _.prop('name'));

export const renderListOfNames = _.compose(setHtml('root'), _.map(namesAslistItems));

export const getData = _.compose(axios.get, url);

export const app = Rx.Observable.fromPromise(getData('epicallan'));

app
  .map(response => response.data)
  .subscribe(
    data => renderListOfNames(data)
  );