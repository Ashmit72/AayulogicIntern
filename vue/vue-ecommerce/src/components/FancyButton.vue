<template>
  <button>
      <slot name="dialogueBtn" >
      {{ string }}
    </slot>
    </button>
</template>

<script>
export default {
  props: ['string']
}
</script>

<style lang="scss" scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>