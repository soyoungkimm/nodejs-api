const express = require('express');
const { getUser, getUserAll, createUser, editUser, deleteUser} = require('../controllers/user');

const router = express.Router();

router.get('/', getUserAll); // read all
router.post('/', createUser); // create
router.get('/:id', getUser); // read one
router.put('/:id', editUser); // update
router.delete('/:id', deleteUser); // delete

module.exports = router;