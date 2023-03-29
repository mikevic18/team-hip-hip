const express = require('express');
const cors = require('cors');
const indexRouter = require('./routers/index');
const complaintRouter = require('./routers/complaints');
const userRouter = require('./routers/user');
const postsRouter = require('./routers/posts');
// const informationRouter = require('./routers/information');
// const listingRouter = require('./routers/listing');
// const skillRouter = require('./routers/skills');



const api = express();

api.use(cors());
api.use(express.json());
api.use('/', indexRouter);
api.use('/posts', postsRouter);
api.use('/complaints', complaintRouter);
api.use('/users', userRouter);
module.exports = api;

