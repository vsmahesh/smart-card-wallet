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
    if (cards.length > 0) {
      document.querySelector("#lnkDeleteAll").addEventListener("click", () => {
        if (confirm("Are you sure to clear all cards?")) {
          new HealthCardStore().clearAll();
          window.location.reload();
        }
      });
    } else {
      document.querySelector("#lnkDeleteAll").style.display = "none";
    }
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function () {
        console.log("Service worker registered!");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
})();
