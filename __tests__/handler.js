// const { describe, test, expect } = require('vitest')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const pseudo = uuidv4();
const serial = uuidv4();
const email = pseudo + "@gmail.com";
const url = "http://127.0.0.1:8080";
let token = "";

describe('[Authentification Registration]', function () {
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
    });

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
    });

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
    });

    test('Register: Missing Param', async () => {
        const res = await axios.post(`${url}/register`).then(response => {
            return response
        }).catch(error => {
            return error
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Renseigner toutes les informations requises")
    });

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
    });

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
    });
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
    });
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
    })
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
    })

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
    })

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
    })
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
    })
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
    })

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
    })
})