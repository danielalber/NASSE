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
        let result = await Authentification.Authentification_Login(req);
        let status = 0;

        if (result != null) {
            let hash = crypto.pbkdf2Sync(req.body.password, result.salt, 1000, 64, `sha512`).toString(`hex`);
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
                let code = Math.floor(100000 + Math.random() * 900000)
                let result = await Authentification.Authentification_SetLoginVerificationCode(result.email, code);
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
        let result = await Authentification.Authentification_GetLoginVerificationCode(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Code invalide" });
        } else {
            res.status(200).json({ status: "OK", message: "Code bon" });
        }
    }))

    app.post('/register', cors(), asyncMiddleware(async (req, res) => {
        let result = await Authentification.Authentification_Register(req.body);

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
        let result = await Authentification.Authentification_ResetPasswordEmail(req);

        if (result == -1) {
            res.status(400).json({ status: "KO", message: "Le compte n'existe pas" });
        } else {
            res.status(200).json({ status: "OK", message: "Email de confirmation envoyé" });
        }
    }))

    app.post('/forgotpasswordset', cors(), asyncMiddleware(async (req, res) => {
        let result = await Authentification.Authentification_ResetForgotPassword(req);

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
            let result = await Authentification.Authentification_ResetPassword(req);

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
            let result = await Authentification.Authentification_Get_Info(req);
            res.status(200).json({ status: "OK", email: result.email, pseudo: result.pseudo });
        }
    }))
};