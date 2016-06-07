import axios from 'axios';
import Rx from 'rxjs/Rx';
import _ from 'ramda';

const parentNode = document.getElementById('root');

const addToDom = child => parentNode.appendChild(child);

const domElement = (name) => {
  const li = document.createElement('li');
  li.innerHTML = name;
  return li;
};

// _.prop returns a property from an object
const createlistItem = _.compose(domElement, _.prop('name'));

const url = user =>
  (`https://api.github.com/users/${user}/repos`);

export const getData = _.compose(axios.get, url);

export const app = Rx.Observable.fromPromise(getData('epicallan'));

app
  .map(response => response.data)
  .flatMap(data => Rx.Observable.from(data))
  .map(repoObj => createlistItem(repoObj))
  .subscribe(
    item => addToDom(item)
  );
