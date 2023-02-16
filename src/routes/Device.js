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
 *         pseudo:
 *           type: string
 *           description: Pseudo of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         sexe:
 *           type: string
 *           description: Sexe of the user
 *         hash:
 *           type: string
 *           description: Hash of the user password
 *         salf:
 *           type: string
 *           description: Salf of the user hash
 *         verification:
 *           type: string
 *           description: Verification Code of the user hash
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 * tags:
 *   name: User
 *   description: The books managing API
 * /login:
 *   post:
 *     summary: User Connexion
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *               password: APzo
 *     responses:
 *       200:
 *         description: Login Successfull
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               User:
 *                  userId: 63dcd5cddc8d74a38b524cbc
 *                  email: nathanp83550@gmail.com
 *                  profilpicture": "undefined"
 *                  sexe: M
 *                  pseudo: poliskovia
 *               status: The New Turing Omnibus
 *               token: Alexander K. Dewdney
 *               message: false
 *       400:
 *         description: Login Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /register:
 *   post:
 *     summary: User Register
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *               pseudo: Speedgling
 *               password: APzo
 *     responses:
 *       200:
 *         description: register Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Successful Message
 *       400:
 *         description: register Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /otp:
 *   post:
 *     summary: Otp Verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *               code: 1234
 *     responses:
 *       200:
 *         description: TOP Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Successful Message
 *       400:
 *         description: OTP Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /forgotpasswordemail:
 *   post:
 *     summary: Forgot Password Request
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *     responses:
 *       200:
 *         description: Forgot Password Request Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Successful Message
 *       400:
 *         description: Forgot Password Request Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /forgotpasswordset:
 *   post:
 *     summary: Forgot Password Set
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *               password: ApZoEiru
 *     responses:
 *       200:
 *         description: Forgot Password Set Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Successful Message
 *       400:
 *         description: Forgot Password Set Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /resetpassword:
 *   post:
 *     summary: Forgot Password Set
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               email: daniel.albergucci@epitech.eu
 *               password: ApZoEiru
 *               newpassword: QmSlDkFjGH
 *               token: akljebzaegzaeaziueaziaziuebaliudbibiufboèg87TG69VR983TV9878087R87
 *     responses:
 *       200:
 *         description: Forgot Password Set Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               message: Successful Message
 *       400:
 *         description: Forgot Password Set Error
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: KO
 *               message: Error Message
 *
 * /userinfo:
 *   post:
 *     summary: User Info
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *               token: akljebzaegzaeaziueaziaziuebaliudbibiufboèg87TG69VR983TV9878087R87
 *     responses:
 *       200:
 *         description: User Info Successful
 *         content:
 *           application/json:
 *             schema:
 *              example:
 *               status: OK
 *               email: nathanp83550@gmail.com
 *               pseudo: poliskovia
 *       400:
 *         description: User Info Error
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