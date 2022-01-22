import { describe } from "mocha";
import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN = "d4a4891511f86a9dcc92ee70d4c6dd6eca50b8bb05903c7ac6a9a85a327e828c";

describe('Users', async () => {
    let userId;

    // POST api testing
    describe("POST", async () => {
        it("/users", async () => {
            const data = {
                email: `testing${Math.floor(Math.random() * 9999)}@ss.is`,
                name: 'testing',
                gender: 'male',
                status: 'active'
            };

            const res = await request.post("users")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)

            expect(res.body.data).to.deep.include(data);
            userId = res.body.data.id;
        })
    })

    // GET api testing
    describe("GET", async () => {
        it('/users', async () => {
            const res = await request.get(`users`)
                .set("Authorization", `Bearer ${TOKEN}`)

            expect(res.body.data).to.not.be.empty;

        });

        it('/users/:id', async () => {
            const res = await request.get(`users/${userId}`)
                .set("Authorization", `Bearer ${TOKEN}`)

            expect(res.body.data.id).to.be.equal(userId);

        });

        it('/users with query params', async () => {
            const url = "users?page=5&gender=male&status=active";

            const res = await request.get(url)
                .set("Authorization", `Bearer ${TOKEN}`)

            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.equal("male");
                expect(data.status).to.equal("active");

            });
        });
    })

    // PUT api testing
    describe("PUT", async () => {
        it('/users/:id', async () => {
            const data = {
                name: `Md. Lutfor Rahman ${userId}`,
                email: `lutfor@eml.in${Math.floor(Math.random() * 999)}`
            }

            const res = await request.put(`/users/${userId}`)
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)

            expect(res.body.data).to.deep.include(data)

        })
    })

    // DELETE api testing
    describe("DELETE", async () => {
        it("/users/:id", async () => {
            const res = await request.delete(`/users/${userId}`)
                .set("Authorization", `Bearer ${TOKEN}`)

            expect(res.body.data).to.be.equal(undefined)
        })
    })


});
