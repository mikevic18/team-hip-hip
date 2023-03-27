const express = require('express');
const cors = require('cors');
// const indexRouter = require('./routers/index');
// const complaintRouter = require('./routers/complaints');
// const userRouter = require('./routers/user');
// const informationRouter = require('./routers/information');
// const listingRouter = require('./routers/listing');
// const skillRouter = require('./routers/skills');


const app = express();

app.use(cors());
app.use(express.json());
// app.use('/', indexRouter);
// app.use('/diary', diaryRouter);
// app.use('/users', userRouter);
module.exports = app;