<template>
  <div class="inventory">
    <Grid />
    <InventoryItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import Grid from "./Grid.vue";
import InventoryItem from "./InventoryItem.vue";
import { useInventoryStore } from "@/stores/store";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useInventoryStore();
const { items } = storeToRefs(store);

const gridCells = ref([]);
onMounted(() => {
  console.log(gridCells.value);
});
</script>

<style lang="scss">
.inventory {
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
}
</style>
