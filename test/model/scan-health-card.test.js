import { HealthCardStore } from "../../src/js/libs/health-card-store";
import { ScanHealthCardViewModel } from "../../src/js/model/scan-health-card";
import { StaticData } from "../helpers/static-data-helper";

describe("ScanHealthCardViewModel", () => {
  describe.skip("should process a valid qr code", () => {
    HealthCardStore.clearAll();
    ScanHealthCardViewModel.processQR(StaticData.QR);
    test("add item to the card store", () => {
      expect(HealthCardStore.getAll().length).toBe(1);
    });
    test("parse qr code correctly", () => {
      expect(HealthCardStore.getAll()[0].data).toBe(StaticData.JWS);
    });
  });
});
