api.use(cors());
api.use(express.json());
api.use('/', indexRouter);
api.use('/post', postsRouter);
api.use('/complaints', complaintRouter);
api.use('/users', userRouter);
api.use('/posts', postsRouter);
module.exports = api;