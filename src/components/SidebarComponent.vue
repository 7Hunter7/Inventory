<template>
  <aside class="sidebar">
    <img class="sidebar-image" :src="Sidebar" alt="Sidebar" />
    <div class="sidebar-content">
      <h1 class="sidebar-title"></h1>
      <div
        class="sidebar-text"
        v-for="(block, index) in blockCount"
        :key="index"
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
  width: 236px;
  height: 500px;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  padding: 18px 14px 24px 14px;
  border-radius: 0.5rem;
  background: #262626;
}
.sidebar-image {
  width: 100%;
  max-height: 240px;
  border-radius: 0.5rem;
  width: 100%;
}
.sidebar-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 0 8px 0 10px;
}
.sidebar-title {
  margin-top: 20px;
  margin-bottom: 24px;
  border-radius: 0.5rem;
  width: 100%;
  height: 26px;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
/* Текстовые блоки */
.sidebar-text {
  height: 0.625rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);

  &:first-child {
    margin-top: 0px;
    width: 155px;
  }
  &:nth-child(2) {
    width: 100%;
  }
  &:nth-child(3) {
    width: 170px;
  }
  &:nth-child(4) {
    width: 160px;
  }
  &:nth-child(5) {
    width: 140px;
  }
  &:last-child {
    padding-bottom: 0;
    width: 140px;
  }
}
</style>
