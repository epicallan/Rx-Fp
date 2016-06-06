import axios from 'axios';
import Rx from 'rxjs/Rx';
import _ from 'ramda';

// get data from github
const url = user =>
  (`https://api.github.com/users/${user}/repos`);

const setHtml = _.curry((sel, html) => (document.getElementById(sel).innerHTML = html));

export const repoNames = (name) => (`<li>${name}</li>`);

export const items = _.compose(_.map(repoNames), _.prop('name'));

export const renderNames = _.compose(setHtml('root'), items);

export const getData = _.compose(axios.get, url);

export const app = Rx.Observable.fromPromise(getData('epicallan'));

app
  .map(response => response.data)
  .subscribe(
    data => renderNames(data)
  );
