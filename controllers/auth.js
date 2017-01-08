var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    register: (req, res)=> {
        console.log(req.body);
        User.findOne({email: req.body.email}, (err, existingUser) => {
            
            if(existingUser)
                return res.status(409).send({message: 'Email already exists!'});
            
            var user = new User(req.body);
    
            user.save((err, result) => {
                if(err) {
                    res.status(500).send({
                    message: err.message
                    });
                }
                res.status(200).send({token: createToken(result)});
            })
        });
    
    },
    login: (req, res) => {
        console.log('hsdsd');
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            
            if(!user)
                return res.status(401).send({message: 'Email or password invalid'});
            
            if(req.body.pwd == user.pwd) {
                console.log(req.body, user.pwd);
                res.send({
                    token: createToken(user)
                });
            }
            else {
                    return res.status(401).send({message: 'Invalid/email or password'});
            }
        });
        
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment.unix(),
        exp: moment(moment.unix()).add(14, 'days')//http://stackoverflow.com/questions/17333425/add-a-duration-to-a-moment-moment-js
    };
    return jwt.encode(payload, 'secret');
}