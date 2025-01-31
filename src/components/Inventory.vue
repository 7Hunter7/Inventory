<template>
  <div class="inventory">
    <Grid />
    <InventoryItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import InventoryItem from "./InventoryItem.vue";
import Grid from "./Grid.vue";
import { useInventoryStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useInventoryStore();
const { items } = storeToRefs(store);
</script>

<style lang="scss">
.inventory {
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
}
</style>
