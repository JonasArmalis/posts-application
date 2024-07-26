import httpClient from './HttpClient'
import type { Post } from '../interfaces/Post'

const END_POINT = '/posts'

const getAllPosts = async (): Promise<Post[]> => {
  const response = await httpClient.get<Post[]>(END_POINT + '?_expand=author')
  return response.data
}

const getPost = async (id: Number): Promise<Post> => {
  const response = await httpClient.get<Post>(`${END_POINT}/${id}?_expand=author`)
  return response.data
}

export { getAllPosts, getPost }
