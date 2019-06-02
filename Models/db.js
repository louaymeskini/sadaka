//Import the mongoose module
//var mongoose = require('mongoose');

//Set up default mongoose connection
//var mongoDB = 'mongodb+srv://sadaka:louay*0147@sadaka-ljoq6.mongodb.net/test?retryWrites=true&w=majority';
//mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
//mongoose.Promise = global.Promise;
//Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}) 
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));