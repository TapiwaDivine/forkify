import { elements } from './base';


//***************************** */returning input value of form
export const getInput = () => elements.searchInputs.value;

// ************************* function to clear results before displaying new results
export const clearInput = () => {
    elements.searchInputs.value = '';    
};

//********************************* function to clear results
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

//*************************** Limting the amount of characters in 
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) =>{
            if(acc + cur.length <= limit){
                newTitle.push(cur)
            }
            return acc + cur.length
        }, 0);
        //console.log(newTitle)
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


//*************************** rendering recipes
const renderRecipe = recipe =>{
    // genarating markup for UI rendering
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    // rendering generated markup with event
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// function to render btn of the search results pages
const renderButtons = (page, numRe) =>{

}

//rendering search result and render them in 10s to put on different pages
export const renderResults = (recipes, page  = 1, recipesPerPage = 10) => {
    const start = (page - 1) * recipesPerPage;
    const end = page * recipesPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
}