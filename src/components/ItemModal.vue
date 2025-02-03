<template>
  <aside class="modal" :style="modalPosition">
    <button class="close-button" @click="closeModal">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
        />
      </svg>
    </button>
    <div class="modal-container">
      <img
        class="modal-image"
        :src="inventoryStore.selectedItem?.image"
        alt="Item Image"
      />
      <div class="modal-content">
        <div class="modal-hr"></div>
        <h1 class="modal-title"></h1>
        <div
          class="modal-text"
          v-for="(block, index) in blockCount"
          :key="index"
        ></div>
        <div class="modal-hr"></div>
        <button class="delete-button" @click="openQuantityModal">
          Удалить предмет
        </button>
      </div>
    </div>
    <quantity-modal
      v-if="inventoryStore.isQuantityModalOpen"
      :item="inventoryStore.selectedItem"
    ></quantity-modal>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useInventoryStore } from "../stores/store.js";
import QuantityModal from "./QuantityModal.vue";

const props = defineProps({
  blockCount: {
    type: Number,
    default: 6,
  },
});

const inventoryStore = useInventoryStore();

const closeModal = () => {
  inventoryStore.closeItemModal();
};

const openQuantityModal = () => {
  inventoryStore.openQuantityModall();
};
const modalPosition = () => {
  return {
    top: "50%",
    right: "calc(100% - 525px - 20px)",
    transform: "translateY(-50%)",
  };
};

const emits = defineEmits(["close", "delete"]);
</script>

<style lang="scss" scoped>
.modal-container {
  position: relative;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 250px;
  border: solid #4d4d4d;
  border-radius: 0 12px 12px 0;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.5);
  z-index: 20;
  border: 1px solid #4d4d4d;
  padding: 55px 15px 18px 15px;
}
.close-button {
  position: absolute;
  top: 14px;
  right: 14px;
  border: none;
  background: none;
  cursor: pointer;
}
.modal-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  margin-bottom: 30px;
}
.modal-hr {
  width: 210px;
  height: 1px;
  background: #4d4d4d;
}
.modal-content {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}
.modal-title {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 30px;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
/* Текстовые блоки */
.modal-text {
  height: 0.625rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
  &:nth-child(3) {
    width: 100%;
  }
  &:nth-child(4) {
    width: 100%;
  }
  &:nth-child(5) {
    width: 100%;
  }
  &:nth-child(6) {
    width: 180px;
  }
  &:nth-child(7) {
    width: 80px;
    margin-bottom: 0;
  }
}
.delete-button {
  width: 100%;
  background: #fa7272;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #fff;
  padding: 11px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 24px;
  &:hover {
    opacity: 0.8;
  }
}
</style>
