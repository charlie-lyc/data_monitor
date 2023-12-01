

const DataTable = ({data}) => {

    return (
        <table className='min-w-full bg-white border border-gray-300'>
            <thead className='sticky top-0 bg-gray-100 z-0'>
                <tr>
                    {
                        Object.keys(data[0]).slice(1).map((header, idx) => {
                            return <th className='py-2 px-4 border-b' key={idx}>{header}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((datum, idx) => {
                        return (
                            <tr key={idx}>
                                {
                                    Object.values(datum).slice(1).map((value, i) => {
                                        return <td className="py-2 px-4 border-b" key={i}>{value}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default DataTable