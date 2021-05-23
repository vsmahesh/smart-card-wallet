"use strict";
const STOREKEY = "HEALTHCARDSTORE";
export const HealthCardStore = Object.freeze({
  getAll: () => {
    return JSON.parse(localStorage.getItem(STOREKEY)) || [];
  },
  saveCard: (card) => {
    if (!card.id) {
      card.id = Date.now();
    }

    let storeItems = HealthCardStore.getAll();
    let index = storeItems.findIndex((c) => c.id == card.id);

    if (index >= 0) {
      storeItems.splice(index, 1, card);
    } else {
      storeItems.push(card);
    }
    saveCardStore(storeItems);
  },
  deleteCard: (cardId) => {
    let storeItems = HealthCardStore.getAll();
    let index = storeItems.findIndex((c) => c.id == cardId);
    if (index >= 0) {
      storeItems.splice(index, 1);
      saveCardStore(storeItems);
    }
  },

  clearAll: () => {
    saveCardStore([]);
  },
});

function saveCardStore(storeItems) {
  localStorage.setItem(STOREKEY, JSON.stringify(storeItems));
}
