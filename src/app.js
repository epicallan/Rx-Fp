import axios from 'axios';
import Rx from 'rxjs/Rx';
import _ from 'ramda';

// get data from flickr api
const url = term =>
  (`https://api.flickr.com/services/feeds/photos_public.gne?tags= ${term}&format=json&jsoncallback=?`);


export const app = _.compose(axios.get, url);

export const source = Rx.Observable.fromPromise(app('cats'));

// source.subscribe(
//   src => { console.log('Next', src); },
//   err => { console.log('error', err); },
//   () => { console.log('completed'); }
// );
