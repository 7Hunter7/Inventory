<template>
  <section class="inventory-grid">
    <div v-for="row in 5" :key="row" class="inventory-row">
      <div
        v-for="col in 5"
        :key="col"
        class="inventory-cell"
        @dragover.prevent="handleDragOver(col - 1, row - 1)"
        @drop.prevent="handleDrop(col - 1, row - 1)"
      >
        <div
          v-if="hasItem(col - 1, row - 1)"
          class="item-wrapper"
          :class="{ dragging: isDragging }"
          @mousedown="startDrag()"
          @mouseup="endDrag()"
          @mouseleave="endDrag()"
          :style="getItemStyle(col - 1, row - 1)"
          @click="openModal(getItem(col - 1, row - 1))"
          draggable="true"
          @dragstart="handleDragStart(getItem(col - 1, row - 1))"
        >
          <img
            class="item-image"
            :src="getItem(col - 1, row - 1).image"
            alt="Item Image"
          />
          <div v-if="getItem(col - 1, row - 1).quantity > 1" class="item-count">
            {{ getItem(col - 1, row - 1).quantity }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useInventoryStore } from "../stores/store.js";
import { storeToRefs } from "pinia";

const isDragging = ref(false);

const startDrag = () => {
  isDragging.value = true;
};

const endDrag = () => {
  isDragging.value = false;
};

const inventoryStore = useInventoryStore();
const { draggedItem } = storeToRefs(inventoryStore);

const handleDragStart = (item) => {
  inventoryStore.draggedItem = item;
};

const handleDragOver = (x, y) => {
  inventoryStore.hoveredCell = { x, y };
};

const handleDrop = (x, y) => {
  if (!draggedItem.value) return;

  const existingItem = inventoryStore.items.find(
    (item) => item.x === x && item.y === y
  );

  if (existingItem) return;

  inventoryStore.moveItem(draggedItem.value.id, x, y);
  inventoryStore.draggedItem = null;
};

const hasItem = (x, y) => {
  return inventoryStore.items.some((item) => item.x === x && item.y === y);
};

const getItem = (x, y) => {
  return inventoryStore.items.find((item) => item.x === x && item.y === y);
};

const getItemStyle = (x, y) => {
  const item = getItem(x, y);
  if (!item) return {};
  let styles = {
    zIndex: 10,
  };
  let countItems = 0;
  inventoryStore.items.forEach((i) => {
    if (i.id === item.id) {
      countItems++;
    }
  });
  if (countItems > 1) {
    styles = {
      transform: `translate(${countItems * 6}px, ${countItems * -6}px)`,
      background: "rgba(184, 217, 152, 0.35)",
      backdropFilter: "blur(12px)",
    };
  }
  return styles;
};

const openModal = (item) => {
  inventoryStore.setSelectedItem(item);
  inventoryStore.openItemModal();
};
</script>

<style lang="scss" scoped>
.inventory-grid {
  display: flex;
  flex-direction: column;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  width: 524px;
  height: 504px;
  background: #262626;
  overflow: hidden;
  z-index: 1;
  .inventory-row {
    display: flex;
    border-bottom: 1px solid #4d4d4d;
    width: 100%;
    height: 100px;
    &:last-child {
      border-bottom: none;
    }
  }
  .inventory-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 105px;
    height: 100px;
    border-right: 1px solid #4d4d4d;
    &:last-child {
      height: 100px;
      border-right: none;
    }
  }
}
.item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 100px;
  cursor: pointer;
  &:hover {
    cursor: url("/icons/cursor-hover.cur"), auto; /* Состояние наведения */
  }
  &.dragging {
    cursor: url("/icons/cursor-move.cur"), auto; /* Состояние перетаскивания */
  }
}
.item-image {
  width: 54px;
  height: 54px;
}
.item-count {
  position: absolute;
  bottom: -1px;
  right: -1px;
  border: 1px solid #4d4d4d;
  border-radius: 6px 0 0 0;
  width: 16px;
  height: 14px;
  background: #262626;
  padding-top: 2px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 10px;
  text-align: center;
  color: #fff;
  opacity: 0.4;
}
</style>
