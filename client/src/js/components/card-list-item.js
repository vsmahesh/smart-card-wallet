"use strict";

import { TagNames } from "./tagnames.js";

class CardListItemComponent extends HTMLElement {
  constructor() {
    super();
  }
  setCard(card) {
    const styles = ["card", "fluid"];
    this.classList.add(...styles);
    this.innerHTML = `<h5>${card.title}<small>Created On: ${card.createdOn}</small><small>Verified On: ${card.verifiedOn}</small></h5>`;
  }
}

export function CardListItemComponentFactory() {
  function register() {
    customElements.define(TagNames.cardListItem, CardListItemComponent);
  }
  return Object.freeze({ register });
}
