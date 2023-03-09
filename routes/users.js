const router = require('express').Router()
const { usersPost, usersDelete, usersPut } = require('../controllers/users')

router.post('/', usersPost)
router.delete('/', usersDelete)
router.put('/', usersPut)

module.exports = router
