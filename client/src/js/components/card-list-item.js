"use strict";

import { TagNames } from "./tagnames.js";
import { ContextStore } from "../libs/context-store.js";

class CardListItemComponent extends HTMLElement {
  constructor() {
    super();
  }
  setCard(card) {
    const styles = ["card", "fluid"];
    this.classList.add(...styles);
    this.innerHTML = `<h5>${card.title}<small>Created On: ${card.createdOn}</small><small>Verified On: ${card.verifiedOn}</small></h5>`;
    this.addEventListener("click", () => {
      new ContextStore().setCard(card);
      window.location.href = "/health-card.html";
    });
  }
}

export function CardListItemComponentFactory() {
  function register() {
    customElements.define(TagNames.cardListItem, CardListItemComponent);
  }
  return Object.freeze({ register });
}
