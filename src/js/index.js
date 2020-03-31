// Global app controller
import Search from './models/Search';

/*******Global State of the app
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
*/
const state = {};

const controlSerach = async () => {
    // Get query from view
    const query = 'pizza';

    if(query){
        // New search obj and add to state
        state.search = new Search(query);
        // 3. Prpare UI for results
        // 4. Search for recipe
        await state.search.getResults();
        // 5. render results on UI
        console.log(state.search.result)
    } 
}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSerach();
})