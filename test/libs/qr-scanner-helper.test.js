import { QRScannerHelper } from "../../src/js/libs/qr-scanner-helper";
import { TestDataGenerator } from "../helpers/test-data-helper";
import { StaticData } from "../helpers/static-data-helper";
describe("QR Scanner Helper", () => {
  const noCamera = jest.fn(() => new Promise((resolve) => resolve(undefined)));
  const singleCamera = jest.fn(() => new Promise((resolve) => resolve([{}])));
  const multipleCamera = jest.fn(
    () => new Promise((resolve) => resolve([{ id: 1 }, { id: 2 }]))
  );

  test("can be created", () => {
    expect(
      new QRScannerHelper({ getCameras: noCamera }, "reader")
    ).toBeDefined();
  });

  describe("getCamera method", () => {
    test("return undefind when no camera available", () => {
      const helper = new QRScannerHelper({ getCameras: noCamera });
      helper
        .getCamera()
        .then((camera) => expect(camera).toBeUndefined())
        .catch((err) => undefined);
    });

    test("return the camera when available", () => {
      const helper = new QRScannerHelper({ getCameras: singleCamera });
      helper
        .getCamera()
        .then((camera) => expect(camera).toBeDefined())
        .catch((err) => undefined);
    });

    test("return the last camera when multiple cameras available", () => {
      const helper = new QRScannerHelper({ getCameras: multipleCamera });
      const camera = helper
        .getCamera()
        .then((camera) => {
          expect(camera).toBeDefined();
          expect(camera.id).toBe(2);
        })
        .catch((err) => undefined);
    });
  });

  describe("QR Code processor", () => {
    test("there should be a method to process QR", () => {
      const helper = new QRScannerHelper({ getCameras: noCamera });
      expect(helper.processQR).toBeDefined();
    });
    test("should throw error when the data recieved do not start with shc:/", () => {
      const helper = new QRScannerHelper({ getCameras: noCamera });
      const qrData = TestDataGenerator.getFaker().internet.url;
      expect(() => helper.processQR(qrData)).toThrow();
    });
    test("should throw error when the data recieved is empty or undefined", () => {
      const helper = new QRScannerHelper({ getCameras: noCamera });

      expect(() => helper.processQR("")).toThrow();
      expect(() => helper.processQR(undefined)).toThrow();
    });
    test("should convert a valid qr code to a jws", () => {
      const helper = new QRScannerHelper({ getCameras: noCamera });
      const qrData = StaticData.QR;
      expect(helper.processQR(qrData)).toBe(StaticData.JWS);
    });
  });
});
