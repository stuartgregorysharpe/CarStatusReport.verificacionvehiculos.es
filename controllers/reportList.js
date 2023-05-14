const jwt = require('jsonwebtoken')
const { SALT } = require('../config')
const Reports = require('../models/Reports')

const reportListGet = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    const { _id, isAdmin } = jwt.decode(token, SALT)
    let findParams = {}

    if (!isAdmin) {
      findParams = {"author._id": _id}
    }

    const results = await Reports.find(findParams, '_id filename author date').exec()
  
    res.render('pages/reportList', { data: { results,  } })
  } catch (error) {
    next(error)
  }
}

module.exports = { reportListGet }
