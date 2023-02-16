const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');

const Device = require('../../src/gateway/Device');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.post('/device', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Device.Get_Device(req);
            res.status(200).json({ status: "OK", message: result });

        }
    }))

    app.post('/adddevice', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Device.Add_Device(req);
            switch (result) {
                case 0:
                    res.status(200).json({ status: "OK", message: "Device add successfully" });
                    break
                case -1:
                    res.status(400).json({ status: "KO", message: "Error: Owner field" });
                    break;
                case -2:
                    res.status(400).json({ status: "KO", message: "Error: Device name field" });
                    break;
                case -3:
                    res.status(400).json({ status: "KO", message: "Error: Serial field" });
                    break;
                case -4:
                    res.status(400).json({ status: "KO", message: "Fill in all the required information" });
                    break;
            }
        }
    }))

    app.post('/removedevice', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            Device.Devare_Device(req);
            res.status(200).json({ status: "OK", message: "Device devare successfully" });
        }
    }))
};