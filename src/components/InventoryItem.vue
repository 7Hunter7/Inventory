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
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/stores/store";

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
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  // cursor: pointer;
  cursor: url("./icons/cursor"), avto;
  width: 48px;
  height: 48px;
  border-radius: 5%;
  background-color: #7faa65;
  transform: translate(55%, 55%);
  .item-background {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 5%;
    backdrop-filter: blur(12px);
    background: rgba(184, 217, 152, 0.35);
    transform: translate(6px, -6px);
    transition: all 0.1s ease-in;
  }
  &:hover .item-background {
    transform: scale(1.05);
  }
  &.stacked {
    transform: translate(56px, 44px);
    .item-background {
      backdrop-filter: blur(12px);
      background: rgba(184, 217, 152, 0.35);
    }
  }
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
    color: #fff;
    background: #262626;
  }
}
</style>
