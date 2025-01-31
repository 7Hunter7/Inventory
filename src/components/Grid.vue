<template>
  <div class="grid">
    <div class="grid-row" v-for="row in 5" :key="row">
      <div
        class="grid-cell"
        v-for="(col, index) in 5"
        :key="index"
        ref="gridCells"
      >
        <span class="item-count" v-if="itemsCount[index] > 0">{{
          itemsCount[index]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useInventoryStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useInventoryStore();
const { items } = storeToRefs(store);
const gridCells = ref([]);
const itemsCount = computed(() => {
  const count = new Array(25).fill(0); // 5x5 grid
  items.value.forEach((item) => {
    const index = item.y * 5 + item.x;
    count[index]++;
  });
  return count;
});
</script>

<style lang="scss">
.grid {
  display: flex;
  flex-direction: column;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  width: 525px;
  height: 500px;
  background: #262626;
  .grid-row {
    display: flex;
    border-bottom: 1px solid #4d4d4d;
    width: 100%;
    height: 100px;
    &:last-child {
      border-bottom: none;
    }
    .grid-cell {
      width: 105px;
      height: 100px;
      border-right: 1px solid #4d4d4d;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
