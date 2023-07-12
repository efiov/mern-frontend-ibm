const express = require('express')

require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 3000
// create express instance
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`)
})
