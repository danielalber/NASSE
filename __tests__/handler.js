// const { describe, test, expect } = require('vitest')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const pseudo = uuidv4();
const serial = uuidv4();
const email = pseudo + "@gmail.com";
const url = "http://127.0.0.1:8080";
let token = "";

var db = null

const DeviceGateway = require('../src/gateway/Device');
const DeviceSchema = require('../src/schema/DeviceSchema');
const UserSchema = require('../src/schema/UserSchema')

describe('[Authentification Registration]', function () {
    beforeAll(async () => {
        const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        const helmet = require('helmet');
        const morgan = require('morgan');
        const _ = require('lodash');

        const config = require('../config/config.json');
        const connectiondb = require('../src/middleware/ConnectiondbMiddleware');

        const MongoDBConfig = config.MongoDB;
        const AppConfig = config.App;
        const MaillerConfig = config.Mailler;
        const finalConfig = _.merge(MongoDBConfig, MaillerConfig, AppConfig);

        global.gConfig = finalConfig;

        app = express();

        app.use(cors({ credentials: true, origin: true }));
        app.options('*', cors());

        app.use(helmet());

        app.use(bodyParser.json());

        app.use(morgan('dev'));

        db = connectiondb.connectToDb();

        const Authentification = require('../src/routes/Authentification.js')(app);
        const Device = require('../src/routes/Device.js')(app);

        var port = global.gConfig.AppPort || 8080;

        app.listen(port, () => {
            console.log('listening on port : ' + port);
        });
    });

    test('Register: Successful', async () => {
        const res = await axios.post(`${url}/register`, {
            email: email,
            password: 'HelloBoys',
            pseudo: pseudo
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Compte créé avec succes")
    }, 10000)

    test('Register: Email already in use', async () => {
        const res = await axios.post(`${url}/register`, {
            email: email,
            password: 'HelloBoys',
            pseudo: pseudo
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Email déjà utilisé pour un autre compte")
    }, 10000)

    test('Register: Pseudo already in use', async () => {
        let tmp_email = uuidv4() + "@gmail.com";

        const res = await axios.post(`${url}/register`, {
            email: tmp_email,
            password: 'HelloBoys',
            pseudo: pseudo
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Pseudo déjà utilisé pour un autre compte")
    }, 10000)

    test('Register: Missing Param', async () => {
        const res = await axios.post(`${url}/register`).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Renseigner toutes les informations requises")
    }, 10000)

    // test('Register: Email and Pseudo already in use', async () => {
    //     try {
    //         const res = await axios.post(`${url}/register`, {
    //             email: email,
    //             password: 'HelloBoys',
    //             pseudo: pseudo
    //         })

    //         expect(res.status).toBe(400)
    //         expect(res.data.status).toEqual("KO")
    //         expect(res.data.message).toEqual("Email et Pseudo déjà utilisé pour un autre compte")
    //     } catch (error) {
    //         expect(error.response.status).toBe(400)
    //         expect(error.response.data.status).toEqual("KO")
    //         expect(error.response.data.message).toEqual("Email et Pseudo déjà utilisé pour un autre compte")
    //     }
    // });
})

describe('[Authentification Login]', function () {
    test('Login: Successful', async () => {
        const res = await axios.post(`${url}/login`, {
            email: email,
            password: 'HelloBoys'
        })

        token = res.data.token
        expect(res.status).toBe(200)
        expect(res.data.User.email).toEqual(email)
        expect(res.data.User.pseudo).toEqual(pseudo)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Connexion réussie")
    });

    test("Login: Account don't exist ", async () => {
        const res = await axios.post(`${url}/login`, {
            email: email + "junkEmail",
            password: 'HelloBoysBen'
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Ce compte n'éxiste pas")
    }, 10000)

    test('Login: Wrong login or password', async () => {
        const res = await axios.post(`${url}/login`, {
            email: email,
            password: 'HelloBoysBen'
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Identifiant ou mot de passe incorrect")
    }, 10000)
})

describe('[Authentification Token]', function () {
    test('Authentification: Missing Token', async () => {
        const res = await axios.post(`${url}/resetpassword`).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    })

    test('Authentification: Invalid Token', async () => {
        const res = await axios.post(`${url}/resetpassword`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    })
})

describe('[Reset Password]', function () {
    test('Reset Password: Invalid Token', async () => {
        const res = await axios.post(`${url}/resetpassword`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    })

    test('Reset Password: Missing Param', async () => {
        const res = await axios.post(`${url}/resetpassword`, {
            token: token,
            password: "HelloBoys"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Renseigner toutes les informations requises")
    })

    test('Reset Password: Wrong Password', async () => {
        const res = await axios.post(`${url}/resetpassword`, {
            token: token,
            password: "123456",
            newpassword: "HelloBoys"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Mot de passe actuelle incorrect")
    })

    test('Reset Password: Successful', async () => {
        const res = await axios.post(`${url}/resetpassword`, {
            token: token,
            password: "HelloBoys",
            newpassword: "HelloBoys"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Mot de passe modifié")
    })
})

describe('[Forgot Password: Request Email]', function () {
    test("Forgot Password: Account don't exist", async () => {
        const res = await axios.post(`${url}/forgotpasswordemail`, {
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Le compte n'existe pas")
    })

    test("Forgot Password: Account don't exist", async () => {
        const res = await axios.post(`${url}/forgotpasswordemail`, {
            email: email + email
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Le compte n'existe pas")
    })

    test('Forgot Password: Successful', async () => {
        const res = await axios.post(`${url}/forgotpasswordemail`, {
            email: email
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Email de confirmation envoyé")
    })
})

describe('[Forgot Password: Set New Password]', function () {
    test('Forgot Password: Successful', async () => {
        const res = await axios.post(`${url}/forgotpasswordset`, {
            email: email
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid OTP")
    })


})

describe('[Authentification User Info]', function () {
    test('UserInfo: Valid Token', async () => {
        const res = await axios.post(`${url}/userinfo`, {
            token: token
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.email).toEqual(email)
        expect(res.data.pseudo).toEqual(pseudo)
    });

    test('UserInfo: Invalid Token', async () => {
        const res = await axios.post(`${url}/userinfo`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    }, 10000)
})

describe('[Get Device]', function () {
    test('Device: Get Device Valid Token', async () => {
        const res = await axios.post(`${url}/device`, {
            token: token
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
    })

    test('Device: Get Device Invalid Token', async () => {
        const res = await axios.post(`${url}/device`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    }, 10000)
})

describe('[Add Device]', function () {
    test('Add Device: Invalid Token', async () => {
        const res = await axios.post(`${url}/adddevice`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    }, 10000)

    test('Add Device: Successful', async () => {
        const res = await axios.post(`${url}/adddevice`, {
            token: token,
            owner: email,
            name: "Nasse2023",
            serial: serial
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Device add successfully")
    }, 10000)

    test('Add Device: Without Param', async () => {
        const res = await axios.post(`${url}/adddevice`, {
            token: token
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Fill in all the required information")
    })

    test('Add Device: Serial Already Used', async () => {
        const res = await axios.post(`${url}/adddevice`, {
            token: token,
            owner: email,
            name: "Nasse2023",
            serial: serial
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Error: Serial field")
    }, 10000)
})

describe('[Remove Device]', function () {
    test('Remove Device: Invalid Token', async () => {
        const res = await axios.post(`${url}/removedevice`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    }, 10000)

    test('Remove Device: Successful', async () => {
        var requestdb = DeviceSchema.DeviceSchema;
        let dev = await DeviceGateway.Get_Device_By_Serial(serial)

        const res = await axios.post(`${url}/removedevice`, {
            token: token,
            id: dev._id
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Device remove successfully")
    }, 10000)
})

describe('[Purchase Device]', function () {
    test('Purchase Device: Successful', async () => {
        const res = await axios.post(`${url}/purchasedevice`, {
            token: token
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.status).toBe(200)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Device Purchase")
    }, 10000)

    test('Purchase Device: Invalid Token', async () => {
        const res = await axios.post(`${url}/purchasedevice`, {
            token: "token"
        }).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Invalid Token")
    }, 10000)

    afterAll(async () => {
        var requestdb = UserSchema.UserSchema;
        await requestdb.deleteOne({ email: email })
        await db.close();
    });
})