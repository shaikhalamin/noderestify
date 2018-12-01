const errors = require('restify-errors');
const Customer = require('../models/customer');
const Joi = require('joi');

module.exports = (server)=>{

server.get('/customers',async (req,res,next)=>{

    try {
        const customers = await Customer.find({});
        res.send(customers);
        next();
    } catch (err) {
        return next(new errors.InvalidContentError(err));  
    }
    
});

server.post('/customers',async (req,res,next)=>{

    const {name,email,balance} = req.body;

    const requestObj = {
        name:name,
        email:email,
        balance:balance
    }

    const schema = Joi.object().keys({
        name:Joi.string().alphanum().required(),
        email:Joi.string().required()
    });

    const {error,value} = Joi.validate(requestObj,schema);

    if(error){
        res.send(302,error.details);
    }
    
    const customer = new Customer(requestObj);

    try {
        
        const newCustomer = await customer.save();
        res.send(201,customer);
        next();
    } catch (err) {
        return next(new errors.InternalError(err.message));
    }
   
});

}