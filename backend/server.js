require('dotenv').config()
require('colors')
const express = require('express')
const logger = require('morgan')
const path = require('path') 
const cors = require('cors')

const { notFoundHandler, errorHandler } = require('./middlewares')

const app = express()

/* Logger */
app.use(logger('dev'))
/* CORS */
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
}

/* Health Check */
app.get('/api', (res, req) => res.status(200).send('Welcome'))

/* BE */
app.use('/api/aotomon', require('./routers/api/aotomon'))

/* FE */
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

/* Error Handle */
app.use(notFoundHandler)
app.use(errorHandler)

/* Run Server*/
const port = process.env.PORT
app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Server is running on port ${port}.`.green)
    }
}) 