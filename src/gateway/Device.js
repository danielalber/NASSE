const DeviceSchema = require('../schema/DeviceSchema');

async function Get_Device(req) 
{
    let requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.findOne({ owner: req.body.owner });
}

async function Add_Device(req) 
{
    let requestdb = DeviceSchema.DeviceSchema;

    let result = 0;
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

async function Delete_Device(req) 
{
    let requestdb = DeviceSchema.DeviceSchema;

    return await requestdb.deleteOne({ id: req.body.id })
}

module.exports = {
    Get_Device,
    Add_Device,
    Delete_Device
};