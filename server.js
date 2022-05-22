const express = require('express');

var cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const dataRouter = require('./src/routes/data_router')
const errorHandler = require('./src/controllers/errorController')
const AppError = require('./src/utils/appError')
const updateController = require('./src/controllers/updateController')

const app = express();



app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))


app.use(express.json());


const url = process.env.mongo_link;
const connection = mongoose.connect(process.env.mongo_link).then(
    async () => {
        console.log('connected to database')
        updateController()

    }
).catch(
    (error) => console.log(error)
)


app.use('/api/trading-room-v2/data', dataRouter)







app.all('*', (req, res, next) => {
    const err = new AppError(`Requested url ${req.originalUrl}`, 404)
    next(new AppError(`Requested url ${req.originalUrl}`, 404))
})


app.use(errorHandler)

let port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`listening: ${port}`)
})



