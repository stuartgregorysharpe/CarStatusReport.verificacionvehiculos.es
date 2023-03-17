module.exports = {
  ROOT_PATH: __dirname,
  PORT: 3000,
  USERS_JSON_PATH: './usuarios.json',
  CHROMIUM_PATH: '/usr/bin/google-chrome-stable', // '/usr/bin/chromium-browser', // macos: /opt/homebrew/bin/chromium
  SALT: 'QOolyjHOm1h84VZjTnLdrynxZkU+qXP0YoZ/tRCxeSD+00td58WGRVuK1its5chmKT3rfqzbqvgnbBmVg2rmyLIOwhXVj75JnBM7ypaIodkgt+6rfhmKzbHrY+0wpscLcJBDYfkycGBmIJ9mBV/51rZSszE43SMK8EMv/bRyoOc=',
  EMAIL: process.env.APP_EMAIL,
  EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD,
  EMAIL_SERVICE: 'gmail',
  EMAIL_HOST: '',
  EMAIL_PORT: '',
  EMAIL_SECURE: false
}
