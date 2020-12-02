const express = require('express');
const middleware = require('../middleware/middleware');
const Post = require('./postDb')

const router = express.Router();

router.get('/', async (req, res) => {
  // do your magic!
  try{
    const post = await Post.get()
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(500).json({
        message: 'Posts get request failed'
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

router.get('/:id', middleware.validatePostId, async (req, res) => {
  // do your magic!
  const { id } = req.params
  const post = await Post.getById(id)
  res.status(200).json(post)
});

router.delete('/:id', middleware.validatePostId, (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `User with name of ${req.body.name} had their post with id of ${req.params.id} deleted!`
        })
      } else {
        res.status(404).json({
          message: 'The post could not be found'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error in removing the post'
      })
    })
});

router.put('/:id', middleware.validatePost, (req, res) => {
  // do your magic!
  Post.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: `Post with id of ${req.params.id} could not be found`
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error updating the post'
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
