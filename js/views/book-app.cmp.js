import {booksService} from 'services/books-service.js'
import { eventBus } from 'services/event-bus.service.js'

import bookFilter from 'cmps/book-filter.cmp.js'
import bookList from 'cmps/book-list.cmp.js'
// import bookDetails from '../cmps/book-details.cmp.js'

export default {
    template:`
        <section class="book-app" v-bind:class="{ dark: this.isModal}">
            <h1>books</h1>
            <book-filter 
                @filter="setFilter">
            </book-filter>
            <router-link to="/book/edit">Add a book...</router-link>
            <book-list 
                
                @remove="removeBook"
                :books="booksToShow">
            </book-list>
            <!-- <book-details 
                @close="closeModal" 
                v-if="selectedBook"
                :book="selectedBook">
            </book-details> -->
        </section>
    `,
    data(){
        return{
            books: null,
            selectedBook: null,
            filterBy: null,
            isModal:false
        }
    },
    created(){
        booksService.query()
            .then(books => this.books = books)
    },
    methods: {
        removeBook(bookId){
            booksService.remove(bookId)
               .then(() => {
                   const idx = this.books.findIndex(book => book.id === bookId)
                   this.books.splice(idx, 1)

                   const msg = {
                    txt: `book ${bookId} deleted...`,
                    type: 'success',
                    }
                    eventBus.emit('user-msg', msg)

               }) 

        },
        setFilter(filterBy){
            this.filterBy = filterBy
        },
        
    },
    computed:{
        booksToShow(){
            if (!this.filterBy) return this.books
            let books = this.books.filter(book => book.listPrice.amount <= this.filterBy.price)
            const regex = new RegExp(this.filterBy.title, 'i')
            return books.filter(book => regex.test(book.title))
        }
    },
    components: {
        bookList, 
        bookFilter,
        
    }
}