require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const controller = require('./controllers/controller')
const auth = require('./controllers/auth')


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
app.use(express.json())

app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}`)
    })

})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)

// Dashboard will retrieve all students and map them
app.get('/students', controller.requestAllStudents)

// student/:id be an endpoint for posting and viewing data on a specific student
app.get('/student/:id', controller.requestStudent)
app.post('/student/new', controller.addStudent)
app.put('/editor/:id', controller.saveChanges)
app.delete('/editor/:id', controller.deleteStudent)

app.get('/log/:id/view/:date', controller.requestLogs)
app.post('/log/:id', controller.submitLog)

app.get('/times', controller.requestTimes)

// settings will also retrieve all students and map them, but it will open up an editor
app.get('/settings')


