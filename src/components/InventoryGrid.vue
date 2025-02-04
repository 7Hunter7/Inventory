<template>
  <section class="inventory-grid" ref="gridRef">
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
          ref="itemWrapperRef"
          class="item-wrapper"
          :class="{ dragging: isDragging }"
          @mousedown="startDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          :style="getItemStyle(col - 1, row - 1)"
          @click="openModal(getItem(col - 1, row - 1))"
          draggable="true"
          @dragstart="handleDragStart(getItem(col - 1, row - 1), $event)"
          @dragend="handleDragEnd"
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
import { ref, onMounted, computed } from "vue";
import { useInventoryStore } from "../stores/store.js";
import { storeToRefs } from "pinia";

const gridRef = ref(null);
const isGridMounted = ref(false);
const isDragging = ref(false);
const isDraggingOver = ref(false);

onMounted(() => {
  isGridMounted.value = true;
});
const computedGridRef = computed(() => {
  return isGridMounted.value ? gridRef.value : null;
});

const itemWrapperRef = ref(null);
const startDrag = () => {
  isDragging.value = true;
};
const endDrag = () => {
  isDragging.value = false;
};
const handleDragEnd = () => {
  isDragging.value = false;
  isDraggingOver.value = false;
};

const inventoryStore = useInventoryStore();
const { draggedItem } = storeToRefs(inventoryStore);
const handleDragStart = (item, event) => {
  isDragging.value = true;
  inventoryStore.draggedItem = item;
  event.dataTransfer.setData("application/json", JSON.stringify(item));
};

const handleDragOver = (x, y) => {
  inventoryStore.hoveredCell = { x, y };
  isDraggingOver.value = true;
};

const handleDrop = (x, y) => {
  isDraggingOver.value = false;

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

defineExpose({
  computedGridRef,
});
</script>

<style lang="scss" scoped>
.inventory-grid {
  display: flex;
  flex-direction: column;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  width: 32.75rem;
  height: 31.5rem;
  background: #262626;
  overflow: hidden;
  z-index: 1;
  &.dragging-over {
    cursor: url("/icons/cursor-move.cur"), auto;
  }
  .inventory-row {
    display: flex;
    border-bottom: 1px solid #4d4d4d;
    width: 100%;
    height: 6.25rem;
    &:last-child {
      border-bottom: none;
    }
  }
  .inventory-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6.25rem;
    width: 6.5rem;
    border-right: 1px solid #4d4d4d;
    &:last-child {
      border-right: none;
    }
  }
}
.item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 6.25rem;
  cursor: pointer;
  &:hover {
    background: #2f2f2f;
    cursor: url("/icons/cursor-hover.cur"), auto;
  }
  &.dragging {
    cursor: url("/icons/cursor-move.cur"), auto;
  }
  &.dragging:hover {
    cursor: url("/icons/cursor-move.cur"), auto;
  }
}
.item-image {
  width: 3.375rem;
  height: 3.375rem;
}
.item-count {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border: 1px solid #4d4d4d;
  border-radius: 0.375rem 0 0 0;
  background: #262626;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 1rem;
  color: #fff;
  opacity: 0.4;
}
</style>
