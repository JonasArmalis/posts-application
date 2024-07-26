import httpClient from './HttpClient'
import type { Post } from '../interfaces/Post'

const END_POINT = '/posts'

const getAllPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<Post[]>(END_POINT + '?_expand=author')
  return response.data
}

const getPost = async (id: number): Promise<Post> => {
  const response = await httpClient.get<Post>(`${END_POINT}/${id}`)
  return response.data
}

export { getAllPosts, getPost }
