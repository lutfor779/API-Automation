import { describe } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import { createUser, deleteUser } from "../helper/user_helper";

const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN = "d4a4891511f86a9dcc92ee70d4c6dd6eca50b8bb05903c7ac6a9a85a327e828c";

describe("Users Posts", async () => {
    let postId, userId;

    before(async () => {
        userId = await createUser();
    })

    after(async () => {
        await deleteUser(userId);
    })


    // POST api testing
    describe("/POST", async () => {
        it("/post", async () => {
            const data = {
                user_id: userId,
                title: 'test',
                body: "it is just for testing"
            }

            const res = await request.post("posts")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)

            expect(res.body.data).to.deep.include(data);
            postId = res.body.data.id;
        })
    })

    // GET api testing
    describe("GET", async () => {

        describe("posts", async () => {
            it("posts", async () => {
                const res = await request.get("posts")
                    .set("Authorization", `Bearer ${TOKEN}`)

                expect(res.body.data).to.not.to.be.empty;
            })
        })

        describe("posts/:id", async () => {
            it("posts/:id", async () => {
                const res = await request.get(`posts/${postId}`)
                    .set("Authorization", `Bearer ${TOKEN}`)

                expect(res.body.data).not.to.be.equal(null)
            })
        })

    })

    // PUT api testing
    describe("PUT", async () => {
        it('/posts/:id', async () => {
            const data = {
                title: `Md. Lutfor Rahman ${postId}`,
                body: `lutfor- ${Math.floor(Math.random() * 999999)}`
            }
            const res = await request.put(`/posts/${postId}`)
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)

            expect(res.body.data).to.deep.include(data);
        })
    })

    // DELETE api testing
    describe("DELETE", async () => {
        it("/posts/:id", async () => {
            const res = await request.delete(`/posts/${postId}`)
                .set("Authorization", `Bearer ${TOKEN}`)

            expect(res.body.data).to.be.equal(undefined);
        })
    })

})