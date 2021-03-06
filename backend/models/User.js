const mongoose = require('mongoose');
const uniqueValidator = required('mongoose-unique-validator')

const userSchema = ({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

