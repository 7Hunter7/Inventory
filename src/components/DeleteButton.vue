<template>
  <button class="button delete-button" @click="$emit('click')">
    <slot v-if="text">{{ text }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.delete-button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.7rem;
  color: #fff;
  background-color: #fa7272;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f88;
    opacity: 0.8;
  }
  &:active {
    background-color: #fa7272;
    opacity: 0.6;
  }
}
</style>
