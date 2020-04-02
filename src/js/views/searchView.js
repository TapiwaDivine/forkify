import { elements } from './base';


//***************************** */returning input value of form
export const getInput = () => elements.searchInputs.value;

// *************************function to clear results before displaying new results
export const clearInput = () => {
    elements.searchInputs.value = '';    
};

//********************************* */ function to clear results
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

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
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    // rendering generated markup with event
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}