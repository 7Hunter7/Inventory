<template>
  <aside class="modal" :style="modalPosition">
    <div class="modal-content">
      <input
        type="text"
        v-model.number="quantityToRemove"
        min="1"
        :max="item?.quantity"
        placeholder="Введите количество"
      />
      <div class="modal-buttons">
        <button class="button close-button" @click="closeModal">Отмена</button>
        <button class="button delete-button" @click="removeItems">
          Удалить
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useInventoryStore } from "../stores/store.js";
import { ref } from "vue";

const quantityToRemove = ref(1);
const inventoryStore = useInventoryStore();

const props = defineProps({
  item: Object,
});

const closeModal = () => {
  inventoryStore.closeQuantityModal();
};

const removeItems = () => {
  inventoryStore.removeItem(props.item.id, quantityToRemove.value);
  closeModal();
  inventoryStore.closeItemModal();
};

const modalPosition = () => {
  return {
    right: 0,
    bottom: 0,
    transform: "translate(0, 100%)",
  };
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  border: 1px solid #4d4d4d;
  border-radius: 0 0 12px 0;
  padding: 20px 21px;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.6);
  &.input[type="text"] {
    height: 40px;
    padding: 12px;
    opacity: 0.4;
  }
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  .close-button {
    color: #2d2d2d;
    background: #fff;
  }
  .delete-button {
    background: #fa7272;
    color: #fff;
    &:hover {
      background: #f88;
    }
  }
}
</style>
