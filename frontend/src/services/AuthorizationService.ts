import httpClient from './HttpClient'

const END_POINT = '/login'

const login = async (email: String, password: String): Promise<> => {
  const response = await httpClient.post<>(END_POINT)
  return response.data
}

export { login }
