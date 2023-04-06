const DeviceSchema = require('../schema/DeviceSchema');
const MailerMiddleware = require('../../src/middleware/MailerMiddleware');

// return list of device for a user
async function Get_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.findOne({ owner: req.body.owner });
}

// add a device to a user
async function Add_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    var result = 0;
    if (req.owner == null || req.name == null || req.serial == null) {
        return -4;
    }
    if (req.owner == "" || req.name == "" || req.serial == "") {
        return -4;
    }

    await requestdb.create({
        owner: req.email,
        name: hash,
        serial: salt,
    }).then(function (data) {
        result = 0;
    }).catch(function (err) {
        if (err.keyPattern.owner === 1)
            result = -1;
        if (err.keyPattern.name === 1)
            result = -2;
        if (err.keyPattern.serial === 1 && err.keyPattern.serial === 1)
            result = -3;
    });
    return result;
}

// Delete a device from a user
async function Devare_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.devareOne({ id: req.body.id })
}

async function Purchase_Device(req) {
    await MailerMiddleware.Mailler_PurchaseDevice(req.body, code);
    return 0
}

module.exports = {
    Get_Device,
    Add_Device,
    Devare_Device,
    Purchase_Device
};