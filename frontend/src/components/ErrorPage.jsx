import { useRouteError } from "react-router-dom"


const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <div id="error-page" className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-5">Oops!</h1>
                <p className="text-gray-600 mb-5">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}

export default ErrorPage