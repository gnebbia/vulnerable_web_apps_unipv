const express = require('express')
const cookieParser = require('cookie-parser')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))



const USERS = { alice: 'password123', bob: '50505', mafalda: 'picard', peppino: 'sarchiapone' }
const CREDITS = { alice: 500, bob: 200, mafalda: 2000, peppino: 50}


// GET /
app.get('/', (req, res) => {
    const username = req.cookies.username
    if (username) {
        res.send(`Hi ${username}. Your balance is $${CREDITS[username]}.`)
    } else {
        createReadStream('index.html').pipe(res)
    }
})

// POST /
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = USERS[username]
    if (password === req.body.password) {
        res.cookie('username', username)
        res.redirect('/')
    } else {
        createReadStream('failed_login.html').pipe(res)
    }
})


app.listen(4000)
