import { useState, useEffect } from 'react'

const useHttpError = (axios) => {
  const { request, response } = axios.interceptors
  const [error, setError] = useState(null)
  const reqInterceptors = request.use(req => {
    setError(null)
    return req
  })
  const resInterceptors = response.use(res => res, err => {
    setError(err)
  })

  useEffect(() => {
    return () => {
      request.eject(reqInterceptors);
      response.eject(resInterceptors);
    }
  }, [request, response, reqInterceptors, resInterceptors])

  const clearError = () => setError(null)

  return [error, clearError]
}

export default useHttpError