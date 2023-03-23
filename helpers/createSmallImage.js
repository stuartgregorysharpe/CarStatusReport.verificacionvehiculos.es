const { ROOT_PATH } = require('../config')
const path = require('node:path')
const sharp = require('sharp')

const createSmallImage = async (imagePath, filename) => {
  try {
    const smallImagePath = path.join(ROOT_PATH, `/archivos/small-${filename}`)
    await sharp(imagePath).resize({ height: 150 }).toFile(smallImagePath)
  } catch (error) {
    throw error
  }
}

module.exports = createSmallImage