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

<style lang="scss">
.sidebar {
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  width: 236px;
  padding: 18px 14px 24px 14px;
  border-radius: 0.5rem;
  background: #262626;
}
.sidebar-image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  & img {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.1);
  }
}
.sidebar-content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.sidebar-title {
  border-radius: 0.5rem;
  width: 190px;
  height: 26px;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
/* Текстовые блоки */
.sidebar-text {
  height: 0.625rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
.sidebar-text:first-child {
  width: 155px;
}
.sidebar-text:nth-child(2) {
  width: 190px;
}
.sidebar-text:nth-child(3) {
  width: 170px;
}
.sidebar-text:nth-child(4) {
  width: 160px;
}
.sidebar-text:last-child {
  width: 140px;
}
</style>
