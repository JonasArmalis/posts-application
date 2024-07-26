import httpClient from './HttpClient';
import type { Author } from "../interfaces/Author";

const END_POINT = '/authors'

const getAllAuthors = async (): Promise<Author[]> => {
  const response = await httpClient.get<Author[]>(END_POINT);
  return response.data;
};

const getAuthor = async (id: number): Promise<Author> => {
  const response = await httpClient.get<Author>(`${END_POINT}/${id}`);
  return response.data;
};

export { getAllAuthors, getAuthor };

