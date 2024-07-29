import type { LoginResponse } from '@/interfaces/LoginResponse'
import httpClient from './HttpClient'
import { AxiosError } from 'axios';

const END_POINT = '/login'

const requestLogin = async (
  email: string,
  password: string
): Promise<{ token: string; username: string }> => {
  try {
    const response = await httpClient.post<LoginResponse>(END_POINT, {
      email: email,
      password: password
    })
    return {
      token: response.data.accessToken,
      username: response.data.user.name
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 400) {
        throw new Error('Invalid Credentials')
      }
    }
    throw new Error(
      error instanceof Error ? error.message : 'An error occurred. Please try again later.'
    )
  }
}

export { requestLogin }
