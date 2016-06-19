import axios from 'axios';
import Rx from 'rxjs/Rx';
import _ from 'ramda';
import './io.js';

const setHtml = _.curry((sel, html) =>
  (document.getElementById(sel).innerHTML = html.toString().replace(/,/g, '')));

const listItemHtml = (name) => (`<li>${name}</li>`);

// _.prop returns a property from an object

export const createListItem = _.compose(listItemHtml, _.prop('name'));

export const renderListItems = _.compose(setHtml('root'), _.map(createListItem));

const url = user =>
  (`https://api.github.com/users/${user}/repos`);

export const getData = _.compose(axios.get, url);

export const app = Rx.Observable.fromPromise(getData('epicallan'));

app
  .map(response => response.data)
  .subscribe(
    data => renderListItems(data)
  );
