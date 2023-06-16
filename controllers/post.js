const { Post } = require('../models');

exports.createPost = async (req, res, next) => {
    const { title, content, userId } = req.body;
    try {
      await Post.create({
        title: title,
        content: content,
        UserId: userId
      });
      res.status(200).json({
        message: "save success"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };
  
  
  exports.getPost = async (req, res, next) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id }
      });
      res.status(200).json({
        payload: post
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };
  
  exports.getPostAll = async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json({
        payload: posts
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };



  exports.editPost = async (req, res, next) => {
    const { title, content } = req.body;
    try {
      const post = await Post.findOne({
        where: { id: req.params.id }
      });
      post.update({
        title: title,
        content: content
      });
      res.status(200).json({
        message: "post edit success" 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };

  exports.deletePost = async (req, res, next) => {
    try {
      await Post.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({
        message: "post delete success" 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };