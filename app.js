const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const ambassadors = ['yotam@gmail.com']
var trusted = { 'lena@gmail.com': 1 }
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

  // 3. send candidate a verification email, use a uuid to make sure the right link is tapped
  const candidate = req.body.candidate
  if (candidate in trusted) {
    trusted[candidate] = trusted[candidate] + 1
    res.status(200)
    res.send(`increased person's points to ${trusted[candidate]}`)
  } else {
    const uuid = '1123-3453-2342-4564-2341'
    candidates[candidate] = { uuid, points: 5 }
    // send email
    res.status(200)
    res.send(`Waiting for candidate\'s approval ${uuid}`)
  }

})

app.post('/join', (req, res) => {
  const sender = req.body.sender
  const uuid = req.body.uuid
  const isSenderValid = candidates[sender].uuid == uuid

  if (!isSenderValid) {
    console.log('Sender is not a valid candidate')
    res.status(405)
    res.send('Sender is not a valid candidate')
    return
  }

  trusted[sender] = candidates[sender].points
  delete candidates[sender]
  res.status(200)
  res.send('Candidate added')
})

app.get('/network', (req, res) => {
  res.send(trusted)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})