const request = require('supertest');

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const pseudo = uuidv4();
const email = pseudo + "@gmail.com";
const url = "http://127.0.0.1:8080";

describe('Authentification Registration', function () {
    test('Register: Successful', async () => {
        const res = await axios.post(`${url}/register`, {
            email: email,
            password: 'HelloBoys',
            pseudo: pseudo
        }).then(response => {
            return response
        }).catch(error => {
            return error;
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
            return error;
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
            return error;
        })

        expect(res.response.status).toBe(400)
        expect(res.response.data.status).toEqual("KO")
        expect(res.response.data.message).toEqual("Pseudo déjà utilisé pour un autre compte")
    });

    test('Register: Missing Param', async () => {
        const res = await axios.post(`${url}/register`).then(response => {
            return response
        }).catch(error => {
            return error;
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

describe('Authentification Login', function () {
    test('Login', async () => {
        const res = await axios.post(`${url}/login`, {
            email: email,
            password: 'HelloBoys'
        })
        expect(res.status).toBe(200)
        expect(res.data.User.email).toEqual(email)
        expect(res.data.User.pseudo).toEqual(pseudo)
        expect(res.data.status).toEqual("OK")
        expect(res.data.message).toEqual("Connexion réussie")
    });

})

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc3OGE2N2IxZTc3YTBlYWMwNzRiOGUiLCJlbWFpbCI6ImRhbmllbC5hbGJlcmd1Y2NpQGVwaXRlY2guZXUiLCJwc2V1ZG8iOiJTcGVlZGdsaW5nIiwiaWF0IjoxNjgwNzcwMTM3LCJleHAiOjE2ODA4NTY1Mzd9.nbjU51kvKsBAOns0J68rfp1jWtkDLnbYY2AMczg-gG4",
