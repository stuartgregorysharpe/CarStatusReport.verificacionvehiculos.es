const router = require('express').Router()

const { mainGet } = require('../controllers/admin')
const adminMiddelware = require('../middlewares/admin')

router.get('/', adminMiddelware, mainGet)

module.exports = router
