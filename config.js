module.exports = {
  ROOT_PATH: __dirname,
  PORT: 3000,
  USERS_JSON_PATH: './usuarios.json',
  CHROMIUM_PATH: '/opt/homebrew/bin/chromium',
  SALT: process.env.APP_SALT,
  EMAIL: process.env.APP_EMAIL,
  EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD,
  EMAIL_SERVICE: 'gmail',
  EMAIL_HOST: '',
  EMAIL_PORT: '',
  EMAIL_SECURE: false
}
