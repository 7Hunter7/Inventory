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
import { useInventoryStore } from "@/stores/store";
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

<style lang="scss">
.inventory-item {
  position: absolute;
  width: 100px;
  height: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .item-background {
    width: 80px;
    height: 80px;
    background-color: green;
    opacity: 0.5;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.5);
    transition: all 0.1s ease-in;
  }
  &:hover .item-background {
    transform: scale(1.1);
  }
  .item-count {
    color: white;
    font-size: 1.2em;
  }
}
</style>
