import { useState, useEffect } from 'react'
import axios from 'axios'
import papa from 'papaparse'
import mockData from './mockData/simpleData.json'


let apiUrl
if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:3001/api/aotomon`
} else {
    apiUrl = `/api/aotomon`
}

const App = () => {
    const [jsonData, setJsonData] = useState(null)
    
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setJsonData(() => (mockData))
        } else {
            axios.get(apiUrl)
                .then((res) => setJsonData(() => [...res.data]))
                .catch((err) => console.log('Error fetching data:', err))
        } 
    }, [])

    const convertToCsv = () => {
        const csv = papa.unparse(jsonData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'aotomon_raw_data.csv')
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

    return (
        <div className='flex items-start justify-center p-24 space-x-6'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={convertToCsv}
            >Full Download</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <a href='/monitor'>Search & Download</a>
            </button>
        </div>
    )
}

export default App
