<template>
  <div class="grid">
    <div class="grid-row" v-for="row in 5" :key="row">
      <div class="grid-cell" v-for="col in 5" :key="col" ref="gridCells"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const gridCells = ref([]);
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
