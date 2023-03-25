const express = require('express');
const mongoose = require('mongoose')
const app = express()

// conexion à mongoDB
mongoose.connect('mongodb+srv://nathan_WCS:argonautesDB@argonautesnames.0sku53s.mongodb.net/?retryWrites=true&w=majority', 
    {  useNewUrlParser : true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())

// gere les problemes de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// gestion des routes :

const name = require('./modeles/name')
app.post('/api/nameInput', (req, res, next) => {
    const nameInput = JSON.parse(req.body.nameInput)
    const newName = new name({
        ...nameInput
    })
    newName.save()
        .then(() => res.status(201).json({message : "nom ajouté !"}))
        .catch(error => res.status(400).json({error}))
})

module.exports = app;