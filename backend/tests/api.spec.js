require("dotenv").config();
const request = require("supertest");
const api = require("../api");
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Token = require("../models/Token");
describe("Complaint test", () => {
    let api2;
    let validToken;
    beforeAll(async () => {
        // const newUserData = JSON.stringify({username:"tampit",password:"sarac"});
        // const newUser = User.create(newUserData)
        const createToken = await Token.create(1);
        validToken = createToken.token;
        api2 = api.listen(5005, () => {
            console.log("test running");
        });
    });
    beforeEach(async () => {});

    afterAll(async () => {
        await api2.close();
    });

    it("responds with status code 200 for GET requests to /", async () => {
        const response = await request(api2).get("/");
        expect(response.statusCode).toBe(200);
    });

    it("responds with status code 404 for GET requests to invalid URL", async () => {
        const response = await request(api2).get("/invalid");
        expect(response.statusCode).toBe(404);
    });

    it("responds with status code 200 for GET requests to a valid complaint post", async () => {
        const response = await request(api2).get("/complaint/1");
        expect(response.statusCode).toBe(200);
    });

    it("responds with status code 404 for GET requests to invalid id", async () => {
        const response = await request(api2).get("/complaint/5000");
        expect(response.statusCode).toBe(404);
    });

    it("responds with status code 404 for GET requests to invalid category id", async () => {
        const response = await request(api2).get("/complaints2");
        expect(response.statusCode).toBe(404);
    });

    it("responds with status code 403 for POST requests to /complaint with no token data", async () => {
        const response = await request(api2).post("/complaint").send({
            bad: 15,
        });
        expect(response.statusCode).toBe(403);
    });

    //no token data

    it("responds with status code 403 for DELETE requests to /complaint with no token data", async () => {
        const response = await request(api2).delete("/complaint/1").send({
            bad: 15,
        });
        expect(response.statusCode).toBe(403);
    });
    it("responds with status code 403 for PATCH requests to /complaint with no token data", async () => {
        const response = await request(api2).patch("/complaint/1").send({
            bad: 15,
        });
        expect(response.statusCode).toBe(403);
    });

    //invalid token

    it("responds with status code 403 for POST requests to /complaint with invalid token data", async () => {
        const response = await request(api2)
            .post("/complaint")
            .set("Authorization", "invalid")
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(403);
    });
    it("responds with status code 403 for DELETE requests to /complaint with invalid token data", async () => {
        const response = await request(api2)
            .delete("/complaint/1")
            .set("Authorization", "invalid")
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(403);
    });
    it("responds with status code 403 for PATCH requests to /complaint with invalid token data", async () => {
        const response = await request(api2)
            .patch("/complaint/1")
            .set("Authorization", "invalid")
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(403);
    });

    //valid token

    //bad request
    it("responds with status code 403 for bad POST requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .post("/complaint")
            .set("Authorization", validToken)
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(400);
    });
    it("responds with status code 400 for bad DELETE requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .delete("/complaint/1")
            .set("Authorization", validToken)
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(400);
    });
    it("responds with status code 400 for bad PATCH requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .patch("/complaint/1")
            .set("Authorization", validToken)
            .send({
                bad: 15,
            });
        expect(response.statusCode).toBe(400);
    });

    //good requests

    it("responds with status code 200 for good POST requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .post("/complaint")
            .set("Authorization", validToken)
            .send({
                title:"Outrageous!",
                content:"Outrageus complaint!",
                user_id:1
            });
        expect(response.statusCode).toBe(200);
    });
    it("responds with status code 200 for good PATCH requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .patch("/complaint/1")
            .set("Authorization", validToken)
            .send({
                title:"Outrageous!",
                content:"Outrageus complaint!",
                user_id:1
            });
        expect(response.statusCode).toBe(200);
    });
    it("responds with status code 200 for good DELETE requests to /complaint with valid token data", async () => {
        const response = await request(api2)
            .delete("/complaint/1")
            .set("Authorization", validToken)
            .send({
                title:"Outrageous!",
                content:"Outrageus complaint!",
                user_id:1
            });
        expect(response.statusCode).toBe(200);
    });
});
