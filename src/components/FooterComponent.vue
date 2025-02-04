<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="search-box"></div>
      <CloseButton @close="$emit('close')" />
    </div>
  </footer>
</template>

<script setup>
import CloseButton from "./CloseButton.vue";

defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.footer {
  border: 1px solid #4d4d4d;
  border-radius: 0.75rem;
  width: 49rem;
  padding: 1.125rem;
  background: #262626;
  color: #fff;
  z-index: 1;
}
.footer-content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2.25rem;
}
.search-box {
  flex: 1;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
</style>
