<template>
  <aside class="modal" @click.self="$emit('close')">
    <div class="modal-header">
      <button class="close-button" @click="$emit('close')">
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
    </div>
    <div class="modal-image-container">
      <img class="modal-image" :src="ModalImage" alt="Modal Image" />
    </div>
    <div class="modal-content">
      <div class="modal-hr"></div>
      <div
        class="modal-block"
        v-for="(block, index) in blockCount"
        :key="index"
      ></div>
      <button class="delete-button" @click="$emit('delete')">
        Удалить предмет
      </button>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ModalImage from "/ModalImage.png";

const props = defineProps({
  imageUrl: {
    type: String,
    default: "",
  },
  blockCount: {
    type: Number,
    default: 6,
  },
});
const emits = defineEmits(["close", "delete"]);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  height: 500px;
  border-left: 1px solid #4d4d4d;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.5);
  z-index: 20;
  border: 1px solid #4d4d4d;
  padding: 55px 15px 18px 15px;
}
.modal-header {
  right: 15px;
  top: 15px;
}
.modal-image-container {
  display: flex;
  justify-content: center;
}
.modal-image {
  max-height: 120px;
  max-width: 120px;
  border-radius: 0.5rem;
  margin-bottom: 14px;
}
.modal-hr {
  width: 100%;
  height: 1px;
  background: #4d4d4d;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10px;
}

.close-button {
  border: none;
  background: none;
  cursor: pointer;
}

/* Текстовые блоки */
.modal-block {
  height: 0.625rem;
  margin-bottom: 0.65rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
  &:first-child {
    width: 155px;
    margin-top: 0;
  }
  &:nth-child(2) {
    width: 100%;
  }
  &:nth-child(3) {
    width: 170px;
  }
  &:nth-child(4) {
    width: 160px;
  }
  &:nth-child(5) {
    width: 140px;
  }
  &:last-child {
    width: 140px;
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
