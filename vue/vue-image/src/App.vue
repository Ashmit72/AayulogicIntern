<script>

  // import { ref } from 'vue';

  // const searchQuery = ref('');
  // const images = ref([]);
  // const loading=ref(false)

  // const searchImages = async () => {
  //   loading.value=true
  //   try {
  //     const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchQuery.value}&client_id=oUsEG6eWmRNFHgSktnozAHW6iY1NypFCW_dYWjYh42Y`);
  //     const data = await response.json();
  //     images.value = data.results;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   loading.value=false
  // };

  // const handleSumbit=(e)=>{
  //   e.preventDefault()
  //   searchImages()
  // }

export default {
  data() {
    return {
      searchQuery: '',
      images: [],
      loading: false
    };
  },
  methods: {
    async searchImages() {
      this.loading = true;
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=2&query=${this.searchQuery}&client_id=oUsEG6eWmRNFHgSktnozAHW6iY1NypFCW_dYWjYh42Y`);
        const data = await response.json();
        this.images = data.results;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.searchImages();
    }
  }
};
</script>


<template>
  <main>
    <div class="container">
      <header>
        <form @submit.prevent="handleSubmit">
          <input v-model="searchQuery" id="searchBox" type="text" placeholder="Search for images">
          <button id="searchBtn">Search</button>
        </form>
      </header>
      <div class="image-container">
        <div v-if="loading">
          <div class="loader">Loading...</div>
        </div>
        <template v-else-if="images.length === 0">
          <h1 id="no-images">There are no images!</h1>
        </template>
        <template v-else-if="!loading">
          <div v-for="(image, index) in images" :key="index" class="image-item">
            <img :src="image.urls.small" :alt="image.alt_description">
          </div>
        </template>
      </div>
    </div>
  </main>
</template>


<style scoped>
.container {
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 1.5rem;
  color: #333;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

#searchBox {
  height: 50px;
  width: 300px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid gray;
}

#searchBtn {
  margin-left: 1rem;
  height: 40px;
  width: 100px;
  background-color: blue;
  color: white;
  font-weight: bolder;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#searchBtn:hover {
  opacity: 0.7;
}

#searchBox:focus {
  outline: none;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-item {
  width: 300px;
  height: 300px;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}


@media screen and (max-width:498px) {
  #searchBox{
    width: 200px;
    height: 40px;
  }
  #searchBtn{
    height: 35px;
    width: 80px;
  }
}
@media screen and (max-width:390px) {
  #searchBox{
    transform: scale(0.8);
  }
  #searchBtn{
    margin-left: 0.5rem;
    transform: scale(0.8);
  }
}

</style>
