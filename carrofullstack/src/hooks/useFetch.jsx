import { useEffect, useState } from "react"
import axios from "axios"
export function useFetch() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products")
                setData(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, loading }
}