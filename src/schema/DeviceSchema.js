const mongoose = require('mongoose');

const { Schema } = mongoose;

// MongoDB shema Device
const DeviceSchema = new Schema({
    owner: String,
    name: String,
    serial: {
        type: String,
        unique: true
    },
});

const requestdb = mongoose.model('device', DeviceSchema);

module.exports.DeviceSchema = requestdb;