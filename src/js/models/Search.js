import axios from 'axios';

// export search object
export default class Search {
    constructor(query){
        this.query = query;
    }
    // Obj search method to get data from API
    async getResults(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch(error) {
            alert(error);
        }  
    }
}