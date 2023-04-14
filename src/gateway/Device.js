const DeviceSchema = require('../schema/DeviceSchema');
const MailerMiddleware = require('../../src/middleware/MailerMiddleware');
const { TokenGetInfo } = require('./TokenVerify');

// return list of device for a user
async function Get_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.findOne({ owner: req.body.owner });
}

async function Get_Device_By_Serial(serial) {
    var requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.findOne({ serial: serial });
}

// add a device to a user
async function Add_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    var result = 0;
    if (req.owner == null || req.name == null || req.serial == null || req.owner == "" || req.name == "" || req.serial == "") {
        return -4;
    }

    await requestdb.create({
        owner: req.email,
        name: req.name,
        serial: req.serial,
    }).then(function (data) {
        result = 0;
    }).catch(function (err) {
        /* istanbul ignore next */
        if (err.keyPattern.serial === 1)
            result = -3;
    });
    return result;
}

// Delete a device from a user
async function Devare_Device(req) {
    var requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.deleteOne({ id: req.body.id })
}

async function Purchase_Device(req) {
    var userconnected = TokenGetInfo(req);
    await MailerMiddleware.Mailler_PurchaseDevice(userconnected.email);
}

module.exports = {
    Get_Device,
    Get_Device_By_Serial,
    Add_Device,
    Devare_Device,
    Purchase_Device
};