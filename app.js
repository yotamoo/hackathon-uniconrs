const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const ambassadors = ['yotam@gmail.com']
var trusted = ['lena@gmail.com']
var candidates = {}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/verify', (req, res) => {
  // 1. verify sender is not imporsonated, use public key
  // 2. verify sender is `ambassadors` or `verified`
  const sender = req.body.sender
  const isSenderValid = ambassadors.includes(sender) || trusted.includes(sender)

  if (!isSenderValid) {
    console.log('Sender is not trusted')
    res.status(405)
    res.send('Sender is not trusted')
    return
  }

  // 3. send candidate a verification email
  const candidate = req.body.candidate
  candidates.push(candidate)
  
  // 4. 
  res.status(200)
  res.send('Waiting for candidate\'s approval')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})