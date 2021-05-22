"use strict";
import { DateUtils } from "../libs/date-utils.js";
import { QRScannerHelper } from "../libs/qr-scanner-helper.js";
import { HealthCardModel } from "../models/health-card-model.js";
import { HealthCardStore } from "../libs/health-card-store.js";
import { ContextStore } from "../libs/context-store.js";
import { HealthCardTitleParser } from "../libs/fhir/health-card-title-parser.js";
import { JWSHelper } from "../libs/jws-helper.js";
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
    setButtonLabel(button, "data-stop-label");
    html5QrCode
      .start(cameraId, { fps: 10, qrbox: 250 }, (scannedQR) => {
        stopScanning(button, html5QrCode);
        setTimeout(() => {
          try {
            const scannedJWS = qrScannerHelper.processQR(scannedQR);

            const jwsHelper = new JWSHelper();
            const decoded = jwsHelper.decode(scannedJWS).payload;

            const healthCard = new HealthCardModel(
              scannedJWS,
              HealthCardTitleParser.parse(decoded),
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
    setButtonLabel(button, "data-start-label");
    html5QrCode.stop().then((_) => {
      console.log("Scanning stoped");
      html5QrCode.clear();
    });
  }

  function setButtonLabel(button, attributeName) {
    button.innerText = button.attributes[attributeName].value;
  }
})();
