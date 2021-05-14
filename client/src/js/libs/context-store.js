"use strict";
export function ContextStore() {
  const STORAGE_KEY = "CONTEXT_CARD";
  function getCard() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || undefined;
  }
  function setCard(card) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
  }
  return Object.freeze({ getCard, setCard });
}
