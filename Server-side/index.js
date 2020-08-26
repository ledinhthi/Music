const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.listen(port, () => {
    console.log(`listening from Port`)
})
app.use(bodyParser.json())
// use Router from other file
app.use(require("./firebase/index"))

