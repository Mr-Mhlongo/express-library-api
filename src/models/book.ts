export type Book = {
  id: number
  title: string
  authorId: number
  year?: number
}

export const books: Book[] = []
let nextBookId = 1

export function createBook(data: Omit<Book, "id">): Book {
  const book: Book = { id: nextBookId++, ...data }
  books.push(book)
  return book
}

export function findBookById(id: number): Book | undefined {
  return books.find(b => b.id === id)
}

export function updateBook(id: number, patch: Partial<Book>): Book | null {
  const book = findBookById(id)
  if (!book) return null
  Object.assign(book, patch)
  return book
}

export function deleteBook(id: number): boolean {
  const index = books.findIndex(b => b.id === id)
  if (index === -1) return false
  books.splice(index, 1)
  return true
}