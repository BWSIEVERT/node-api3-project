const User = require('../users/userDb')
const Post = require('../posts/postDb')
//custom middleware

const logger = (req, res, next) => {
    console.log( req.method, req.url, req.timestamp )
    next()
}

const validateUserId = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.getById(id)
        if (!user) {
            res.status(404).json({
                message: `User with id of ${id} not found!`
            })
        } else {
            req.user = user
            next()
        }
    } catch (error) {
        res.status(400).json({
            message: 'Invalid User Id'
        })
    }
}

const validateUser = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({
            message: 'name is required!'
        })
    } else {
        next()  
    }
}

const validatePostId = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await Post.getById(id)
        if (!post) {
            res.status(404).json({
                message: `Post with id of ${id} not found!`
            })
        } else {
            req.post = post
            next()
        }
    } catch (error) {
        res.status(400).json({
            message: 'Invalid Post Id'
        })
    }
}

const validatePost = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            message: 'Missing post data!'
        })
    } else if (!req.body.text) {
        res.status(400).json({
            message: 'Missing required text field!'
        })
        next()
    }
}
module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}