const nodemailer = require("nodemailer");

async function Mailler_ForgotPasswordEmail(req, compte, generatePassword) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: global.gConfig.Mailler_Email,
            pass: global.gConfig.Mailler_Password,
        },
        tls: { rejectUnauthorized: false }
    });

    var info = await transporter.sendMail({
        from: '"KiwiGram" <KiwiGram.app.epitech@gmail.com>',
        to: req.body.email,
        subject: "Email de récupération de mot de passe",
        text: "Bonjour " + compte.pseudo + ", Une demande de modification de votre mot de passe à été éffectué,  Voici Votre nouveau mot de passe :" + generatePassword + "Veuillez réinitialiser votre mot de passe dès votre connexion! Si vous n'êtes pas l'auteur de cette demande veuillez contacter le support le plus rapidement possible", // plain text body
        html: "Bonjour <b>" + compte.pseudo + "<br></b><br>Une demande de modification de votre mot de passe à été éffectué, <br><br>Voici Votre nouveau mot de passe :<br><b><pre>" + generatePassword + "</pre></b><br><b><u> Veuillez réinitialiser votre mot de passe dès votre connexion!</u></b><br><br><u>Si vous n'êtes pas l'auteur de cette demande veuillez contacter le support le plus rapidement possible</u>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

async function Mailler_LoginConfirmationAccount(req, generateCode) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: global.gConfig.Mailler_Email,
            pass: global.gConfig.Mailler_Password,
        },
        tls: { rejectUnauthorized: false }
    });

    var info = await transporter.sendMail({
        from: '"KiwiGram" <KiwiGram.app.epitech@gmail.com>',
        to: req.email,
        subject: "Code de confirmation de connexion",
        text: "Bonjour " + req.pseudo + ", Une demande de connexion à été éffectué,  Voici Votre nouveau code de confirmation :" + generateCode + "pour vous connecter", // plain text body
        html: "Bonjour <b>" + req.pseudo + "<br></b><br>Une demande de connexion à été éffectué, <br><br>Voici Votre nouveau code de confirmation pour vous connecter :<br><b><pre>" + generateCode + "</pre></b><br><br><u>Si vous n'êtes pas l'auteur de cette demande veuillez contacter le support le plus rapidement possible</u>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

async function Mailler_PurchaseDevice(receiver) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: global.gConfig.Mailler_Email,
            pass: global.gConfig.Mailler_Password,
        },
        tls: { rejectUnauthorized: false }
    });

    var info = await transporter.sendMail({
        from: '"KiwiGram" <KiwiGram.app.epitech@gmail.com>',
        to: receiver,
        subject: "Pornhub Premium Account Created",
        text: "Unkiki", // plain text body
        html: "Unkiki", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    Mailler_ForgotPasswordEmail,
    Mailler_LoginConfirmationAccount,
    Mailler_PurchaseDevice
}