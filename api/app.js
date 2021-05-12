require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app  = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@initial.7cbb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true })
    .then(res=>{
        console.log('db connected')
    })
    .catch(err=>{
        console.log(err);
    })

app.get('/',(req,res)=>{
    //Can write the documentation here
    res.send('This is the backend')
})

app.use('/items', require('./routes/item'))

app.use((req,res)=>{
    res.status(404).json({
        'err':'API endpoint not found'
    })
})

app.listen(process.env.PORT || 8080)