<template>
  <div id="app" class="app">
    <div class="content">
      <SidebarComponent />
      <section class="section__grid">
        <Inventory />
        <ItemModal />
        <AddItemBar />
      </section>
    </div>
  </div>
  <FooterComponent @close="handleFooterClose" />
</template>

<script setup>
import SidebarComponent from "./components/SidebarComponent.vue";
import Inventory from "./components/Inventory.vue";
import ItemModal from "./components/ItemModal.vue";
import AddItemBar from "./components/AddItemBar.vue";
import FooterComponent from "./components/FooterComponent.vue";

function handleFooterClose() {
  // Логика при нажатии на кнопку закрытия в подвале
  console.log("Footer closed");
}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

body {
  max-width: 51.5rem;
  position: relative;
  background-color: black;
  margin: 0 auto;
  padding: 1rem;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-content: center;
  gap: 24px;
}
</style>
