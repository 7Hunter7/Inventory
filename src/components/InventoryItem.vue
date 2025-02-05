<template>
  <div
    class="item-wrapper"
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
    <img :src="item.image" :alt="item.name" style="width: 54px; height: 54px" />
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
import { defineProps, defineEmits, ref, onMounted, watchEffect } from "vue";
import { useInventoryStore } from "../stores/store.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["dragstart", "click"]);
const inventoryStore = useInventoryStore();
const dragImage = ref(null);

onMounted(() => {
  if (dragImage.value) {
    Object.assign(dragImage.value.style, {
      border: "1px solid #4d4d4d",
      borderRadius: "24px",
      width: "105px",
      height: "100px",
      background: "#262626",
      position: "absolute",
      top: "-1000px",
      left: "-1000px",
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
  document.body.classList.add("dragging");

  // Установка src после добавления в DOM
  document.body.appendChild(img);
  const dragImageImg = img.querySelector("img");
  if (dragImageImg) {
    dragImageImg.src = inventoryStore.draggedItem.image;
  }

  // Установика изображение перетаскивания
  event.dataTransfer.setDragImage(img, 50, 50); // Положение
  event.dataTransfer.setData("text/plain", JSON.stringify(props.item));

  // Скрытие модальных окна
  inventoryStore.closeItemModal();
  inventoryStore.closeQuantityModal();

  emit("dragstart", event);
};

document.addEventListener("dragend", () => {
  document.body.classList.remove("dragging");
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
  &:hover {
    background: #2f2f2f;
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
  background: #262626;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 1rem;
  color: #fff;
  opacity: 0.4;
}
</style>
