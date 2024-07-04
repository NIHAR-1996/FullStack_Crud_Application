const express = require('express');
const router = express.Router();
const {
    getUser,createNewUser,updateUser,deleteUser
} = require('../controller/user')

router
.route('/')
.get( getUser)
.post(createNewUser)


router.route('/:id')
.patch(updateUser)
.delete(deleteUser)



module.exports = router;