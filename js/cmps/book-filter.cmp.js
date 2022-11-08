export default{
    template: `
        <section class="book-filter">
            <input 
                @input="filter"
                v-model="filterBy.title" 
                type="text" 
                placeholder="Search book">
            price
            <input 
                @input="filter"
                v-model="filterBy.price"
                type="range" 
                min="0" max="200" step="1"/>
            <span >{{filterBy.price}}</span>
        </section>
    `,
    data(){
        return { 
            filterBy: {
                title: '',
                price: 200
            }
        }
    },
    methods : {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}
