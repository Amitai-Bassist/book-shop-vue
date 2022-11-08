export default {
    props: ['txt'],
    template:`
    <h4>Description:</h4>
    <p>{{txtToDisplay}}</p>
    <p v-if="readMore">{{moreTxt}}</p>
    <button class="more" v-if="isLong" @click="more">...</button>
    <button v-if="isMore" @click="less">less</button>
    
    
    `,
    data() {
        return {
            readMore: false,
            isLong: false,
            isMore: false
        }
    },
    created() {
        this.isLong = (this.txt.length > 99) ? true : false
    },
    methods:{
        more(){
            this.readMore = true
            this.isLong = false
            this.isMore = true
        },
        less(){
            this.readMore = false
            this.isLong = true
            this.isMore = false
        }
    },
    computed: {
        txtToDisplay(){
            return this.txt.slice(0,99)
        },
        moreTxt(){
            return  this.txt.slice(99)
        }
    }
}