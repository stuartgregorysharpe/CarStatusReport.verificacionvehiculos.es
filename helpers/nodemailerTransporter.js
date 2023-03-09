const { EMAIL, EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } = require('../config')
const nodemailer = require('nodemailer')

let transporterOptions = {
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  }
}

if (EMAIL_SERVICE) {
  transporterOptions = {
    ...transporterOptions,
    service: EMAIL_SERVICE
  }
} else {
  transporterOptions = {
    ...transporterOptions,
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE
  }
}

const nodemailerTransporter = nodemailer.createTransport(transporterOptions)

module.exports = nodemailerTransporter
