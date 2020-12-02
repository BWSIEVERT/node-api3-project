const express = require('express');
const Post = require('../posts/postDb')

const User = require('./userDb')
const middleware = require('../middleware/middleware')

const router = express.Router();

router.post('/', middleware.validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        message: 'This user already exists'
      })
    })
});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
  // do your magic!
  const postInfo = {
    ...req.body,
    user_id: req.params.id
  }
  Post.insert(postInfo)
    .then(post => {
      res.status(210).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: `Could not create post for user ${req.params.id}`
      })
    })
});

router.get('/', async (req, res) => {
  // do your magic!  
  try{
    const users = await User.get()
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(500).json({
        message: 'Users get request failed'
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

router.get('/:id', middleware.validateUserId, async (req, res) => {
  // do your magic!
  const { id } = req.params
  const user = await User.getById(id)
  res.status(200).json(user)
});

router.get('/:id/posts', async (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: `Error getting the posts for the user with id of ${req.params.id}`
      })
    })
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `User with id of ${req.params.id} has been deleted!`
        })
      } else {
        res.status(4040).json({
          message: `User with id of ${req.params.id} could not be found!`
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error removing the user'
      })
    })
});

router.put('/:id', middleware.validateUserId, (req, res) => {
  // do your magic!
  User.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: `The user with the id of ${req.params.id} could not be found!`
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error updating the user'
      })
    })
});

module.exports = router;
