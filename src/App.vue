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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: black;
}
</style>
