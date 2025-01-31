<template>
  <div class="item-modal" v-if="isModalOpen">
    <div class="item-modal-content">
      <button @click="closeModal">X</button>
      <div class="modal-item-wrapper">
        <div class="modal-item-background"></div>
        <div class="modal-item-count">Количество: {{ selectedItem.count }}</div>
      </div>

      <button @click="removeItem(selectedItem.id)">Удалить предмет</button>
    </div>
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useInventoryStore();
const { isModalOpen, selectedItem } = storeToRefs(store);
const closeModal = () => {
  store.closeModal();
};
const removeItem = (id) => {
  store.removeItem(id);
  store.closeModal();
};
</script>

<style lang="scss">
.item-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .item-modal-content {
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    button {
      margin-bottom: 10px;
      border: none;
      background-color: #747474;
      color: #fff;
      padding: 5px;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.1s ease-in;
      &:hover {
        transform: scale(1.1);
        background-color: #a5a5a5;
      }
      &:first-child {
        align-self: flex-end;
        background-color: #952525;
        &:hover {
          background-color: #b62e2e;
        }
      }
    }
    .modal-item-wrapper {
      display: flex;
      .modal-item-background {
        width: 48px;
        height: 48px;
        background-color: #7faa65;
        opacity: 0.5;
        border-radius: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .modal-item-count {
        font-size: 1.2em;
      }
    }
  }
}
</style>
