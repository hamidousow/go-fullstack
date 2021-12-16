const express = require('express');
const app = express(); // methode pour créer l'appli express
const mongoose = require('mongoose');
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://user-test:motdepasse@cluster0.6fhsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('connexion à MongoDB reussie !'))
    .catch(() => console.log('connexion à MongoDB échouée !'));

app.use(express.json()); // donne acces au corp de la requête (req.body)

//"app.use()" > methode qui permet d'attribuer un middleware à une route spécifique de l'appli
app.use((req, res, next) => {
    //permet dacceder à l'API depuis nimporte quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    //ajouter headers mentionnés aux requêtes vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
})

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save() 
    .then(()=> res.status(201).json({ message: 'Object bien enregistré' }))
    .catch(() => res.status(400).json({ error }))
})

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(() => res.status(404).json({ error }))
})

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'objet modifié !'}))
    .catch(() => res.status(400).json({ error }))
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))
    .catch(() => res.status(400).json({ error }))
    
})

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(() => res.status(400).json({ error }))
});

module.exports = app;