<template>
  <teleport :to="teleportTarget" v-if="teleportTarget">
    <aside class="modal" :style="modalPosition">
      <div class="modal-content">
        <input
          type="number"
          placeholder="Введите количество"
          v-model.number="quantityToRemove"
          :max="item?.quantity"
        />
        <div class="modal-buttons">
          <button class="button close-button" @click="closeModal">
            Отмена
          </button>
          <button class="button delete-button" @click="removeItems">
            Подтвердить
          </button>
        </div>
      </div>
    </aside>
  </teleport>
</template>

<script setup>
import { useInventoryStore } from "../stores/store.js";
import { ref, defineProps, onMounted, computed, onUnmounted } from "vue";

const quantityToRemove = ref(null);
const inventoryStore = useInventoryStore();

const props = defineProps({
  item: Object,
  itemModalRef: {
    type: Object,
    default: () => {
      return null;
    },
  },
});

const teleportTarget = ref(null);
onMounted(() => {
  teleportTarget.value = document.body; // или другой контейнер
  window.addEventListener("keydown", handleEnterClose);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEnterClose);
  teleportTarget.value = null;
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
  const itemModalElement = props.itemModalRef?.itemModalRef?.$el;
  if (!itemModalElement)
    return { right: 0, bottom: 0, transform: "translate(0, 100%)" };
  const itemModalRect = itemModalElement.getBoundingClientRect();
  return {
    left: itemModalRect.right + "px",
    bottom: 0,
    transform: "translate(0, 0%)",
  };
};

const handleEnterClose = (event) => {
  if (event.key === "Enter") {
    if (
      inventoryStore.isQuantityModalOpen &&
      quantityToRemove.value !== null &&
      quantityToRemove.value > 0
    ) {
      removeItems();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 25.65rem;
  right: 0.8rem;
  max-width: 15.625rem;
  max-height: 8.3125rem;
  border: 1px solid #4d4d4d;
  border-radius: 0 0 0.75rem 0;
  padding: 1.25rem 1.3rem;
  backdrop-filter: blur(1rem);
  background: rgba(38, 38, 38, 0.6);
  z-index: 10;
  & input[type="number"] {
    padding: 0.5rem;
    border: 1px solid #4d4d4d;
    border-radius: 0.25rem;
    background: #262626;
    color: #fff;
    opacity: 0.4;
  }
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: #fff;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  .close-button {
    padding: 0.5rem 1.2rem;
    color: #2d2d2d;
    background: #fff;
    transition: opacity 0.2s ease-in;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
  .delete-button {
    padding: 0.5rem 0.9375rem;
    background: #fa7272;
    color: #fff;
    transition: background-color 0.2s ease-in;
    &:hover {
      background: #f88;
    }
    &:active {
      background: #fa7272;
    }
  }
}
</style>
