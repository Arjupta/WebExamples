const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const mongoose = require('mongoose');

const pass = 'rLyjQJBmOl1RMI2e';
const orderRoutes = require('./api/routes/orders');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://arjupta:rLyjQJBmOl1RMI2e@node-rest.tuzw8.mongodb.net/node-rest?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes to direct
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error :{
            message:error.message+''
        }
    })
});

// app.use((req,res,next)=>{
//     res.status(200).json({
//         message : 'It Works'
//     })
// });

module.exports = app;