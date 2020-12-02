const express = require('express');

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const morgan = require('morgan')
const helmet = require('helmet')
const middleware = require('./middleware/middleware')
const server = express();

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(middleware.logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;