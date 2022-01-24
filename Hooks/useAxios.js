import axios from 'axios'
import { useEffect, useState } from 'react'

const useAxios = (url, refresh) => {
  const [error, SetError] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url)
        console.log(result.data.ok)
        if (result.data.ok) {
          setData(result.data.data)
        } else {
          SetError(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [url, refresh])

  return { data, error }
}

export { useAxios }
