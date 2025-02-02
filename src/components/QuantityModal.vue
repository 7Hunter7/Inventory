<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal" :style="modalPosition">
      <div class="modal-content">
        <label for="quantity">Введите количество:</label>
        <input
          type="number"
          id="quantity"
          v-model.number="quantityToRemove"
          min="1"
          :max="item?.quantity"
        />
        <div class="modal-buttons">
          <button @click="closeModal">Отмена</button>
          <button @click="removeItems">Удалить</button>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 20;
}
.modal {
  position: absolute;
  background: #333;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
}
.modal-buttons button {
  padding: 10px 20px;
  border: none;
  background-color: #515151;
  color: #fff;
  cursor: pointer;
}
input[type="number"] {
  padding: 8px;
  border: none;
  background-color: #262626;
  color: #fff;
}
</style>
