const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save() 
    .then(()=> res.status(201).json({ message: 'Object bien enregistré' }))
    .catch(() => res.status(400).json({ error }))
}

exports.modifyThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(() => res.status(404).json({ error }))
}

