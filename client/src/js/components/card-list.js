"use strict";
import { CardListItemComponentFactory } from "./card-list-item.js";
import { TagNames } from "./tagnames.js";

class CardListComponent extends HTMLElement {
  constructor() {
    super();
    new CardListItemComponentFactory().register();
  }

  setCards(cards) {
    cards.map((card) => {
      const element = document.createElement(TagNames.cardListItem);
      element.setCard(card);
      this.appendChild(element);
    });
  }
}

export function CardListComponentFactory() {
  function register() {
    customElements.define(TagNames.cardList, CardListComponent);
  }
  return Object.freeze({ register });
}
