const crypto = require('crypto')

const hashPassword = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString('base64'))
    })
  })
}

module.exports = hashPassword
