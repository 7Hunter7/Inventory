<template>
  <div
    class="inventory-item"
    :style="{
      top: y * 100 + 'px',
      left: x * 100 + 'px',
    }"
    @click="selectItem"
  >
    <div class="item-background"></div>
    <span class="item-count">{{ item.count }}</span>
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/store";
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { x, y } = props.item;

const store = useInventoryStore();
const selectItem = () => {
  store.openModal();
  store.setSelectedItem(props.item);
};
</script>
