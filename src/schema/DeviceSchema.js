const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeviceSchema = new Schema({
    owner: String,
    name: String,
    serial: String,
});

const requestdb = mongoose.model('device', DeviceSchema);

module.exports.DeviceSchema = requestdb;