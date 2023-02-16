const mongoose = require('mongoose');

const { Schema } = mongoose;

// MongoDB shema User
const UserSchema = new Schema({
    profilpicture: String,
    email: {
        type: String,
        unique: true
    },
    pseudo: {
        type: String,
        unique: true
    },
    sexe: String,
    hash: String,
    salt: String,
    verification: String,
});

const requestdb = mongoose.model('user', UserSchema);

module.exports.UserSchema = requestdb;