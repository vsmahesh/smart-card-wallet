"use strict";
import { CardListComponentFactory } from "../components/card-list.js";
import { TagNames } from "../components/tagnames.js";
import { HealthCardStore } from "../libs/health-card-store.js";
((_) => {
  new CardListComponentFactory().register();
  document.addEventListener("DOMContentLoaded", () => {
    const cardListComponent = document.querySelector(TagNames.cardList);
    const cards = new HealthCardStore().getAll();
    cardListComponent.setCards(cards);
  });
})();
