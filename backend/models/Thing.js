const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    //pas besoin de champ pour 'ID' car il est généré automatiquement par mongoose
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Thing', thingSchema);