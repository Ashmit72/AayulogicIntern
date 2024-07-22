<template>
  <div class="main-content">
    <Teleport to="body">
      <div v-if="showDialogue" class="overlay"></div>
    </Teleport>
    <template v-if="isLoading">
      <h1 id="loader">Loading...</h1>
    </template>
    <div class="cart-info" v-else-if="Object.keys(itemDetails).length">
      <h2>{{ itemDetails.title }}</h2>
      <p class="description">{{ itemDetails.description }}</p>
      <p class="price">Price: ${{ itemDetails.price }}</p>
      <div class="img-wrapper">
        <img :src="itemDetails.image" alt="Product Image">
      </div>
      <button @click="setShowDialogue">Buy</button>
      <h1 class="items-info" v-if="items !== 0">Items bought {{ items }}</h1>
    </div>
    <div v-else>
      <h1 id="no-items">No item details available.</h1>
    </div>
    <div class="dialogueBox" v-if="showDialogue">
      <BuyDialogue @boughtItems="newboughtItems" @close-dialog="closeDialog" :image="itemDetails.image" :showDialogue="showDialogue" />
    </div>
  </div>
</template>

<script>
import BuyDialogue from "../components/BuyDialogue.vue"

export default {
  props: ['showDialogue'],
  components: {
    BuyDialogue
  },
  data() {
    return {
      showDialogue: false,
      itemDetails: {},
      isLoading: false,
      items: 0
    }
  },
  methods: {
    async getItem() {
      this.isLoading = true;
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${this.$route.params.id}`);
        if (!response.ok) {
          console.log('Network response was not ok');
        }
        this.itemDetails = await response.json();
      } catch (error) {
        console.log(error.message);
      }
      this.isLoading = false;
    },
    setShowDialogue() {
      this.showDialogue = true;
      document.body.classList.add('no-scroll');
    },
    closeDialog() {
      this.showDialogue = false;
      document.body.classList.remove('no-scroll');
    },
    newboughtItems(item) {
      this.showDialogue = false;
      this.items = item;
      document.body.classList.remove('no-scroll');
    }
  },
  created() {
    this.getItem();
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  height: 150%;
  width: 100%;
  position: absolute;
  top: 0;
}
#loader {
  text-align: center;
  font-weight: 500;
}
#no-items {
  text-align: center;
  font-weight: 500;
}
.dialogueBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50%;
  height: 500px;
  width: 100%;
  z-index: 999;
}
.cart-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 0;
  h2 {
    text-align: center;
    font-weight: 500;
    margin-bottom: 2rem;
    color: red;
  }
  .description {
    text-align: center;
    max-width: 50%;
    width: 100%;
  }
  .price {
    font-size: larger;
    font-weight: bold;
    color: green;
  }
  .img-wrapper {
    max-height: 500px;
    max-width: 500px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  button {
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: green;
    border-radius: 8px;
    border: none;
    color: white;
    font-weight: bolder;
    transition: 250ms ease-in-out;
    &:hover {
      transform: scale(1.1);
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    }
  }
  .items-info {
    font-weight: 400;
  }
}
.blurred {
  filter: blur(5px);
}

</style>
