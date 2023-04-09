import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
       const timeoutId =  setTimeout(() => setDebounceValue(value), delay)

       return () => clearTimeout(timeoutId)
    }, [value])

    return debounceValue
}

export default useDebounce