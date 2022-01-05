const express = require('express');
const app = express(); // methode pour créer l'appli express
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

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

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;