import { DateUtils } from "../libs/date-utils.js";
import { HealthCardTitleParser } from "../libs/fhir/health-card-title-parser.js";
import { HealthCardModel } from "../libs/health-card-model.js";
import { HealthCardStore } from "../libs/health-card-store.js";
import { JWSHelper } from "../libs/jws-helper.js";
import { QRScannerHelper } from "../libs/qr-scanner-helper.js";

export const ScanHealthCardViewModel = Object.freeze({
  processQR: (scannedQR) => {
    const scannedJWS = QRScannerHelper.processQR(scannedQR);

    const jwsHelper = new JWSHelper();
    const decoded = jwsHelper.decode(scannedJWS).payload;

    const healthCard = new HealthCardModel(
      scannedJWS,
      HealthCardTitleParser.parse(decoded),
      DateUtils.toLocaleDateTimeString(new Date()),
      undefined,
      Date.now()
    );
    // Save the card into the store
    HealthCardStore.saveCard(healthCard);
    return healthCard;
  },
});
