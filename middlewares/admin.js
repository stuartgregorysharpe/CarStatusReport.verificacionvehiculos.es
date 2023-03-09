const adminMiddelware = (req, res, next) => {
  if (res.locals.isAdmin) {
    return next()
  }
  res.redirect('/')
}

module.exports = adminMiddelware
