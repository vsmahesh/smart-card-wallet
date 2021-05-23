import { CardListComponentFactory } from "../components/card-list.js";
import { TagNames } from "../components/tagnames.js";

export const IndexView = Object.freeze({
  setCard: (cards) => {
    const component = document.querySelector(TagNames.cardList);
    component.setCards(cards);

    if (cards.length > 0) {
    } else {
      document.querySelector("#lnkDeleteAll").style.display = "none";
    }
  },
  onDelete: (fn) =>
    document.querySelector("#lnkDeleteAll").addEventListener("click", () => {
      if (confirm("Are you sure to clear all cards?")) {
        fn();
      }
    }),
  initialize: () => {
    CardListComponentFactory.register();
  },
  onLoad: (fn) => document.addEventListener("DOMContentLoaded", () => fn()),
});
