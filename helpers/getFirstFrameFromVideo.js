const { ROOT_PATH } = require('../config')
const path = require('node:path')
const ffmpeg = require('ffmpeg')


const getFirstFrameFromVideo = (videoPath, filename) => {
  return new Promise((resolve, reject) => {
    new ffmpeg(videoPath, (error, video) => {
      if (error) { return reject(error) }
      video.fnExtractFrameToJPG(path.join(ROOT_PATH, '/archivos'), {
        start_time: 0,
        number: 1,
        every_n_frames: 1,
        file_name: `poster-${filename}`
      }, (error, files) => {
        if (error) { return reject(error) }
        resolve(files)
      })
    })

  })
}

module.exports = getFirstFrameFromVideo