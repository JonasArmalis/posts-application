import httpClient from './HttpClient'
import type { Author } from '../interfaces/Author'
import { useAuthStore } from '@/stores/authStore'
import { formatISO } from 'date-fns'

const END_POINT = '/authors'

const getAllAuthors = async (
  page: number,
  limit: number,
  searchValue: String
): Promise<{ data: Author[]; totalAmount: number }> => {
  const response = await httpClient.get<Author[]>(END_POINT, {
    params: {
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

const getAuthor = async (id: number): Promise<Author> => {
  const response = await httpClient.get<Author>(`${END_POINT}/${id}`)
  return response.data
}

const editAuthor = async (name: string, surname: string, id: number): Promise<Author> => {
  const response = await httpClient.patch<Author>(`${END_POINT}/${id}`, {
    name: name,
    surname: surname,
    updated_at: formatISO(Date.now())
  })
  return response.data
}

const createAuthor = async (name: string, surname: string): Promise<Author> => {
  const authStore = useAuthStore()

  const response = await httpClient.post<Author>(
    END_POINT,
    {
      userId: authStore.userId,
      name: name,
      surname: surname,
      created_at: formatISO(Date.now()),
      updated_at: formatISO(Date.now())
    },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )

  return response.data
}

export { getAllAuthors, getAuthor, createAuthor, editAuthor }
