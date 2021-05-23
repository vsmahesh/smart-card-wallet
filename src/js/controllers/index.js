"use strict";
import { HealthCardStore } from "../libs/health-card-store.js";
import { IndexView } from "../views/index.js";
((view, model) => {
  view.initialize();

  view.onDelete(() => {
    model.clearAll();
    window.location.reload();
  });

  view.onLoad(() => {
    const cards = model.getAll();
    view.setCard(cards);
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
})(IndexView, new HealthCardStore());
