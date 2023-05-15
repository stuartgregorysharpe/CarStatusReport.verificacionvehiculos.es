const { ROOT_PATH, SALT } = require("../config")
const path = require("node:path")
const fs = require("fs").promises
const ejs = require("ejs")
const createPDF = require("../helpers/createPDF")
const deletePDF = require("../helpers/deletePDF")
const renamePDF = require("../helpers/renamePDF")
const createSmallImage = require("../helpers/createSmallImage")
const Reports = require("../models/Reports")
const jwt = require("jsonwebtoken")

const reportPost = (req, res, next) => {
  const reportId = req.reportId
  const baseURL = req.protocol + "://" + req.get("host")
  const temporalHTMLFilePath = path.join(ROOT_PATH, `/public/${reportId}.html`)

  const data = { ...req.body, files: { ...req.files }, reportId }

  Object.keys(data.files).forEach((key) => {
    const file = data.files[key]
    ;(async (file) => {
      try {
        const fileType = file.mimetype.split("/")[0]
        if (fileType === "image") {
          const smallImagePath = path.join(
            ROOT_PATH,
            "reportes",
            reportId,
            `/small-${file.filename}`
          )
          await createSmallImage(file.path, smallImagePath)
        }
      } catch (error) {
        next(error)
      }
    })(file)
  })

  ejs.renderFile(
    "views/pages/report.ejs",
    { data },
    {},
    function (error, html) {
      ;(async (error, html) => {
        try {
          if (error) throw error
          await fs.writeFile(temporalHTMLFilePath, html)
          await createPDF(baseURL, reportId, 'reporte')
          await fs.unlink(temporalHTMLFilePath)
          const { _id, username } = jwt.verify(req.cookies.jwt, SALT)
          await Reports.create({
            _id: reportId,
            filename: "reporte",
            data: JSON.stringify(data),
            author: { _id, username },
            date: Date.now(),
          })

          res.render("pages/download", { data: { reportId } })
        } catch (error) {
          next(error)
        }
      })(error, html)
    }
  )
}

const reportDelete = async (req, res, next) => {
  try {
    const { isAdmin, _id: userId } = await jwt.decode(req.cookies.jwt, SALT)
    const reportId = req.body._id
    const report = await Reports.findById(reportId, "author._id")

    if (isAdmin || report.author._id.toString() === userId) {
      await deletePDF(reportId)
    }

    res.redirect("/lista-reportes")
  } catch (error) {
    next(error)
  }
}

const reportPutRename = async (req, res, next) => {
  try {
    const { isAdmin, _id: userId } = await jwt.decode(req.cookies.jwt, SALT)
    const reportId = req.body._id
    const newFilename = req.body.filename
    const report = await Reports.findById(reportId, "author._id")

    if (isAdmin || report.author._id.toString() === userId) {
      await renamePDF(reportId, newFilename)
    }

    res.redirect("/lista-reportes")
  } catch (error) {
    next(error)
  }
}

const reportPostEdit = async (req, res, next) => {
  const { isAdmin, _id: userId } = await jwt.decode(req.cookies.jwt, SALT)
  const reportId = req.body._id

  const report = await Reports.findById(reportId, "data filename author._id")

  if (isAdmin || report.author._id.toString() === userId) {
    res.render("pages/index", {
      data: {
        editMode: true,
        filename: report.filename,
        reportId,
        fields: JSON.parse(report.data),
      },
    })
    return
  }
  res.redirect("/lista-reportes")
}

const reportPutEdit = async (req, res, next) => {
  const { isAdmin } = await jwt.decode(req.cookies.jwt, SALT)
  const reportId = req.body._id
  const report = await Reports.findById(reportId, "data filename author._id")

  
  if (isAdmin) {
    const mergedData = Object.assign(JSON.parse(report.data), req.body)

    const baseURL = req.protocol + "://" + req.get("host")
    const temporalHTMLFilePath = path.join(ROOT_PATH, `/public/${reportId}.html`)
    
    ejs.renderFile(
      "views/pages/report.ejs",
      { data: mergedData },
      {},
      function (error, html) {
        ;(async (error, html) => {
          try {
            if (error) throw error
            await fs.writeFile(temporalHTMLFilePath, html)
            await createPDF(baseURL, reportId, report.filename)
            await fs.rm(temporalHTMLFilePath, { force: true })

            await Reports.findByIdAndUpdate(reportId, {data: JSON.stringify(mergedData)})
  
            res.redirect("/lista-reportes")
          } catch (error) {
            next(error)
          }
        })(error, html)
      }
    )

  }
}
module.exports = {
  reportPost,
  reportDelete,
  reportPutRename,
  reportPostEdit,
  reportPutEdit,
}
