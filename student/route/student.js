const express = require('express')
const Student = require('./../models/Student')
const router = express.Router()
const redis = require('redis')
const client = redis.createClient()

router.get('/', async (req, res) => {
  // nge check ada ga sih data di cache nya
  client.get('students', async (err, reply) => {
    console.log(err, reply)
    if (reply) {
      // balikin datanya
      res.status(200).json(JSON.parse(reply))
    } else {
      // nge hit database
      console.log('masuk ke sini')
      const students = await Student.find()

      client.set('students', JSON.stringify(students), 'EX', 60 * 60, (err, reply) => {
        console.log('ini student nya udah kebuat di database cache')
      })

      res.status(200).json(students)
    }
  })

  // Kalau ada kita ga nge hit database, tapi nge balikin
  // data yang ada di cache nya

  // Kalau ga ada nge hit database nya

 
})


router.post('/', async (req, res) => {
  const student = await Student.create({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender
  })
  // invalidate {} => nge hapus data di redis
  client.del('students')
  // Tumpuk { name: Ibe} => { name: Ibe, name: Irsan}

  res.status(201).json(student)
})

module.exports = router