console.log('Task Manager App');
const express = require('express');
const app = express();
const connectDB = require('./db/connection'); //this is afunction not avariable so please `
const tasks_route = require('./routes/tasks_R');
const { notfound } = require('./middleware/notfound');
const errorHandler = require('./middleware/errorHandler');
require(`dotenv`).config();

app.use(express.static('./public'));
app.use(express.json()); // convrets the json from the client and also see the content type
app.use('/api/v1/tasks', tasks_route);
//if any error comes from route then it is passed to this below error handleer by the next() fn in that
app.use(notfound); //it will show the error in the browser
app.use(errorHandler);

//here we add the env.port variable which is global and we get that info from os and dotenv extension loads that variable securily  to the internet here we give the || fun as the either the env is from the global or default from the local
//and this should be out of the logic file as .env file
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //always invoke the fun from other module,process is one of the global variables in node
    //always remember that if we want to keep our links in secret then use .env file import dotenv,invoke config(),use the secret varaible any were by the global variable.

    console.log('connected to DB... ');
    app.listen(port, () => {
      console.log(`listening to port ${port}.....`);
    });
  } catch (err) {
    console.log('Error:-', err);
  }
};

start();
//what if we removed the await?

//brief:the promise wont resolve so  you should use then catch instead of try catch and put the executing function inside then orelse it will execute the code wether the db is connected or not and wont make the start async func to wait until db is connected

/* Yes, you can remove the await keyword in the code snippet you provided, but keep in mind that the behavior will change.

When you use await before connectDB, it pauses the execution of the start function until the connectDB promise is resolved or rejected. This ensures that the subsequent code only runs after the database connection is established.

If you remove the await keyword, the connectDB function will still be executed, but the code execution will not wait for the promise to resolve or reject. The subsequent code will continue to execute immediately after calling connectDB, potentially resulting in issues if it relies on the successful database connection.

Here's the modified code without await:

javascript
Copy code
const start = async () => {
  connectDB()
    .then(() => {
      console.log('Connected to the DB....');
      
      // Other code that relies on the successful database connection
      
      app.listen(port, () => {
        console.log('Listening on port 5000');
      });
    })
    .catch((err) => {
      // Handle any errors that occur during the connection or execution
      console.error('Error:', err);
    });
};
In this version, the code continues executing without waiting for the connectDB promise to resolve or reject. The subsequent code is placed inside the .then() block, ensuring it runs only after the successful database connection. Any errors will be caught in the .catch() block, allowing you to handle them appropriately. 
*/
