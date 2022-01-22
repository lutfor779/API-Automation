import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v1/");

const TOKEN = "d4a4891511f86a9dcc92ee70d4c6dd6eca50b8bb05903c7ac6a9a85a327e828c";

export const createUser = async () => {
    const data = {
        email: `testing${Math.floor(Math.random() * 9999)}@ss.is`,
        name: 'testing',
        gender: 'male',
        status: 'active'
    };

    const res = await request.post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)

    return res.body.data.id;
}

export const deleteUser = async (userId) => {
    const res = await request.delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
}