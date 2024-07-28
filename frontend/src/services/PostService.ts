import httpClient from './HttpClient'
import type { Post } from '../interfaces/Post'

const END_POINT = '/posts'

const getAllPosts = async (page: number, limit: number): Promise<{data: Post[], totalAmount: number}> => {
  const response = await httpClient.get<Post[]>(END_POINT, {
    params: {
      _expand: 'author',
      _page: page,
      _limit: limit
    }
  })

  return {
    data: response.data,
    totalAmount: response.headers['x-total-count']
  }
}

const getPost = async (id: Number): Promise<Post> => {
  const response = await httpClient.get<Post>(`${END_POINT}/${id}`, {
    params: {
      _expand: 'author'
    }
  })
  return response.data
}

export { getAllPosts, getPost }