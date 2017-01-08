var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function checkAuthenticated(req, res, next) {
    console.log('hha');
    if(!req.header('Authorization')) {
        return res.status(401).send({message: 'Please make sure your request has authorization header'});
    }
    var token = req.header('Authorization').split(' ')[1];
    
    var payload = jwt.decode(token, 'secret');
    
    if(payload.exp <= moment(moment.unix())) {
        return res.status(401).send({message: 'Token has expired'});
    }
    
    req.user = payload.sub;
    
    next();
}