<script>
export default {
    data(){
        return {
            price: {
                price1: 0,
                price2: 0,
                price3: 0,
                price4: 0,
                price5: 0
            },
            averagePriceWatched: 0,
            averagePrice:5
        }
    },
    computed: {
        averagePrice() {
            return (parseInt(this.price.price1) + parseInt(this.price.price2) + parseInt(this.price.price3) + parseInt(this.price.price4) + parseInt(this.price.price5)) / 5;
        }
    },
    watch: {
        price: {
            handler(newPrice) {
                this.averagePriceWatched = (parseInt(newPrice.price1) + parseInt(newPrice.price2) + parseInt(newPrice.price3) + parseInt(newPrice.price4) + parseInt(newPrice.price5)) / 5;
            },
            deep: true
        }
    }
}
</script>

<template>
    <div class="about-container">
        <input v-model.number="price.price1" type="number">
        <input v-model.number="price.price2" type="number">
        <input v-model.number="price.price3" type="number">
        <input v-model.number="price.price4" type="number">
        <input v-model.number="price.price5" type="number">
    </div>

    <div>
        Average Price Computed: {{ averagePrice }}
    </div>
    <div>
       Average Price Watched: {{ averagePriceWatched }}
    </div>
</template>

<style lang="scss" scoped>
.about-container {
    padding: 1rem;
}
</style>
