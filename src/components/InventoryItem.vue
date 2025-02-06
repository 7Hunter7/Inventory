<template>
  <div
    class="item-wrapper"
    :class="{ selected: isSelected }"
    draggable="true"
    @dragstart="handleDragStart"
    @click="$emit('click')"
    ref="itemWrapperRef"
  >
    <img class="item-image" :src="item.image" :alt="item.name" />
    <div v-if="item.quantity > 1" class="item-count">
      {{ item.quantity }}
    </div>
  </div>

  <div
    id="drag-image"
    ref="dragImage"
    style="position: absolute; top: -1000px; left: -1000px"
  >
    <img
      v-if="inventoryStore.draggedItem"
      :src="inventoryStore.draggedItem.image"
      :alt="inventoryStore.draggedItem.name"
      style="width: 54px; height: 54px"
    />
    <div
      style="
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        background-image: url('/icons/icon-move.png');
        background-size: cover;
      "
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { useInventoryStore } from "../stores/store.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const inventoryStore = useInventoryStore();
const emit = defineEmits(["dragstart", "click"]);
const dragImage = ref(null);

const isSelected = computed(() => {
  return inventoryStore.selectedItem?.id === props.item.id;
});

onMounted(() => {
  if (dragImage.value) {
    Object.assign(dragImage.value.style, {
      border: "1px solid #4d4d4d",
      borderRadius: "1.5rem",
      width: "6.5rem",
      height: "6.25rem",
      background: "#262626",
      position: "absolute",
      top: "-50rem",
      left: "-50rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  }
});

watchEffect(() => {
  const img = dragImage.value;
  if (img) {
    const dragImageImg = img.querySelector("img");
    if (dragImageImg) {
      dragImageImg.src = inventoryStore.draggedItem?.image || "";
    }
  }
});

const handleDragStart = (event) => {
  const img = dragImage.value;
  if (!img) return;

  // Скрытие модальных окна
  inventoryStore.closeItemModal();
  inventoryStore.closeQuantityModal();

  document.body.classList.add("dragging");
  document.body.appendChild(img);

  // Устанавка draggedItem в store
  inventoryStore.draggedItem = props.item;

  // Устанавка src
  const dragImageImg = img.querySelector("img");
  if (dragImageImg) {
    dragImageImg.src = inventoryStore.draggedItem.image;
  }

  // Установика изображения перетаскивания
  event.dataTransfer.setDragImage(img, 50, 50); // Положение
  event.dataTransfer.setData("text/plain", JSON.stringify(props.item));

  emit("dragstart", event);
};

document.addEventListener("dragend", () => {
  document.body.classList.remove("dragging");
  inventoryStore.draggedItem = null;
});
</script>

<style lang="scss" scoped>
.item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 6.25rem;
  cursor: pointer;
  &.selected {
    background-color: #2f2f2f;
    cursor: url("/icons/cursor-hover.cur"), auto;
  }
  &:hover:not(.selected) {
    background-color: #2f2f2f;
    cursor: url("/icons/cursor-hover.cur"), auto;
  }
  &:active {
    cursor: url("/icons/cursor-move.cur"), auto;
  }
}
.item-image {
  width: 3.375rem;
  height: 3.375rem;
}
.item-count {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border: 1px solid #4d4d4d;
  border-radius: 0.375rem 0 0 0;
  background-color: #262626;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 1rem;
  color: #fff;
  opacity: 0.4;
}
</style>
