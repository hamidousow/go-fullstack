const express = require('express');

const app = express()

//"app.use()" > methode qui permet d'attribuer un middlewae à une route spécifique de l'appli
app.use((req, res, next) => {
    //permet dacceder à l'API depuis nimporte quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    //ajouter headers mentionnés aux requêtes vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
    {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
    },
    {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
    },
    ];
    res.status(200).json(stuff);
});

module.exports = app;