//1.create a model folder after rouing ,controllers, db, env,folders
const mongoose = require('mongoose');
//2. start creating a model by using constructor new and from mongoose schema
//schema set the structure of the document
//3.here we validate the property by the obj name and also if we want more than one values/msg with true/false [] is used
//see the mongoose validation for further details
//4.in this now we sent the empty data means u can see the validation error
//5.wether if you see the unhandled promise rejection error along with the validation error in use try/catch im async await

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please fill the name'],
    trim: true,
    maxlength: [20, 'name should be within 20']
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', TaskSchema);
//monngoose automatically looks for the collections as first letter in lowercase and in plural form. so in db you see mean it will show the collection inside the db as tasks
