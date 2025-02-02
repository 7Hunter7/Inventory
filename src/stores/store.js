import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    items: [
      { id: 1, quantity: 4, x: 0, y: 0, image: "/Element_1.png" },
      { id: 2, quantity: 2, x: 1, y: 0, image: "/Element_2.png" },
      { id: 3, quantity: 5, x: 2, y: 0, image: "/Element_3.png" },
    ],
    selectedItem: null,
    isItemModalOpen: false,
    isQuantityModalOpen: false,
    draggedItem: null,
    hoveredCell: null,
    removeItemQuantity: null,
  }),

  actions: {
    updateItem(id, newQuantity) {
      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        this.items[itemIndex].quantity = newQuantity;
        if (newQuantity === 0) {
          this.items.splice(itemIndex, 1);
        }
      }
    },
    removeItem(id, quantityToRemove) {
      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const currentQuantity = this.items[itemIndex].quantity;
        const newQuantity = Math.max(0, currentQuantity - quantityToRemove);
        this.items[itemIndex].quantity = newQuantity;
        if (newQuantity === 0) {
          this.items.splice(itemIndex, 1);
        }
      }
    },
    moveItem(itemId, newX, newY) {
      const itemIndex = this.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        this.items[itemIndex].x = newX;
        this.items[itemIndex].y = newY;
      }
    },
    setSelectedItem(item) {
      this.selectedItem = item;
    },
    openItemModal() {
      this.isItemModalOpen = true;
    },
    closeItemModal() {
      this.isItemModalOpen = false;
      this.selectedItem = null;
    },
    openQuantityModall() {
      this.isQuantityModalOpen = true;
    },
    closeQuantityModal() {
      this.isQuantityModalOpen = false;
      this.selectedItem = null;
    },
  },

  persist: {
    enabled: true,
  },
});
