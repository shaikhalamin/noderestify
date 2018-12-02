const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../models/User');

module.exports = (server)=>{

    server.get('/users', async (req,res,next)=>{

        try {
            const user = await User.find({});
            res.send(user);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }

    });

    server.post('/users', async (req,res,next)=>{

        const {email,password} = req.body;

        const requestObj = {
            email:email,
            password:password
        }

        const joiSchema = Joi.object().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        });

        const {error,value} = Joi.validate(requestObj,joiSchema);
        
        if(error){
            res.send(302,error.details);
        }

        const user = new User(requestObj);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password =  hash;

        try {
            const newUser = await user.save();
            res.send(201,user);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }

    });

}