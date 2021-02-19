'use strict';

class ClothesInterface {

  // constructor() {
  //   // this will get incremented for every 'clothes' that we add to our 'database
  //   this.id = 0;
  //   // this is going tobe filled with objects as we create new clothes.
  //   this.db = [];
  //   //[{id, data: {name, type}}]
  // }

  constructor(model) {
    this.model = model;
  }

  read(id) {
    if (id) {
      return this.model.find({ _id: id });
    }
    return this.model.find({});
  }

  create(obj) {
    const document = new this.model(obj);
    return document.save();
  }

  update (id, obj) {
    
    return this.model.findOneAndUpdate({_id: id }, obj, { new: true });
  }

  delete (id) {

    this.model.findOneAndDelete({_id: id});
  }


  // // find a clothes from the 'db'
  // read(id) {
  //   if(id) {
  //     return this.db.find(record => record.id === id);
  //   } else {
  //     return this.db;
  //   }
  // }

  // // add a new clothes to the 'db'
  // create(obj) {

  //   let record = {
  //     id: this.id += 1,
  //     data:  obj,
  //   };

  //   this.db.push(record);
  //   return record;
  // }

  // // search for a clothes, and modify that clothes
  // update(id, obj) {
  //   // search our array for an  object containing the `id`
  //   for (let i = 0; i < this.db.length; i++) {
  //     if (this.db[i].id === id) {
  //       // replace that whole data object with the new `obj`
  //       this.db[i].data = obj;
  //       return this.db[i];
  //     }
  //   }
  // }

  // // search for a clothes and remove  
  // delete(id) {
  //   for (let i = 0; i < this.db.length; i++){
  //     if (this.db[i].id === id) {
  //       delete this.db[i];
  //     }
  //   }
  // }
}


module.exports = ClothesInterface;