<template>
  <div id="app">
    <Inventory />
    <ItemModal />
    <AddItemBar />
  </div>
</template>

<script setup>
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
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

body {
  background-color: black;
  margin: 0;
}
</style>
