import uniqid from 'uniqid'

export default class List {
   constructor(){
      this.item = [];
   }

   addItem (count, unit, ingredient) {
      const item = {
         id: uniqid(),
         count,
         unit,
         ingredient
      }
      this.item.push(item);
      return item;
   }

   deleteItem(id) {
      // find index of the ID 
      const index = this.item.findIndex(el => el.id === id)
      // use the index to remove 1 element with the ID found 
      this.item.splice(index, 1);
   }

   updateCount(id, newCount) {
      // looping through object id and change its count 
      this.item.find(el => el.id === id).count = newCount
   }
}