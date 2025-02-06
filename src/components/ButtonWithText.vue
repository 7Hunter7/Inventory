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
  width: 100%;
  padding: 0.6875rem;
  color: #fff;
  background-color: #fa7272;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f88;
  }
  &:active {
    background-color: #fa7272;
  }
}
</style>
