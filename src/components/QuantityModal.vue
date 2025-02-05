<template>
  <teleport :to="teleportTarget" v-if="teleportTarget">
    <aside
      class="modal"
      :class="{ 'modal-exit': isExiting }"
      :style="modalPosition"
    >
      <div class="modal-content">
        <input
          class="modal__input"
          type="number"
          placeholder="Введите количество"
          v-model.number="quantityToRemove"
          :max="item?.quantity"
          :class="{ error: quantityToRemove > item?.quantity }"
        />
        <div class="modal-buttons">
          <button class="button close-button" @click="closeModal">
            Отмена
          </button>
          <DeleteButton
            class="modal__delete-button"
            text="Подтвердить"
            @click="removeItems"
          />
        </div>
      </div>
    </aside>
  </teleport>
</template>

<script setup>
import DeleteButton from "./DeleteButton.vue";
import { useInventoryStore } from "../stores/store.js";
import { ref, onMounted, onUnmounted } from "vue";

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
const isExiting = ref(false);

onMounted(() => {
  teleportTarget.value = document.body; // или другой контейнер
  window.addEventListener("keydown", handleEnterClose);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEnterClose);
  teleportTarget.value = null;
});

const closeModal = () => {
  isExiting.value = true;
  setTimeout(() => {
    inventoryStore.closeQuantityModal();
  }, 300);
};

const removeItems = () => {
  if (
    quantityToRemove.value > props.item.quantity ||
    quantityToRemove.value === null
  )
    return;
  inventoryStore.removeItem(props.item.id, quantityToRemove.value);
  closeModal();
  setTimeout(() => {
    inventoryStore.closeItemModal();
  }, 300);
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
  opacity: 1;
  animation: slideIn 0.4s ease forwards;
  &.modal-exit {
    animation: slideOut 0.3s ease forwards;
  }
  &__delete-button {
    margin-top: 0rem;
    padding: 0.5rem 0.9375rem;
  }
  &__input {
    padding: 0.5rem;
    border: 1px solid #4d4d4d;
    border-radius: 0.25rem;
    background: #262626;
    color: #fff;
    opacity: 0.4;
    transition: border-color 0.3s ease;
    &.error {
      border-color: #fa7272;
      animation: blink 1s linear infinite; /* Анимация мигания */
    }
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
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
}

/* Анимациии для Модального окна */
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
