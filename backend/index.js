require("dotenv").config();

const api = require("./api");

api.listen(process.env.PORT, () => {
    console.log(`APP listening on ${process.env.PORT}`);
});
