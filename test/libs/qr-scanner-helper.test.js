import { QRScannerHelper } from "../../src/js/libs/qr-scanner-helper";
import { TestDataGenerator } from "../helpers/test-data-helper";
import { StaticData } from "../helpers/static-data-helper";
describe("QR Scanner Helper", () => {
  describe("QR Code processor", () => {
    test("should throw error when the data recieved do not start with shc:/", () => {
      const qrData = TestDataGenerator.getFaker().internet.url;
      expect(() => QRScannerHelper.processQR(qrData)).toThrow();
    });
    test("should throw error when the data recieved is empty or undefined", () => {
      expect(() => QRScannerHelper.processQR("")).toThrow();
      expect(() => QRScannerHelper.processQR(undefined)).toThrow();
    });
    test("should convert a valid qr code to a jws", () => {
      const qrData = StaticData.QR;
      expect(QRScannerHelper.processQR(qrData)).toBe(StaticData.JWS);
    });
  });
});
