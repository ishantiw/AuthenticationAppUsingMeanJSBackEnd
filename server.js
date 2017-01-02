var express = require('express');// pass the name of the library, express object
var app = express();//instantiate the epxress object and save it inside a variable called app
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/api/message', function(req, res){
    console.log(req.body);
    res.status(200);
})

var server = app.listen(5000, function() {
    console.log('Listening on the port ', server.address().port);
})//we start our server and listen on port 5000, app.listen to start the server
