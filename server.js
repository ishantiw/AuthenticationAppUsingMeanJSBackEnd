var express = require('express');// pass the name of the library, express object
var app = express();//instantiate the epxress object and save it inside a variable called app
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var User = require('./models/user');
var auth = require('./controllers/auth');
var checkAuthenticated = require('./services/checkAuthenticated')
var database;
var message = require('./controllers/message');
var cors = require('./services/cors')


//Middleware
app.use(bodyParser.json());
app.use(cors);


//Requests
app.get('/api/message', message.get);

app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register)


//connection
mongoose.connect('mongodb://localhost:27017/test',function(err, db) {
    if(!err) {
        console.log("we are connected to mongo");
        //GetMessages();
        //database = db;
        //db.collection('messages').insertOne({'msg':'test'});
    }
})
var server = app.listen(5000, function() {
    console.log('Listening on the port ', server.address().port);
})//we start our server and listen on port 5000, app.listen to start the server
