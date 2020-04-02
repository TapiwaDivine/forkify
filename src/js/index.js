// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/*******Global State of the app
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
*/
const state = {}; // state of the UI per gi

const controlSearch = async () => {
    // Get query from serchView
    const query = searchView.getInput();

    if(query){
        // New search obj and add to state
        state.search = new Search(query);
        // 3. Prpare UI for results
        // 4. Search for recipe
        await state.search.getResults();
        // 5. render results on UI
        searchView.renderResults(state.search.result)
    } 
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})