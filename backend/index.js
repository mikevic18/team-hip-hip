require("dotenv").config();

const app = require("./app");

app.listen(process.env.PORT, () => {
    console.log(`APP listening on ${process.env.PORT}`);
});
