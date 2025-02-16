<template>
  <teleport :to="teleportTarget" v-if="teleportTarget">
    <aside
      class="modal"
      :class="{ 'modal-exit': isExiting }"
      :style="modalPosition"
      ref="itemModalRef"
      @transitionend="onTransitionEnd"
    >
      <CloseButton class="modal-close" @close="closeModal" />
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
            :class="{
              'modal-text--width-1': index === 0,
              'modal-text--width-2': index === 1,
              'modal-text--width-3': index === 2,
              'modal-text--width-4': index === 3,
              'modal-text--last': index === blockCount - 1,
            }"
          ></div>
          <div class="modal-hr"></div>
        </div>
        <ButtonWithText text="Удалить предмет" @click="openQuantityModal" />
      </div>
      <QuantityModal
        v-if="inventoryStore.isQuantityModalOpen"
        :item="inventoryStore.selectedItem"
        :itemModalRef="itemModalRef"
      ></QuantityModal>
    </aside>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useInventoryStore } from "../stores/store.js";
import CloseButton from "./CloseButton.vue";
import ButtonWithText from "./ButtonWithText.vue";
import QuantityModal from "./QuantityModal.vue";

const props = defineProps({
  blockCount: {
    type: Number,
    default: 5,
  },
  gridRef: {
    type: Object,
    default: () => {
      return null;
    },
  },
});

const inventoryStore = useInventoryStore();
const itemModalRef = ref(null);
const teleportTarget = ref(null);
const isExiting = ref(false);

onMounted(() => {
  teleportTarget.value = document.body;
});
onUnmounted(() => {
  teleportTarget.value = null;
});

const closeModal = () => {
  isExiting.value = true;
  setTimeout(() => {
    inventoryStore.closeItemModal();
  }, 300);
};

const openQuantityModal = () => {
  inventoryStore.openQuantityModall();
};

const modalPosition = () => {
  const gridElement = props.gridRef?.computedGridRef?.$el;
  if (!gridElement)
    return { top: "50%", right: "20px", transform: "translateY(-50%)" };

  const gridRect = gridElement.getBoundingClientRect();
  return {
    top: "50%",
    left: gridRect.right + "px", // Расположение справа
    transform: "translateY(-50%)",
  };
};

const emits = defineEmits(["close", "delete"]);

defineExpose({
  itemModalRef,
});
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 2rem;
  right: 0.8rem;
  z-index: 5;
  backdrop-filter: blur(1rem);
  background-color: rgba(38, 38, 38, 0.5);
  transform: translateX(0);
  opacity: 1;
  animation: slideIn 0.4s ease forwards;
  &.modal-exit {
    animation: slideOut 0.3s ease forwards;
  }
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 15.625rem;
  border: solid #4d4d4d;
  border-radius: 0 0.75rem 0.75rem 0;
  border: 1px solid #4d4d4d;
  padding: 3.3rem 0.9rem 1.15rem 0.9rem;
}
.modal-close {
  position: absolute;
  z-index: 10;
  top: 1rem;
  right: 1rem;
}
.modal-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.125rem;
  height: 8.125rem;
  margin-bottom: 1.875rem;
}
.modal-hr {
  width: 13.125rem;
  height: 1px;
  background-color: #4d4d4d;
}
.modal-content {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.3rem;
  margin-bottom: 1.5rem;
}
.modal-title {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 1.875rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
/* Текстовые блоки */
.modal-text {
  height: 0.625rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
  &--width-1 {
    width: 100%;
  }
  &--width-2 {
    width: 100%;
  }
  &--width-3 {
    width: 100%;
  }
  &--width-4 {
    width: 11.25rem;
  }
  &--last {
    width: 5rem;
    margin-bottom: 1.5rem;
  }
}

/* Анимациии для Модального окна */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
