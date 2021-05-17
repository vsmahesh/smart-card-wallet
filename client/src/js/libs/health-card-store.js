"use strict";
export function HealthCardStore() {
  const STOREKEY = "HEALTHCARDSTORE";
  function saveCard(card) {
    if (!card.id) {
      card.id = Date.now();
    }

    let storeItems = getAll();
    let index = storeItems.findIndex((c) => c.id == card.id);

    if (index >= 0) {
      storeItems.splice(index, 1, card);
    } else {
      storeItems.push(card);
    }
    saveCardStore(storeItems);
  }

  function saveCardStore(storeItems) {
    localStorage.setItem(STOREKEY, JSON.stringify(storeItems));
  }
  function getAll() {
    return JSON.parse(localStorage.getItem(STOREKEY)) || [];
  }

  function deleteCard(cardId) {
    let storeItems = getAll();
    let index = storeItems.findIndex((c) => c.id == cardId);
    if (index >= 0) {
      storeItems.splice(index, 1);
      saveCardStore(storeItems);
    }
  }

  function clearAll() {
    saveCardStore([]);
  }
  return Object.freeze({ saveCard, getAll, deleteCard, clearAll });
}
