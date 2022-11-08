export default {
    props:['book'],
    template: `
        <section class="book-preview">
            <img :src="imgUrl" alt="">
            <h2>{{ book.title }}</h2>
            <h4>{{ priceToDisplay }}</h4>
        </section>
    `,
    computed: {
        priceToDisplay(){
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode })
            .format(this.book.listPrice.amount)
        },
        imgUrl(){
            return this.book.thumbnail
        }

    }
}