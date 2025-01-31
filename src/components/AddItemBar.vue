<template>
  <div class="add-item-bar">
    <input type="number" v-model.number="itemCount" placeholder="Кол-во" />
    <button @click="addItem">Добавить предмет</button>
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/stores/store";
import { ref } from "vue";

const store = useInventoryStore();
const itemCount = ref(1);

const addItem = () => {
  store.addItem({ x: 0, y: 0, count: itemCount.value });
};
</script>

<style lang="scss">
.add-item-bar {
  display: flex;
  justify-content: center;
  input {
    margin-right: 10px;
  }
}
</style>
