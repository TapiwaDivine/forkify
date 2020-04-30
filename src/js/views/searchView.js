import { elements } from './base';


//***************************** */returning input value of form
export const getInput = () => elements.searchInputs.value;

// ************************* function to clear results before displaying new results
export const clearInput = () => {
    elements.searchInputs.value = '';    
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

//********************************* function to clear results
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

//*************************** Limting the amount of characters in 
export const limitRecipeTitle = (title, limit = 17) => {
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

// type is either prev or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>
`;

// function to render btn of the search results pages
const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1) {
        //Only a Button to go to next page
        button = createButton(page, 'next')

    }else if(page < pages){
        //Buttons to go to next page and prev page
        button =`
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}      
        ` 
    }else if(page===pages && pages > 1){
        //Button to go to prev page
        button = createButton(page, 'prev')
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
        
};

//rendering search result and render them in 10s to put on different pages
// resPerPage = resultsPerPage
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // rendering results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // rendering pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}