<script>
import { RouterLink } from 'vue-router';

export default {
    // props: {
    //     item: {
    //         type: Object,
    //         required: true
    //     }
    // }
    props:['item']
}
</script>

<template>
    <RouterLink :key="item.id" :to="{ path:`/cart/${item.id}` }">
        <li class="card">
            <div class="img-wrapper">
                <img :src="item.image" :alt="item.title">
            </div>
            <h3>{{ item.title }}</h3>
        </li>
    </RouterLink>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: inherit;
}

.card {
    height: 200px;
    max-width: 400px;
    width:400px;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 250ms ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }

    h3 {
        font-weight: 500;
        font-size: 15px;
        text-align: center;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .img-wrapper {
        height: 100px;
        width: 100%;
        margin-bottom: 5px;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
}
</style>
