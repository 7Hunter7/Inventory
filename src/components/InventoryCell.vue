<template>
  <div
    class="inventory-cell"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <InventoryItem
      v-if="item"
      :item="item"
      @dragstart="handleDragStart"
      @click="openModal"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import InventoryItem from "./InventoryItem.vue";
import { useInventoryStore } from "../stores/store.js";

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  item: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["open-modal", "dragover", "drop"]);
const inventoryStore = useInventoryStore();

const handleDragOver = () => {
  emit("dragover");
};

const handleDrop = () => {
  emit("drop");
};

const handleDragStart = (event) => {
  inventoryStore.draggedItem = props.item;
};

const openModal = () => {
  emit("open-modal", props.item);
};
</script>

<style lang="scss" scoped>
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
</style>
