const express = require('express')
const app = express()
const port = 3000

const ambassadors = ['ohayon.yotam@gmail.com']

app.post('/verify', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})