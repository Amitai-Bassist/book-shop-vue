import { booksService } from "services/books-service.js"
import { eventBus } from "services/event-bus.service.js"

export default {
    template: `
        <section class="book-edit">
            <h1>book Edit</h1>
            <form @submit.prevent="save">
                <label htmlFor="title">books name</label>
                <input ref="title" type="text" v-model="bookToEdit.title">
                <label htmlFor="title">price</label>
                <input type="number" v-model.number="bookToEdit.listPrice.amount"><br />
                <textarea v-model="bookToEdit.review" 
                        name="review" cols="30" rows="10" 
                        placeholder="write a review"></textarea>
                <button ref="btn">Save</button>
            </form>
        </section>
    `,
    data() {
        return { 
            bookToEdit: {listPrice:{}},
        }
    },
    created(){
        const bookId = this.$route.params.id
        if(bookId){
            booksService.get(bookId)
                .then(book => this.bookToEdit = book)
        } else {
            this.bookToEdit = booksService.getEmptyBook()
        }
    },
    mounted(){
        this.$refs.title.focus()
    },
    methods:{
        save(){
            booksService.save(this.bookToEdit)
                .then(book => {
                    // this.$emit('saved', book)
                    // this.bookToEdit = bookService.getEmptybook()
                    const msg = {
                        txt: `book saved ${book.id}`,
                        type: 'success',
                        timeout: 4000,
                    }
                    eventBus.emit('user-msg', msg)
                    this.$router.push('/book')
                })
        }
    }
}