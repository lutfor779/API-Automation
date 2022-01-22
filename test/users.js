import { describe } from "mocha";
import supertest from "supertest";

import { expect } from "chai";

const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN = "d4a4891511f86a9dcc92ee70d4c6dd6eca50b8bb05903c7ac6a9a85a327e828c";

describe.skip('Users', () => {
    it('Getting /users', () => {
        // request.get(`users?access-token=${TOKEN}`).end((err, res) => {
        //     expect(res.body.data).to.not.be.empty;
        //     done();
        return request.get(`users`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.not.be.empty;
            })
    });

    it('Getting /users/:id', () => {
        return request.get(`users/2341`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                // console.log(res.body.data)
                expect(res.body.data.id).to.be.equal(2341);
            });
    });

    it('Getting /users with query params', () => {
        const url = "users?page=5&gender=male&status=active";
        return request.get(url)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                // console.log(res.body.data)
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach(data => {
                    expect(data.gender).to.equal("male");
                    expect(data.status).to.equal("active");
                })
            });
    });



    // POST api testing
    it("Posting /users", () => {
        const data = {
            email: `testing${Math.floor(Math.random() * 9999)}@ss.is`,
            name: 'testing',
            gender: 'male',
            status: 'active'
        };

        return request.post("users")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                // console.log(res.body);                
                expect(res.body.data).to.deep.include(data)
            })
    })


    // PUT api testing
    it('Putting /users/:id', () => {
        const data = {
            name: `Md. Lutfor Rahman ${Math.floor(Math.random() * 999)}`,
            email: `lutfor@eml.in${Math.floor(Math.random() * 999)}`
        }
        return request.put('/users/2341')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                // console.log(res.body)
                expect(res.body.data).to.deep.include(data)
            })
    })



    // DELETE api testing
    it("Deleting /users/:id", () => {
        return request.delete('/users/639')
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                // console.log(res.body.data)
                expect(res.body.data).to.be.equal(null)
            })
    })

});
