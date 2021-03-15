import { useState } from 'react'

export function useFetch<T>(asyncFn: (params: T) => any, params: T) {
    const [response, setResponse] = useState<any>(null);
    const callApi = () => {
        asyncFn(params).then((data: any) => {
            setResponse(data);
        })
    }
    const callItems: [any, () => void] = [response, callApi]
    return callItems
}
