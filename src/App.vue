<template>
  <div id="app" class="app">
    <SidebarComponent />
    <section class="section__grid">
      <Inventory />
      <ItemModal />
      <AddItemBar />
    </section>
  </div>
</template>

<script setup>
import SidebarComponent from "./components/SidebarComponent.vue";
import Inventory from "./components/Inventory.vue";
import ItemModal from "./components/ItemModal.vue";
import AddItemBar from "./components/AddItemBar.vue";
</script>

<style lang="scss">
:root {
  --font-family: "Inter", sans-serif;
  --second-family: "SF Pro Display", sans-serif;
}

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 16px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-content: center;
  gap: 24px;
}

body {
  background-color: black;
  margin: 0 auto;
  padding: 1rem;
}
</style>
