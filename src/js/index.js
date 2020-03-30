// Global app controller
import string from './models/Search';
// Way 1
import {add, multiply} from './views/searchView';
console.log(`Using imported functions ${add(2020, 1984)} & ${multiply(12, 3)}. ${string}`);
// Way 2
import {add as a, multiply as m} from './views/searchView';
console.log(`Using imported functions ${a(2020, 1984)} & ${m(12, 3)}. ${string}`);
//Way 3
import * as searchView from './views/searchView';
console.log(`Using imported functions ${searchView.add(2020, 1984)} & ${searchView.multiply(12, 3)}. ${string}`);