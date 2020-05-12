const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path = require('path');

require('dotenv').config();

const app= express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//open connection to the database using Connection String used as an environment Variable
const uri = process.env.STORE_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});


const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB for Store connected successfully");
})
//

//Using the Routes for the Project in the Server
const productsRouter = require('./routes/Products.route');


app.use('/api/products',productsRouter);
//

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port,()=>{
    console.log(`Server is runnig on port: ${port}`);
})