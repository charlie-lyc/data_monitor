import { useState, useEffect } from 'react'
import axios from 'axios'
import papa from 'papaparse'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DataTable from './DataTable'
import mockData from '../mockData/simpleData.json'


let apiUrl
if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:3001/api/aotomon`
} else {
    apiUrl = `/api/aotomon`
}

const MonitorPage = () => {
    const [jsonData, setJsonData] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setJsonData(() => (mockData))
        } else {
            axios.get(apiUrl + `/date`)
                .then((res) => setJsonData(() => [...res.data]))
                .catch((err) => console.log('Error fetching data:', err))
        }
    }, [])

    const fromDate = moment(startDate).format('YYYY-MM-DD')
    const toDate = moment(endDate).format('YYYY-MM-DD')

    const searchByDate = async () => {
        if (!startDate) {
            alert('Select a start date')
            return
        }
        if (!endDate) {
            alert('Select a end date')
            return
        }
        if (process.env.NODE_ENV === 'development') {
            const filtered = mockData.filter((data) => {
                return moment(data.time).format('YYYY-MM-DD') >= fromDate 
                    && moment(data.time).format('YYYY-MM-DD') <= toDate
            })
            setJsonData(() => [...filtered])
        } else {
            try {
                const res = await axios.get(apiUrl +`/date?fromDate=${fromDate}&toDate=${toDate}`)
                setJsonData(() => [...res.data])
            } catch (err) {
                console.log('Error fetching data:', err)
            }
        }
        setCurrentPage(1)
    }

    const convertToCsv = () => {
        if (!startDate) {
            alert('Select a start date')
            return
        }
        if (!endDate) {
            alert('Select a end date')
            return
        }
        const csv = papa.unparse(jsonData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', `aotomon_raw_data_${fromDate}_${toDate}.csv`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            alert('Your browser does not support the download attribute.')
        }
    }

    if (!jsonData) {
        return (
            <div className='flex min-h-screen flex-row items-start justify-center p-24'>
                <div>Loading data...</div>
            </div>
        ) 
    }

    const itemsPerPage = 100
    const totalPages = Math.ceil(jsonData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = jsonData.slice(startIndex, endIndex)
    const previousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }
    const renderPageNumbers = () => {
        const pagesToShow = 10
        const halfRange = Math.floor(pagesToShow / 2)
        let startPage = Math.max(1, currentPage - halfRange)
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1)
        if (endPage - startPage < pagesToShow - 1) {
            startPage = Math.max(1, endPage - pagesToShow + 1)
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index) 
    }
   
    return (
        <>
            <div className='flex justify-center p-24 space-x-6'>
                <DatePicker placeholderText='Select start date' dateFormat='yyyy-MM-dd' 
                    selected={startDate} onChange={(date) => setStartDate(date)}  
                    className='border p-2 rounded-md z-1'
                />
                <DatePicker placeholderText='Select end date' dateFormat='yyyy-MM-dd'
                    selected={endDate} onChange={(date) => setEndDate(date)} 
                    className='border p-2 rounded-md z-1'
                />
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={searchByDate}
                >&nbsp;&nbsp;Search&nbsp;&nbsp;
                </button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={convertToCsv}
                >Download</button>
            </div>
            <div className='w-full'>
                {/* <DataTable data={jsonData}/> */}
                <DataTable data={currentPageData}/>
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <button onClick={previousPage}
                    className={`mx-1 px-3 py-1 border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-yellow-100' : 'hover:bg-yellow-300'}`}
                    disabled={currentPage === 1}
                >Prev</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {
                    renderPageNumbers().map((page) => (
                        <button key={page} onClick={() => setCurrentPage(page)}
                            className={`mx-1 px-3 py-1 border ${currentPage === page ? 'bg-yellow-600 text-white' : 'hover:bg-yellow-300'}`}
                        >{page}</button>
                    ))
                }
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={nextPage}
                    className={`mx-1 px-3 py-1 border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-yellow-100' : 'hover:bg-yellow-300'}`}
                    disabled={currentPage === totalPages}
                >Next</button>
            </div>
        </>
    )
}

export default MonitorPage