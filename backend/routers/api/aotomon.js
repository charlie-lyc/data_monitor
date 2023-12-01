const express = require('express')
const asyncHandler = require('express-async-handler')
const axios = require('axios')
const moment = require('moment')
// const fs = require('fs')
// const json2csv = require('json2csv').parse


const router = express.Router()

router.get('/', asyncHandler(async(req, res) => {
    // console.log(process.env.TEST_RND_URL)
    const response = await axios.post(
        process.env.TEST_RND_URL, 
        {},
        { 
            headers: {
                'apikey-plant-1' : 'Y!Ptm6yXhecvu5jA=ZsSMW-MQeWNWq3L3qxgMe4qSCU4DT6mtGLX?rSdDkCV7m@D$74?K%gz&NJHgZg@d&X5--XYBcxyX3c?JrZP9w2mQEF_wNTMArnvzttyN*3w%A5L'
            }
        }
    )
    const data = response.data
    // console.log(data.length)
    const reversed = data.reverse()
    res.status(200).json(reversed)
}))

router.get('/date', asyncHandler(async(req, res) => {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    // console.log(fromDate, toDate)
    let response
    if (!fromDate || !toDate) {
        response = await axios.post(
            process.env.TEST_RND_URL, 
            { fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') },
            { 
                headers: {
                    'apikey-plant-1' : 'Y!Ptm6yXhecvu5jA=ZsSMW-MQeWNWq3L3qxgMe4qSCU4DT6mtGLX?rSdDkCV7m@D$74?K%gz&NJHgZg@d&X5--XYBcxyX3c?JrZP9w2mQEF_wNTMArnvzttyN*3w%A5L'
                }
            }
        )
    } else {
        response = await axios.post(
            process.env.TEST_RND_URL, 
            { fromDate, toDate },
            { 
                headers: {
                    'apikey-plant-1' : 'Y!Ptm6yXhecvu5jA=ZsSMW-MQeWNWq3L3qxgMe4qSCU4DT6mtGLX?rSdDkCV7m@D$74?K%gz&NJHgZg@d&X5--XYBcxyX3c?JrZP9w2mQEF_wNTMArnvzttyN*3w%A5L'
                }
            }
        )
    }
    const data = response.data
    // console.log(data.length)
    const reversed = data.reverse()
    res.status(200).json(reversed)
}))

// router.get('/download', asyncHandler(async(req, res) => {
//     const response = await axios.post(
//         process.env.TEST_RND_URL, 
//         {},
//         { 
//             headers: {
//                 'apikey-plant-1' : 'Y!Ptm6yXhecvu5jA=ZsSMW-MQeWNWq3L3qxgMe4qSCU4DT6mtGLX?rSdDkCV7m@D$74?K%gz&NJHgZg@d&X5--XYBcxyX3c?JrZP9w2mQEF_wNTMArnvzttyN*3w%A5L'
//             }
//         }
//     )
//     const data = response.data
//     // console.log(data.length)
//     const reversed = data.reverse()
//     const filePath = 'aotomon_raw_data'
//     const csvData = json2csv(reversed)
//     fs.writeFileSync(filePath, csvData, 'utf-8')
//     res.download(filePath, 'aotomon_raw_data.csv', (err) => {
//         if (err) {
//             console.error('Error downloading file:', err)
//             res.status(500).send('Error downloading file')
//         } else {
//             console.log('CSV file downloaded successfully')
//         }      
//         // Optionally, you can delete the file after sending it
//         fs.unlinkSync(filePath)
//     })
// }))

// router.get('/download/date', asyncHandler(async(req, res) => {
//     const fromDate = req.query.fromDate
//     const toDate = req.query.toDate
//     console.log(fromDate, toDate)
//     const response = await axios.post(
//         process.env.TEST_RND_URL, 
//         { fromDate, toDate },
//         { 
//             headers: {
//                 'apikey-plant-1' : 'Y!Ptm6yXhecvu5jA=ZsSMW-MQeWNWq3L3qxgMe4qSCU4DT6mtGLX?rSdDkCV7m@D$74?K%gz&NJHgZg@d&X5--XYBcxyX3c?JrZP9w2mQEF_wNTMArnvzttyN*3w%A5L'
//             }
//         }
//     )
//     const data = response.data
//     // console.log(data.length)
//     const reversed = data.reverse()
//     const filePath = `aotomon_raw_data_${fromDate}_${toDate}`
//     const csvData = json2csv(reversed)
//     fs.writeFileSync(filePath, csvData, 'utf-8')
//     res.download(filePath, `aotomon_raw_data_${fromDate}_${toDate}.csv`, (err) => {
//         if (err) {
//             console.error('Error downloading file:', err)
//             res.status(500).send('Error downloading file')
//         } else {
//             console.log('CSV file downloaded successfully')
//         }      
//         // Optionally, you can delete the file after sending it
//         fs.unlinkSync(filePath)
//     })
// }))

module.exports = router