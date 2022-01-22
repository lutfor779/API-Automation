import { describe } from "mocha";
import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN = "d4a4891511f86a9dcc92ee70d4c6dd6eca50b8bb05903c7ac6a9a85a327e828c";


describe("Negative tests", async () => {
    describe("401 Authentication failed", async () => {
        it('/users', async () => {
            const res = await request.delete(`users/3`)

            expect(401)
            expect(res.body.data.message).to.be.equal("Authentication failed")

        });
    })

    describe("err", async () => {
        it("/users", async () => {
            const data = {
                email: `testing${Math.floor(Math.random() * 9999)}@ss.is`,
                name: 'testing',
                gender: 'male',
            };

            const res = await request.post("users")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)

            expect(422);
            expect(res.body.data[0].field).to.be.equal('status');
            expect(res.body.data[0].message).to.equal("can't be blank")
        })
    })
})