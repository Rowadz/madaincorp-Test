const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const staticFiles = require('serve-static')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// log all api traffic to console
app.use('api/*', (req) => {
  console.log(req)
  next()
})

app.post('/api/login', function (req, res) {
  if (req.body && req.body.email && req.body.password) {
    const errCred = 'credentials are wrong, please try again later'
    if (req.body.email == '123@123.123') {
      if (req.body.password == '123123') {
        const user = {
          name: 'Alex Jones',
          email: req.body.email,
          password: req.body.password,
          profilePic: 'http://lorempixel.com/500/500/people/',
        }
        res.send(200, user)
      } else {
        res.send(400, { message: errCred })
      }
    } else {
      res.send(400, { message: errCred })
    }
  } else {
    res.send(422, { message: 'yo! you miss`n some stuff!' })
  }
})

const serve = staticFiles('public/', { index: ['index.html'] })
app.use(serve)

app.listen(3000)
console.log('running on http://localhost:3000')
