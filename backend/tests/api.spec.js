require("dotenv").config();
const request = require("supertest");
const api = require("../api");
const User = require("../models/User");
describe("User Tests",()=>{
    it("should create a new user", async ()=>{
        const data = JSON.stringify({"username":'shoshi1', "password":'test',"isAdmin":true});
        console.log(data);
        await User.create(data);
        const response1 = await User.getOneByUsername('shoshi1');
        expect(response1);
    });
    it("should have a default user", async ()=>{
        const response = await User.getOneByUsername('shoshi');
        expect(response);
    });
    it("Throws an error when user does not exist", async ()=>{
        expect(await User.getOneByUsername('Idonotexist')).toThrow("Unable to locate user.");
    });
});
describe("API tests", () => {
    // it("responds with status code 200 for GET requests to /", async () => {
    //     const response = await request(api).get("/");
    //     expect(response.statusCode).toBe(200);
    // });

    // it("responds with status code 200 for GET requests to /snacks/3", async () => {
    //     const response = await request(api).get("/snacks/3");
    //     expect(response.statusCode).toBe(200);
    // });

    // it("responds with status code 404 for GET requests to invalid URL", async () => {
    //     const response = await request(api).get("/invalid");
    //     expect(response.statusCode).toBe(404);
    // });

    // it("responds with status code 400 for POST requests to /snacks with invalid data", async () => {
    //     const response = await request(api)
    //         .post("/snacks")
    //         .send({
    //             name: "Grapes2",
    //             description: "Decadent if peeled",
    //             healthy: true,
    //             vegetarian: true,
    //         });
    //     expect(response.statusCode).toBe(400);
    // });
});
