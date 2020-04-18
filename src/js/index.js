// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/*******Global State of the app
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
*/
const state = {}; // state of the UI per given moment

/***************************************************** SEARCH CONTROLLER *********************/

const controlSearch = async () => {
    // Get query from serchView
    const query = searchView.getInput();

    if(query){
        // New search obj and add to state
        state.search = new Search(query);
        // 3. Prpare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)
        // 4. Search for recipe
        try {

        
            await state.search.getResults();
            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    } 
}

// function to prevent form resubmition
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

/***************************************************** RECIPE CONTROLLER *********************/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search)searchView.highlightSelected(id); 

        // Create new recipe
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients)
            state.recipe.parseIngredients();

            // Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            console.log(state.recipe)

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            console.log(err)
            alert('Error processing recipe on recipeViews')
        }
    }
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

