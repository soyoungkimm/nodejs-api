const express = require('express');
const { getPostAll, getPost, createPost, editPost, deletePost} = require('../controllers/post');

const router = express.Router();

router.get('/', getPostAll); // read all
router.post('/', createPost); // create
router.get('/:id', getPost); // read one
router.put('/:id', editPost); // update
router.delete('/:id', deletePost); // delete

module.exports = router;