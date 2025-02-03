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
  top: 390px;
  right: 13px;
  max-width: 250px;
  max-height: 133px;
  border: 1px solid #4d4d4d;
  border-radius: 0 0 12px 0;
  padding: 20px 18px;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.6);
  z-index: 10;
  & input[type="number"] {
    max-width: 250px;
    max-height: 40px;
    padding: 8px;
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
  gap: 8px;
  border: none;
  .close-button {
    padding: 8px 19.5px;
    color: #2d2d2d;
    background: #fff;
    &:hover {
      background: #faf8f8dc;
    }
  }
  .delete-button {
    padding: 8px 15px;
    background: #fa7272;
    color: #fff;
    &:hover {
      background: #f88;
    }
  }
}
</style>
