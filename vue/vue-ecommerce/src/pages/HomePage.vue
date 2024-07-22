<script>
import ProductCard from '../components/ProductCard.vue';
import Cart from './Cart.vue';

export default {
    components: {
        ProductCard,
        Cart
    },
    data() {
        return { 
            allItems: [],
            isLoading:false,
            routePath:this.$route.params
        }
    }, 


    async mounted() {
        this.getAllItems()
    },
    methods: {
        async getAllItems() {
            this.isLoading=true
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                !response.ok ? console.log('Something Went Wrong') : this.allItems = data;
            } catch (error) {
                console.log(error.message);
            }
            this.isLoading=false
        }
    },
}
</script>
<template>
    <div  class="home-container">
        <h1 class="first-title">Just For You</h1>
         <template v-if="isLoading" >
            <h1 id="loader" >Loading.....</h1>
         </template>
         <template v-if="!isLoading && allItems.length!==0" >
             <ul class="cards">
                 <ProductCard v-for="item in allItems" :key="item.id" :item="item" />
                </ul>
            </template>
        </div>
</template>


<style lang="scss" scoped>
.home-container {
    padding: 1rem;

    .first-title {
        text-align: center;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    #loader{
        font-size: larger;
        text-align: center;
        font-weight: 500;
    }

    .cards {
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
}
</style>
