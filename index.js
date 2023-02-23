const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))


app.listen(port, ["192.168.1.37", "localhost" ], () => {
  console.log(`Example app listening on port ${port}`)
})