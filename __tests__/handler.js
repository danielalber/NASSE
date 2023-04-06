const request = require('supertest');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
// const axios = require('axios');

const pseudo = uuidv4();
const email = pseudo + "@gmail.com";
const url = "http"
describe('Test Authentification', function () {
    test('Register: Successful', async () => {
        http.get({ path: url }, response => {
            let data = '';
            response.on('data', _data => (data += _data));
            response.on('end', () => resolve(data));
        });
        // const res = await axios.post(`${url}/register`, {
        //     email: email,
        //     password: 'HelloBoys',
        //     pseudo: pseudo
        // })

        // expect(res.status).toBe(200)
        // expect(res.data.status).toEqual("OK")
        // expect(res.data.message).toEqual("Compte créé avec succes")
    });

    // test('Register: Email already in use', async () => {
    //     const res = await axios.post(`${url}/register`, {
    //         email: email,
    //         password: 'HelloBoys',
    //         pseudo: pseudo
    //     })

    //     expect(res.status).toBe(400)
    //     expect(res.data.status).toEqual("KO")
    //     expect(res.data.message).toEqual("Email déjà utilisé pour un autre compte")
    // });

    // test('Register: Pseudo already in use', async () => {
    //     const res = await axios.post(`${url}/register`, {
    //         email: email,
    //         password: 'HelloBoys',
    //         pseudo: pseudo
    //     })

    //     expect(res.status).toBe(400)
    //     expect(res.data.status).toEqual("KO")
    //     expect(res.data.message).toEqual("Pseudo déjà utilisé pour un autre compte")
    // });

    // test('Register: Email and Pseudo already in use', async () => {
    //     const res = await axios.post(`${url}/register`, {
    //         email: email,
    //         password: 'HelloBoys',
    //         pseudo: pseudo
    //     })

    //     expect(res.status).toBe(400)
    //     expect(res.data.status).toEqual("KO")
    //     expect(res.data.message).toEqual("Email et Pseudo déjà utilisé pour un autre compte")
    // });

    // test('Register: Missing Param', async () => {
    //     const res = await axios.post(`${url}/register`)

    //     expect(res.status).toBe(400)
    //     expect(res.data.status).toEqual("KO")
    //     expect(res.data.message).toEqual("Renseigner toutes les informations requises")
    // });

    // test('Login', async () => {
    //     const res = await axios.post(`${url}/login`, {
    //         email: email,
    //         password: 'HelloBoys'
    //     })
    //     expect(res.status).toBe(200)
    //     expect(res.data.User).toEqual({
    //         "email": email,
    //         "userId": "63778a67b1e77a0eac074b8e",
    //         "pseudo": pseudo
    //     })
    //     expect(res.data.status).toEqual("OK")
    //     expect(res.data.message).toEqual("Connexion réussie")
    // });
})



// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc3OGE2N2IxZTc3YTBlYWMwNzRiOGUiLCJlbWFpbCI6ImRhbmllbC5hbGJlcmd1Y2NpQGVwaXRlY2guZXUiLCJwc2V1ZG8iOiJTcGVlZGdsaW5nIiwiaWF0IjoxNjgwNzcwMTM3LCJleHAiOjE2ODA4NTY1Mzd9.nbjU51kvKsBAOns0J68rfp1jWtkDLnbYY2AMczg-gG4",
