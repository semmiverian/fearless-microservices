const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
 // nge hit api di localhost:30001
 // lalu dia akan nge return datanya

 const { data } = await axios.get('http://localhost:3001/students')
 res.json(data)
})


module.exports = router