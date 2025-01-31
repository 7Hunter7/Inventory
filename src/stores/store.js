import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    items: [],
    selectedItem: null,
    isModalOpen: false,
    nextItemId: 1,
  }),

  actions: {
    addItem(item) {
      item.id = this.nextItemId;
      this.nextItemId++;
      this.items.push(item);
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    updateItemPosition(id, x, y) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.x = x;
        item.y = y;
      }
    },
    updateItemCount(id, count) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.count = count;
      }
    },
    setSelectedItem(item) {
      this.selectedItem = item;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    },
  },

  persist: {
    enabled: true,
  },
});
