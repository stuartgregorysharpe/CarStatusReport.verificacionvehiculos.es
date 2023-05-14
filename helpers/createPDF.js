const { CHROMIUM_PATH, ROOT_PATH } = require('../config')
const path = require('node:path')
const fs = require('node:fs/promises')
const puppeteer = require('puppeteer')

const createPDF = async (baseURL, reportId, filename) => {
  const browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH, args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'] })
  const page = await browser.newPage()
  const websiteUrl = new URL(`${reportId}.html`, `${baseURL}`).href
  const reportPath = path.join(ROOT_PATH, 'reportes', reportId, `${filename}.pdf`)

  await fs.rm(reportPath, { force: true })

  await page.goto(websiteUrl, { timeout: 0, waitUntil: 'networkidle0' })
  await page.emulateMediaType('screen')
  await page.pdf({
    timeout: 0,
    path: reportPath,
    margin: { top: '15px', right: '15px', bottom: '15px', left: '15px' },
    printBackground: true,
    format: 'A4'
  })
  await browser.close()
}

module.exports = createPDF
