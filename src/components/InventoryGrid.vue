<template>
  <section class="inventory-grid" ref="gridRef">
    <div v-for="row in 5" :key="row" class="inventory-row">
      <InventoryCell
        v-for="col in 5"
        :key="col"
        :x="col - 1"
        :y="row - 1"
        :item="getItem(col - 1, row - 1)"
        @dragover="handleDragOver(col - 1, row - 1)"
        @drop="handleDrop(col - 1, row - 1)"
        @open-modal="openModal"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useInventoryStore } from "../stores/store.js";
import InventoryCell from "./InventoryCell.vue";

const inventoryStore = useInventoryStore();

const gridRef = ref(null);
const computedGridRef = computed(() => gridRef.value);

const handleDragOver = (x, y) => {
  inventoryStore.hoveredCell = { x, y };
};

const handleDrop = (x, y) => {
  inventoryStore.moveItem(inventoryStore.draggedItem.id, x, y);
};

const getItem = (x, y) => {
  return inventoryStore.items.find((item) => item.x === x && item.y === y);
};

const openModal = (item) => {
  inventoryStore.setSelectedItem(item);
  inventoryStore.openItemModal();
};

defineExpose({
  computedGridRef,
});
</script>

<style lang="scss" scoped>
.inventory-grid {
  display: flex;
  flex-direction: column;
  border: 1px solid #4d4d4d;
  border-radius: 0.75rem;
  width: 32.75rem;
  height: 31.5rem;
  background: #262626;
  overflow: hidden;
  z-index: 1;

  .inventory-row {
    display: flex;
    border-bottom: 1px solid #4d4d4d;
    width: 100%;
    height: 6.25rem;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
