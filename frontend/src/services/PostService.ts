import httpClient from './HttpClient'
import type { Post } from '../interfaces/Post'
import { format } from 'date-fns'
import { useAuthStore } from '@/stores/authStore'

const END_POINT = '/posts'

const getAllPosts = async (page: number, limit: number, searchValue: String): Promise<{data: Post[], totalAmount: number}> => {
  const response = await httpClient.get<Post[]>(END_POINT, {
    params: {
      _expand: 'author',
      _page: page,
      _limit: limit,
      q: searchValue
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

const createPost = async (title: string, content: string, authorId: number): Promise<Post> => {
  const authStore = useAuthStore()
  const response = await httpClient.post<Post>(
    END_POINT,
    {
      title: title,
      body: content,
      userId: authStore.userId,
      authorId: authorId,
      created_at: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      updated_at: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )
  return response.data
}

export { getAllPosts, getPost, createPost }