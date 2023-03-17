const { CHROMIUM_PATH, ROOT_PATH } = require('../config')
const path = require('node:path')
const puppeteer = require('puppeteer')

const createPDF = async (filename, folderPath, baseURL) => {
  const browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH, args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'] })
  const page = await browser.newPage()
  const websiteUrl = new URL(`${filename}.html`, `${baseURL}`).href

  await page.goto(websiteUrl, { timeout: 0, waitUntil: 'networkidle0' })
  await page.emulateMediaType('screen')
  await page.pdf({
    timeout: 0,
    path: path.join(ROOT_PATH, folderPath, `${filename}.pdf`),
    margin: { top: '15px', right: '15px', bottom: '15px', left: '15px' },
    printBackground: true,
    format: 'A4'
  })
  await browser.close()
}

module.exports = createPDF
