import { booksService } from "services/books-service.js"
// import longText from '../cmps/long-text.cmp.js'
import reviewAdd from 'cmps/review-add.cmp.js'

export default {
    template: `
        <section v-if="book" class="book-details">
            <img :src="imgUrl" alt="">
            <h1>{{ book.title }}</h1>
            <h2 v-bind:style="colorPriceStyle">{{priceToDisplay}}</h2>
            <ul>
                <li>{{ pageCount }}</li>
                <li>{{ published }}</li>
                <li v-bind:style="forSale">{{ onSale }}</li>
            </ul>

            <!-- <long-text v-bind:txt="book.description"></long-text> -->
            <review-add></review-add>
            <router-link to="/book">Back</router-link>
            <!-- <button @click="$emit('close')">Close</button> -->
        </section>
        <h3 v-else>Loading...</h3>
    `,
    data(){
        return {
            book: null,
        }
    },
    created(){
        const id = this.$route.params.id
        booksService.get(id)
            .then(book => this.book = book)
    },
    computed: {
        imgUrl(){
            return this.book.thumbnail
        },
        pageCount(){
            let pages = this.book.pageCount
            if (pages > 500) return 'Long Reading'
            else if (pages > 200) return 'Decent Reading'
            else if (pages < 100) return 'Light Reading' 
        },
        published(){
            let publishedBefore = (new Date).getFullYear - this.book.publishedDate
            if (publishedBefore > 10) return 'Veteran Book'
            else if (publishedBefore < 1) return'New!'
        },
        priceToDisplay(){
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode })
            .format(this.book.listPrice.amount)
        },
        colorPriceStyle(){
            if (this.book.listPrice.amount >150) return {color: 'red'}
            else if (this.book.listPrice.amount <20) return {color: 'green'}
        },
        onSale(){ 
            return (this.book.listPrice.isOnSale) ? 'For sale!': 'sold out...'
        },
        forSale(){
            return (this.book.listPrice.isOnSale) ? {color: 'rgb(56 245 56)'} : {color: 'red'}
        }

    },
    components: {
        reviewAdd,
        // longText
    }
}