const Post = require('../../models/Post');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult  } = require('express-validator');

const postsController = {
  test: (req, res) => {
    res.status(200).send("welcome to Posts controller");
  },
  create: async (req, res) => {
    try {
      const {
        text
      } = req.body;
      const user = await User.findById(req.userId).select('-password');
      console.log(user);
      const newPost = new Post({
        text: text,
        name: user.name,
        user: req.userId
      });
      const post = await newPost.save();

      res.status(200).send({
        message: "Created Post",
        post
      });

    } catch (error) {
      console.log(error);
      res.status(400).send({message: "Server Error"});
    }
  },
  fetchPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({date: -1});
      res.status(200).send({
        message: 'fetched posts',
        data: posts
      })
    } catch (error) {
      res.status(400).send({message: "Server Error"});
      
    }
  },
  likePost: async(req, res) => {
    try {
      const { reactionType } = req.body;
      const post = await Post.findById(req.params.id);

      if(!post){
        return res.status(400).send({ message: 'Post not found'});
      }
      const likedByUser = post.likes.filter((like) => like.user.toString() == req.userId);
      
      // unlike the post
      if(likedByUser.length > 0){
        const index = post.likes.findIndex((val) => val.user == req.userId);
        post.likes.splice(index, 1);
      }
      else{
        post.likes.unshift({ user: req.userId, reactionType: reactionType || 'like' });
      }

      // like the post
      await post.save();
      return res.status(200).send({ message: 'Liked/Unliked the post', data: post.likes});

    } catch (error) {
      return res.status(500).send({ message: 'Server Error'});      
    }
  },
  addComment: async(req, res) => {
    try {
      const {
        comment 
      } = req.body;
      const user = await User.findById(req.userId).select('-password');
      const post = await Post.findById(req.params.id);
      if(!post){
        return res.status(400).send({ "message": "Post not found"});
      }
      const newComment = {
        text: comment,
        user: req.userId,
        name: user.name,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.status(200).send({
        message: 'Added Comment',
        data: post.comments
      })
    } catch (error) {
      return res.status(500).send({ "message": "Server Error"}); 
    }
  },
  deleteComment: async(req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if(!post){
        return res.status(400).send({ "message": "Post not found"});
      }
      const comment = post.comments.find((comment) => comment.id == req.params.commentId);
      if(!comment){
        return res.status(400).send({ "message": "comment not found"});
      }
      if(comment.user.toString() !== req.userId){
        return res.status(401).send({ "message": "User not authorised"});
      }
      
      const index = post.comments.findIndex((val) => val._id.toString() == req.params.commentId);
      post.comments.splice(index, 1);
      await post.save();
      res.status(200).send({
        message: 'deleted Comment',
        data: post.comments
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ "message": "Server Error"});       
    }


  }


}

module.exports = postsController;



