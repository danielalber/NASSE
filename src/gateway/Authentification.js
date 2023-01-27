const crypto = require('crypto')
const UserSchema = require('../schema/UserSchema');
const { TokenGetInfo } = require('./TokenVerify');
const MailerMiddleware = require('../../src/middleware/MailerMiddleware');

async function Authentification_Register(req) {
    let requestdb = UserSchema.UserSchema;
    console.log(req);
    let result = 0;
    if (req.email == null || req.password == null || req.pseudo == null) {
        return -4;
    }
    if (req.email == "" || req.password == "" || req.pseudo == "") {
        return -4;
    }

    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.password, salt, 1000, 64, `sha512`).toString(`hex`);

    await requestdb.create({
        email: req.email,
        hash: hash,
        salt: salt,
        pseudo: req.pseudo,
        sexe: req.sexe,
        profilpicture: "undefined"
    }).then(function (data) {
        result = 0;
    }).catch(function (err) {
        if (err.keyPattern.email === 1)
            result = -1;
        if (err.keyPattern.pseudo === 1)
            result = -2;
        if (err.keyPattern.email === 1 && err.keyPattern.pseudo === 1)
            result = -3;
    });
    return result;
}

async function Authentification_Login(req) {
    let requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email })
}

async function Authentification_ResetPasswordEmail(req) {
    let requestdb = UserSchema.UserSchema;

    if (req.body.email == null || req.body.email == null) {
        return -1;
    }
    if (req.body.email == "" || req.body.email == "") {
        return -1;
    }

    let user = await requestdb.findOne({ email: req.body.email });

    if (user) {
        let code = Math.floor(100000 + Math.random() * 900000);
        await Authentification_SetLoginVerificationCode(user.email, code);
        await MailerMiddleware.Mailler_LoginConfirmationAccount(req.body, code);
        return 0
    } else {
        return -1;
    }
}

async function Authentification_ResetPassword(req) {
    let requestdb = UserSchema.UserSchema;

    if (req.body.password == null || req.body.newpassword == null) {
        return -1;
    }
    if (req.body.password == "" || req.body.newpassword == "") {
        return -1;
    }

    let userconnected = TokenGetInfo(req);
    let user = await requestdb.findOne({ email: userconnected.email });
    let prev_hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);

    if (user.hash != prev_hash) {
        return -2;
    } else {
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(req.body.newpassword, salt, 1000, 64, `sha512`).toString(`hex`);

        await requestdb.updateOne({ email: user.email }, { $set: { "hash": hash, "salt": salt } });
        return 0;
    }
}

async function Authentification_ResetForgotPassword(req) {
    let requestdb = UserSchema.UserSchema;

    if (req.body.password == null) {
        return -1;
    }
    if (req.body.password == "") {
        return -1;
    }

    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
    console.log(hash)
    await requestdb.updateOne({ email: req.body.email }, { $set: { "hash": hash, "salt": salt } });
    return 0;
}

async function Authentification_Get_Info(req) {
    let requestdb = UserSchema.UserSchema;
    let userconnected = TokenGetInfo(req);

    return await requestdb.findOne({ email: userconnected.email });
}

async function Authentification_Get_userId(req) {
    let requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email });
}

async function Authentification_SetLoginVerificationCode(email, code) {
    let requestdb = UserSchema.UserSchema;

    await requestdb.updateOne({ email: email }, { $set: { "verification": code } });
}

async function Authentification_SetProfilPicture(userId, fileUrl) {
    let requestdb = UserSchema.UserSchema;
    return await requestdb.updateOne({ _id: userId }, { $set: { "profilpicture": fileUrl } });
}

async function Authentification_GetLoginVerificationCode(req) {
    let requestdb = UserSchema.UserSchema;

    let res = await requestdb.findOne({ email: req.body.email });

    if (res.verification == req.body.code) {
        return 0;
    }
    return -1;
}

module.exports = {
    Authentification_Register,
    Authentification_Login,
    Authentification_SetLoginVerificationCode,
    Authentification_GetLoginVerificationCode,
    Authentification_ResetPassword,
    Authentification_Get_Info,
    Authentification_Get_userId,
    Authentification_ResetPasswordEmail,
    Authentification_ResetForgotPassword,
    Authentification_SetProfilPicture
};