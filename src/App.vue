<template>
  <div id="app" class="app">
    <div class="content">
      <SidebarComponent />
      <section class="section__grid">
        <div class="inventory-wrapper">
          <InventoryGrid />
          <ItemModal v-if="inventoryStore.isItemModalOpen" />
        </div>
      </section>
    </div>
  </div>
  <FooterComponent @close="handleFooterClose" />
</template>

<script setup>
import SidebarComponent from "./components/SidebarComponent.vue";
import InventoryGrid from "./components/InventoryGrid.vue";
import ItemModal from "./components/ItemModal.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { useInventoryStore } from "./stores/store.js";

const inventoryStore = useInventoryStore();

function handleFooterClose() {
  // Логика при нажатии на кнопку закрытия в подвале
  console.log("Footer closed");
}
</script>
