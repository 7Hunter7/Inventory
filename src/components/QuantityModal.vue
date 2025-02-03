<template>
  <aside class="modal" :style="modalPosition">
    <div class="modal-content">
      <input
        type="number"
        placeholder="Введите количество"
        v-model.number="quantityToRemove"
        :max="item?.quantity"
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
  bottom: 0;
  right: 0;
  max-width: 250px;
  max-height: 133px;
  border: 1px solid #4d4d4d;
  border-radius: 0 0 12px 0;
  padding: 20px 21px;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.6);
  z-index: 10;
  & input[type="number"] {
    padding: 12px 55px 12px 12px;
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
