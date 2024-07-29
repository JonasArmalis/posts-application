import httpClient from './HttpClient';
import type { Author } from "../interfaces/Author";

const END_POINT = '/authors'

const getAllAuthors = async (page: number, limit: number):  Promise<{data: Author[], totalAmount: number}> => {
  const response = await httpClient.get<Author[]>(END_POINT, {
    params: {
      _page: page,
      _limit: limit
    }
  });
  return {
    data: response.data,
    totalAmount: response.headers['x-total-count']
  }
};

const getAuthor = async (id: number): Promise<Author> => {
  const response = await httpClient.get<Author>(`${END_POINT}/${id}`);
  return response.data; 
};

export { getAllAuthors, getAuthor };

