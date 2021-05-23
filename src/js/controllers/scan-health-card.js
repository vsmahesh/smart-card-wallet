"use strict";
import { ContextStore } from "../libs/context-store.js";
import { ScanHealthCardView } from "../views/scan-health-card.js";
import { ScanHealthCardViewModel } from "../model/scan-health-card.js";
((view, model) => {
  view.initialize();
  view.onScanComplete((scannedQR) => {
    try {
      const healthCard = model.processQR(scannedQR);
      // Set the card as the context card and redirect
      new ContextStore().setCard(healthCard);
      window.location.href = "/health-card.html";
    } catch (error) {
      alert("Not a valid health card");
      window.location.reload();
    }
  });
})(ScanHealthCardView, ScanHealthCardViewModel);
