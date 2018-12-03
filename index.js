const restify = require('restify');
require('dotenv').config();
const mongoose = require('mongoose');

const server = restify.createServer();

//Middleware to get form param/ request body value
server.use(restify.plugins.bodyParser());

//middleware for receive query parameter from get request
server.use(restify.plugins.queryParser());

server.listen(3000,()=>{
    //console.log(process.env.MONGODB_URI);
    //mongoose.set('countDocuments', false);
    //mongoose.connect('mongodb://shaikhalamin:'+process.env.MONGO_PASSWORD+'@cluster0-shard-00-00-ejzdu.mongodb.net:27017,cluster0-shard-00-01-ejzdu.mongodb.net:27017,cluster0-shard-00-02-ejzdu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true });
    mongoose.connect('mongodb://localhost:27017/history',{ useNewUrlParser: true });
    console.log(`Server started on port`+3000);
});

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
});
db.once('open',()=>{
    require('./routes/customer')(server);
    require('./routes/users')(server);
});