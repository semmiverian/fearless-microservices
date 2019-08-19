const express = require('express')
const app = express()
const mongoose = require('mongoose')
const StudentRoute = require('./route/student')

mongoose.connect('mongodb+srv://testing:muQmXvlzTs55ffaC@cluster0-cetlf.gcp.mongodb.net/fearless-fox?retryWrites=true&w=majority', {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost/fearless-fox', { useNewUrlParser: true})

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use('/students', StudentRoute)

app.listen(3001, () => {
  console.log('App listening on port 3000!');
});