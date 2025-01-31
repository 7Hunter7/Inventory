<template>
  <div class="grid">
    <div class="grid-row" v-for="row in 5" :key="row">
      <div class="grid-cell" v-for="col in 5" :key="col"></div>
    </div>
  </div>
</template>

<style lang="scss">
.grid {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  .grid-row {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border-bottom: none;
    }
    .grid-cell {
      width: 100px;
      height: 100px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
