<template>
  <dialog v-if="dialogueStatus" open>
    <div class="closeBtn">
      <span @click="closeDialog" class="cross-icon">❌</span>
    </div>
    <h1 v-if="cart > 0">Cart: <span class="cart-count">{{ cart }}</span> <span @click="reduceCartItems"
        class="minus">-</span></h1>
    <div class="item-img">
      <img :src="image" alt="img">
    </div>
    <div class="buttons">
        <CustomBtn string="Buy" @click="buyItems"/>
        <CustomBtn string="Cart" @click="increaseCart"/>
    </div>
  </dialog>
</template>

<script>
import CustomBtn from "./FancyButton.vue"
export default {
  props: ['showDialogue', 'image'],
  components: {
    CustomBtn
  },
  data() {
    return {
      dialogueStatus: this.showDialogue,
      cart: 0,
    }
  },
  methods: {
    closeDialog() {
      this.dialogueStatus = false
      this.$emit('close-dialog')
    },
    reduceCartItems() {
      if (this.cart > 0) {
        this.cart--
      }
    },
    increaseCart() {
      this.cart++
    },
    buyItems() {
      const items = this.cart
      if (items===0) {
        return 
      }
      this.$emit('boughtItems', items)
      this.dialogueStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
dialog {
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  h1 {
    font-weight: 400;
    color: green;

    .cart-count {
      color: yellowgreen;
    }

    .minus {
      color: red;
      font-size: larger;
      cursor: pointer;
    }
  }

  .closeBtn {
    align-self: flex-end;

    .cross-icon {
      cursor: pointer;
    }
  }

  .item-img {
    height: 200px;
    width: 200px;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }
}
</style>
