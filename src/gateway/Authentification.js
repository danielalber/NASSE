const crypto = require('crypto')
const UserSchema = require('../schema/UserSchema');
const { TokenGetInfo } = require('./TokenVerify');
const MailerMiddleware = require('../../src/middleware/MailerMiddleware');
const { v4: uuidv4 } = require('uuid');

// Create a account to a user
async function Authentification_Register(req) {
    var requestdb = UserSchema.UserSchema;

    var result = 0;

    if (req.email == null || req.password == null || req.pseudo == null) {
        return -4;
    }

    if (req.email == "" || req.password == "" || req.pseudo == "") {
        return -4;
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.password, salt, 1000, 64, `sha512`).toString(`hex`);

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
        if (err.keyPattern.email === 1 && err.keyPattern.pseudo === 1)
            result = -3;
        if (err.keyPattern.email === 1)
            result = -1;
        if (err.keyPattern.pseudo === 1)
            result = -2;
    });
    return result;
}

// Authentificate a user
async function Authentification_Login(req) {
    var requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email })
}

// Request a mail for recovery password
async function Authentification_ResetPasswordEmail(req) {
    var requestdb = UserSchema.UserSchema;

    if (req.body.email == null) {
        return -1;
    }
    if (req.body.email == "") {
        return -1;
    }

    var user = await requestdb.findOne({ email: req.body.email });

    if (user) {
        var code = Math.floor(100000 + Math.random() * 900000);
        await Authentification_SetLoginVerificationCode(user.email, code);
        await MailerMiddleware.Mailler_LoginConfirmationAccount(req.body, code);
        return 0
    } else {
        return -1;
    }
}

// Reset password when logged
async function Authentification_ResetPassword(req) {
    var requestdb = UserSchema.UserSchema;

    if (req.body.password == null || req.body.newpassword == null) {
        return -1;
    }
    if (req.body.password == "" || req.body.newpassword == "") {
        return -1;
    }

    var userconnected = TokenGetInfo(req);
    var user = await requestdb.findOne({ email: userconnected.email });
    var prev_hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);

    if (user.hash != prev_hash) {
        return -2;
    } else {
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(req.body.newpassword, salt, 1000, 64, `sha512`).toString(`hex`);

        await requestdb.updateOne({ email: user.email }, { $set: { "hash": hash, "salt": salt } });
        return 0;
    }
}

// Reset password if not logged
async function Authentification_ResetForgotPassword(req) {
    var requestdb = UserSchema.UserSchema;

    if (req.body.password == null) {
        return -1;
    }
    if (req.body.password == "") {
        return -1;
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
    await requestdb.updateOne({ email: req.body.email }, { $set: { "hash": hash, "salt": salt } });
    return 0;
}

// get information about a user
async function Authentification_Get_Info(req) {
    var requestdb = UserSchema.UserSchema;
    var userconnected = TokenGetInfo(req);

    return await requestdb.findOne({ email: userconnected.email });
}

// get id from a user
async function Authentification_Get_userId(req) {
    var requestdb = UserSchema.UserSchema;

    return await requestdb.findOne({ email: req.body.email });
}

// Set a OTP code verification to a user
async function Authentification_SetLoginVerificationCode(email, code) {
    var requestdb = UserSchema.UserSchema;

    await requestdb.updateOne({ email: email }, { $set: { "verification": code } });
}

// set profil picture
async function Authentification_SetProfilPicture(userId, fileUrl) {
    var requestdb = UserSchema.UserSchema;
    return await requestdb.updateOne({ _id: userId }, { $set: { "profilpicture": fileUrl } });
}

// get TOP verification code
async function Authentification_GetLoginVerificationCode(req) {
    var requestdb = UserSchema.UserSchema;

    var res = await requestdb.findOne({ email: req.body.email });

    if (res.verification == req.body.code) {
        await requestdb.updateOne({ email: req.body.email }, { $set: { "verification": uuidv4() } });
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