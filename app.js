const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const router = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', router)

app.listen(port, () => console.log(`Connecting on port ${port} !!.. `))