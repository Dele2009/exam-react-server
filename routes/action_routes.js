const express = require('express')
const {
    getAllUsers,
    deleteUser,
    disableUser
} = require('../controllers/action')



const router = express.Router()

router.get('/getusers', getAllUsers)

router.delete('/deleteuser/:id', deleteUser);

router.put('/setUserstatus/:id', disableUser);

module.exports = router