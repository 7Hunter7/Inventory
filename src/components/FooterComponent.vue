<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="search-box"></div>
      <button class="close-button" @click="$emit('close')">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
          />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.footer {
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  width: calc(100% - 4rem);
  padding: 18px;
  background: #262626;
  color: #fff;
  z-index: 1;
}
.footer-content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2.25rem;
}
.search-box {
  flex: 1;
  height: 2.25rem;
  border-radius: 12px;
  background: linear-gradient(90deg, #3c3c3c 0%, #444 51.04%, #333 100%);
}
.close-button {
  border: none;
  background: none;
  cursor: pointer;
}
</style>
