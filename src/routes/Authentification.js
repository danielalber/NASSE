/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the user
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
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Authentification = require('../../src/gateway/Authentification');
const TokenVerify = require('../../src/gateway/TokenVerify');
const MailerMiddleware = require('../middleware/MailerMiddleware');

module.exports = function (app) {
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));

    app.post('/login', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_Login(req);
        var status = 0;

        if (result != null) {
            var hash = crypto.pbkdf2Sync(req.body.password, result.salt, 1000, 64, `sha512`).toString(`hex`);
            if (hash != result.hash)
                status = -2
        } else {
            status = -1;
        }

        switch (status) {
            case 0:
                res.status(200).json({
                    User: {
                        userId: result._id,
                        email: result.email,
                        profilpicture: result.profilpicture,
                        sexe: result.sexe,
                        pseudo: result.pseudo
                    },
                    status: "OK",
                    token: jwt.sign({ userId: result._id, email: result.email, pseudo: result.pseudo },
                        '%hx5g@BdocPDX4D^P#owO#11tg5R$RX#', { expiresIn: '24h' }
                    ),
                    message: "Connexion réussie"
                });
                var code = Math.floor(100000 + Math.random() * 900000)
                var result = await Authentification.Authentification_SetLoginVerificationCode(result.email, code);
                await MailerMiddleware.Mailler_LoginConfirmationAccount(req.body, code);
                break;
            case -1:
                res.status(400).json({ status: "KO", message: "Ce compte n'éxiste pas" });
                break;
            case -2:
                res.status(400).json({ status: "KO", message: "Identifiant ou mot de passe incorrect" });
                break;
        }
    }))

    app.post('/otp', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_GetLoginVerificationCode(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Code invalide" });
        } else {
            res.status(200).json({ status: "OK", message: "Code bon" });
        }
    }))

    app.post('/register', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_Register(req.body);

        switch (result) {
            case 0:
                res.status(200).json({ status: "OK", message: "Compte créé avec succes" });
                break
            case -1:
                res.status(400).json({ status: "KO", message: "Email déjà utilisé pour un autre compte" });
                break;
            case -2:
                res.status(400).json({ status: "KO", message: "Pseudo déjà utilisé pour un autre compte" });
                break;
            case -3:
                res.status(400).json({ status: "KO", message: "Email et Pseudo déjà utilisé pour un autre compte" });
                break;
            case -4:
                res.status(400).json({ status: "KO", message: "Renseigner toutes les informations requises" });
                break;
        }
    }))

    app.get('/logout', cors(), (req, res) => {
        res.send('Welcome to Logout');
    })

    app.post('/forgotpasswordemail', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_ResetPasswordEmail(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Le compte n'existe pas" });
        } else {
            res.status(200).json({ status: "OK", message: "Email de confirmation envoyé" });
        }
    }))

    app.post('/forgotpasswordset', cors(), asyncMiddleware(async (req, res) => {
        var result = await Authentification.Authentification_ResetForgotPassword(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Error" });
        } else {
            res.status(200).json({ status: "OK", message: "Mot de passe modifié" });
        }
    }))

    app.post('/resetpassword', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Authentification.Authentification_ResetPassword(req);

            switch (result) {
                case 0:
                    res.status(200).json({ status: "OK", message: "Mot de passe modifié" });
                    break;
                case -1:
                    res.status(400).json({ status: "KO", message: "Renseigner toutes les informations requises" });
                    break;
                case -2:
                    res.status(400).json({ status: "KO", message: "Mot de passe actuelle incorrect" });
                    break;
                default:
                    res.status(400).json({ status: "KO", message: "Error" });
                    break;
            }
        }
    }))

    app.post('/userinfo', cors(), asyncMiddleware(async (req, res) => {
        if (TokenVerify.TokenVerify(req) == -1)
            res.status(400).json({ status: "KO", message: "Invalid Token" });
        else {
            var result = await Authentification.Authentification_Get_Info(req);
            res.status(200).json({ status: "OK", email: result.email, pseudo: result.pseudo });
        }
    }))
};