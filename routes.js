const porta = 3001

const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
//const bancoDeDados  = require('./bancodedados')
//const cors = require("cors")
app.use(express.static(__dirname + '/./'));

app.get('/',(req, res) => {
    res.sendFile(__dirname + "/index.html")
})


  app.get('/movie/:id',(req, res) => {
    res.sendFile(__dirname + "/moviedetail.html")
})

app.listen(porta,()=>{
    console.log('funcionou')
    })