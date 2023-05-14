const { ROOT_PATH } = require('../config')
const path = require('node:path')
const sharp = require('sharp')

const createSmallImage = async (imagePath, outputPath) => {
  try {
    await sharp(imagePath).resize({ height: 150 }).toFile(outputPath)
  } catch (error) {
    throw error
  }
}

module.exports = createSmallImage