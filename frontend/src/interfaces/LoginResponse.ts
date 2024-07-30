export interface LoginResponse {
  accessToken: string,
  user: {
    email: string
    name: string
    id: number
  }
}
