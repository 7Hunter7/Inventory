<template>
  <button class="close-button" @click="$emit('close')">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
      />
    </svg>
  </button>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.close-button {
  border: none;
  background: none;
  cursor: url("/icons/cursor.cur"), auto;
  transition: opacity 0.2s ease;
  &:hover,
  &:active {
    cursor: url("/icons/cursor.cur"), auto;
  }
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
}
</style>
