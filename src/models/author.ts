export type Author = {
  id: number
  name: string
  bio?: string
}

export const authors: Author[] = []
let nextId = 1

export function createAuthor(name: string, bio?: string): Author {
  const author = { id: nextId++, name, bio }
  authors.push(author)
  return author
}