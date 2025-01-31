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
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  .item-background {
    width: 48px;
    height: 48px;
    background-color: #7faa65;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.5);
    transition: all 0.1s ease-in;
    z-index: 3;
  }
  &:hover .item-background {
    transform: scale(1.1);
    box-shadow: 0 0 15px 6px rgba(255, 255, 255, 0.5);
  }
  .item-count {
    position: absolute;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 10px;
    text-align: center;
    color: #fff;
    opacity: 0.4;
    bottom: 0;
    right: 0;
    padding-right: 3px;
    padding-bottom: 2px;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid #4d4d4d;
      border-radius: 6px 0 0 0;
      width: 16px;
      height: 16px;
      background: #262626;
    }
  }
  &.stacked {
    transform: translate(6px, -6px);
    .item-background {
      backdrop-filter: blur(12px);
      background: rgba(184, 217, 152, 0.35);
    }
  }
}
</style>
