const { EMAIL, ROOT_PATH } = require('../config')
const path = require('node:path')

const nodemailerTransporter = require('../helpers/nodemailerTransporter')

const mailPost = (req, res, next) => {
  const mailDetails = {
    from: EMAIL,
    to: req.body.mail,
    subject: req.body.asunto,
    text: req.body.cuerpo,
    attachments: [
      {
        filename: 'reporte.pdf',
        path: path.join(ROOT_PATH, `/reportes/${req.body.filename}.pdf`)
      }
    ]

  }

  nodemailerTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      next(err)
    } else {
      console.log('Email sent successfully')
      res.redirect('/')
    }
  })
}

module.exports = { mailPost }
