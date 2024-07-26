import type { Author } from "./Author"

export interface Post {
  id: number
  title: String
  body: String
  authorId: number
  userId: number
  created_at: Date
  updated_at: Date
  author: Author
}
