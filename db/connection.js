const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://bhumesh:10mar99@cluster0.m0nmjic.mongodb.net/03-task-manager?retryWrites=true&w=majority';

//type1- but not to do
// mongoose
//   .connect(connectionString)
//   .then(() => console.log('connected to the DB....'))
//   .catch(err => console.log(err));

//if we have the module like this were the function execute within it then and there then we should only import it within the app.js
//this is a only fun without any dependent files so import only require()
//the 2 step can be done without doing the module export function as there is a function defined and independent within the module so no export is required

//type-2 the right way
//now think about it what is the use for our server what if we are not connected to the database waht ever we do is gonna fail anyway

const connectDB = url => mongoose.connect(url);

module.exports = connectDB;
