<template>
  <aside class="sidebar">
    <img class="sidebar-image" :src="Sidebar" alt="Sidebar" />
    <div class="sidebar-content">
      <h1 class="sidebar-title"></h1>
      <div
        class="sidebar-text"
        v-for="(block, index) in blockCount"
        :key="index"
        :class="{
          'sidebar-text--width-1': index === 0,
          'sidebar-text--width-2': index === 1,
          'sidebar-text--width-3': index === 2,
          'sidebar-text--width-4': index === 3,
          'sidebar-text--width-5': index === 4,
          'sidebar-text--last': index === blockCount - 1,
        }"
      ></div>
    </div>
  </aside>
</template>

<script setup>
import Sidebar from "/Sidebar.png";

const props = defineProps({
  blockCount: {
    type: Number,
    default: 6,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  max-width: 14.75rem;
  border-radius: 1rem;
  border: 1px solid #4d4d4d;
  padding: 1.125rem 0.875rem 1.5rem 0.875rem;
  border-radius: 0.5rem;
  background: #262626;
  z-index: 1;
}
.sidebar-image {
  height: 15rem;
  border-radius: 0.5rem;
}
.sidebar-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 0.625rem 0 0.625rem;
}
.sidebar-title {
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 1.625rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
/* Текстовые блоки */
.sidebar-text {
  height: 0.625rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
  &--width-1 {
    width: 9.6875rem;
  }
  &--width-2 {
    width: 11.875rem;
  }
  &--width-3 {
    width: 10.625rem;
  }
  &--width-4 {
    width: 10rem;
  }
  &--width-5 {
    width: 8.75rem;
  }
  &--last {
    margin-top: 0.875rem;
    width: 5rem;
    margin-bottom: 0;
  }
}
</style>
