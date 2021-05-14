"use strict";
import { DateUtils } from "../libs/date-utils.js";
import { QRScannerHelper } from "../libs/qr-scanner-helper.js";
import { HealthCardModel } from "../models/health-card-model.js";
import { HealthCardStore } from "../libs/health-card-store.js";
import { ContextStore } from "../libs/context-store.js";

((_) => {
  document.addEventListener("DOMContentLoaded", () => {
    const qrScannerHelper = new QRScannerHelper(Html5Qrcode);
    qrScannerHelper
      .getCamera()
      .then((camera) => {
        const cameraId = camera.id;
        const html5QrCode = new Html5Qrcode("reader");
        document.querySelector("#btnScan").addEventListener("click", (e) => {
          if (html5QrCode._isScanning) {
            stopScanning(e.target, html5QrCode);
          } else {
            startScanning(e.target, html5QrCode, cameraId, qrScannerHelper);
          }
        });
      })
      .catch(() => {
        // Hide the scan button
        // Show text message
      });
  });

  function startScanning(button, html5QrCode, cameraId, qrScannerHelper) {
    commonActions(button, "data-stop-label");
    html5QrCode
      .start(cameraId, { fps: 10, qrbox: 250 }, (scannedQR) => {
        stopQRScanner(html5QrCode);
        setTimeout(() => {
          try {
            const scannedJWS = qrScannerHelper.processQR(scannedQR);
            const healthCard = new HealthCardModel(
              scannedJWS,
              "Health Card",
              new DateUtils().toLocaleDateTimeString(new Date()),
              undefined,
              Date.now()
            );
            // Save the card into the store
            new HealthCardStore().saveCard(healthCard);
            // Set the card as the context card
            new ContextStore().setCard(healthCard);
            // Redirect to the health card page
            window.location.href = "/health-card.html";
          } catch (error) {
            alert("Not a valid health card");
            window.location.reload();
          }
        }, 10);
      })
      .catch((err) => {
        // ignore
      });
  }

  function stopScanning(button, html5QrCode) {
    commonActions(button, "data-start-label");
    stopQRScanner(html5QrCode);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  function stopQRScanner(html5QrCode) {
    html5QrCode.stop().then((_) => {
      console.log("Scanning stoped");
    });
  }

  function commonActions(button, attributeName) {
    button.innerText = button.attributes[attributeName].value;
  }
})();
