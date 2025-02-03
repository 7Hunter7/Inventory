<template>
  <div id="app" class="app">
    <div class="content">
      <SidebarComponent />
      <section class="section__grid">
        <div class="inventory-wrapper">
          <InventoryGrid ref="inventoryGridRef" />
          <ItemModal
            v-if="inventoryStore.isItemModalOpen"
            :gridRef="inventoryGridRef"
          />
        </div>
      </section>
    </div>
  </div>
  <FooterComponent @close="handleFooterClose" />
</template>

<script setup>
import { ref } from "vue";
import SidebarComponent from "./components/SidebarComponent.vue";
import InventoryGrid from "./components/InventoryGrid.vue";
import ItemModal from "./components/ItemModal.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { useInventoryStore } from "./stores/store.js";

const inventoryStore = useInventoryStore();
const inventoryGridRef = ref(null);
function handleFooterClose() {
  // Логика при нажатии на кнопку закрытия в подвале
  console.log("Footer closed");
}
</script>
