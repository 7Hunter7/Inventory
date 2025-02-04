<template>
  <teleport :to="teleportTarget" v-if="teleportTarget">
    <aside
      class="modal"
      :class="{ 'modal-enter': isEntering }"
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
          ></div>
          <div class="modal-hr"></div>
          <button class="button delete-button" @click="openQuantityModal">
            Удалить предмет
          </button>
        </div>
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
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { useInventoryStore } from "../stores/store.js";
import CloseButton from "./CloseButton.vue";
import QuantityModal from "./QuantityModal.vue";

const props = defineProps({
  blockCount: {
    type: Number,
    default: 6,
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

onMounted(() => {
  teleportTarget.value = document.body;
});
onUnmounted(() => {
  teleportTarget.value = null;
});

const isEntering = ref(false);
watch(
  () => inventoryStore.isItemModalOpen,
  (newValue) => {
    if (newValue) {
      isEntering.value = true;
    }
  }
);
const onTransitionEnd = () => {
  if (!inventoryStore.isItemModalOpen) {
    isEntering.value = false;
  }
};
const closeModal = () => {
  inventoryStore.closeItemModal();
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
.modal-container {
  position: absolute;
  top: 2rem;
  right: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 15.625rem;
  border: solid #4d4d4d;
  border-radius: 0 0.75rem 0.75rem 0;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.5);
  border: 1px solid #4d4d4d;
  padding: 3.3rem 0.9rem 1rem 0.9rem;
  z-index: 5;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}
.modal-enter {
  transform: translateX(100%);
  opacity: 0;
}
.modal-close {
  position: absolute;
  z-index: 10;
  top: 3rem;
  right: 1.5rem;
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
    width: 11.25rem;
  }
  &:nth-child(7) {
    width: 5rem;
    margin-bottom: 0;
  }
}
.delete-button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.7rem;
  background: #fa7272;
  &:hover {
    opacity: 0.8;
    cursor: url("/icons/cursor-hover.cur"), auto;
  }
  &:active {
    cursor: url("/icons/cursor-move.cur"), auto;
  }
}
</style>
