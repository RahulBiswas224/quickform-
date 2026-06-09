require('dotenv').config()
require('./queues/emailWorker')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://quickform-dss2umirj-rbiswas224.vercel.app',
    'https://quickform.vercel.app'
  ]
}))
app.use(express.json())

app.use('/QuickForm/auth', require('./routes/auth'))
app.use('/QuickForm/forms', require('./routes/forms'))
app.use('/QuickForm/responses', require('./routes/responses'))

app.get('/', (req, res) => res.send('QuickForm API running'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))