import { utilService } from 'util.service.js'
import { storageService } from 'async-storage.service.js'

import { booksFirst } from 'books-first.service.js'


const BOOKS_KEY = 'booksDB'
_createBooks()

export const booksService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
}

function query() {
    return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if(book.id){
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook() {
    return { id: '',
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: null,
    description: '',
    pageCount: 86,
    categories: [],
    thumbnail: "http://coding-academy.org/books-photos/16.jpg",
    language: "sp",
    listPrice: {
      amount: '',
      currencyCode: "ILS",
      isOnSale: true
    } }
    
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = booksFirst.getBooksFirstDB()
        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}

function get(bookId){
    return storageService.get(BOOKS_KEY, bookId)
}

