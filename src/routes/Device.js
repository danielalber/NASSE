/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - owner
 *         - name
 *         - serial
 *       properties:
 *         owner:
 *           type: string
 *           description: Id of the owner
 *         name:
 *           type: string
 *           description: name of the device
 *         serial:
 *           type: string
 *           description: serial of the device
 *       example:
 *         owner: AZE6ZAEAZ0EGZAEGZA0EAZG
 *         name: Nasse personnel
 *         serial: AZE9865
 * tags:
 *   name: User
 *   description: The books managing API
 * /device:
 *   post:
 *     summary: Device List
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               owner: speedgling
 *               token: a9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khv
 *     responses:
 *       200:
 *         description: Device List Successfull
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: List of device
 *       400:
 *         description: Device List Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /adddevice:
 *   post:
 *     summary: Add Device
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               owner: speedgling
 *               name: Nasse2000
 *               serial: N2183609218369021836
 *               token: a9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khv
 *     responses:
 *       200:
 *         description: Add Device Successfull
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: List of device
 *       400:
 *         description: Add Device Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /removedevice:
 *   post:
 *     summary: Remove Device
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               id: 123aze123sqd21
 *               token: a9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khva9z6zbhbh67487jhvkjhv764khv
 *     responses:
 *       200:
 *         description: Remove Device Successfull
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Device remove successfully
 *       400:
 *         description: Remove Device Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 */
const cors = require('cors');
const { asyncMiddleware } = require('middleware-async');
const bp = require('body-parser');

const Device = require('../../src/gateway/Device');
const TokenVerify = require('../../src/gateway/TokenVerify');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    // Get list of revice
    app.post('/device', cors(), asyncMiddleware(async (req, res) => {
        // Check token
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Device.Get_Device(req);
            res.status(200).json({ status: "OK", message: result });

        }
    }))

    // add device
    app.post('/adddevice', cors(), asyncMiddleware(async (req, res) => {
        // Check token
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

    // remove device
    app.post('/removedevice', cors(), asyncMiddleware(async (req, res) => {
        // Check token
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            Device.Devare_Device(req);
            res.status(200).json({ status: "OK", message: "Device remove successfully" });
        }
    }))

    // purchase device
    app.post('/purchasedevice', cors(), asyncMiddleware(async (req, res) => {
        // Check token
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            Device.Devare_Device(req);
            res.status(200).json({ status: "OK", message: "Device Purchase" });
        }
    }))
};