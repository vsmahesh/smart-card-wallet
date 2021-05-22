"use strict";
export const QRConstants = {
  QR_SHC_PROTOCOL: "shc:/",
};

export function QRScannerHelper(QRCodeLib) {
  function getCamera() {
    return new Promise((resolve, reject) => {
      QRCodeLib.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            resolve(devices[devices.length - 1]);
          }
          resolve(undefined);
        })
        .catch((err) => reject(err));
    });
  }

  function processQR(qrData) {
    if (qrData && qrData.startsWith(QRConstants.QR_SHC_PROTOCOL)) {
      return qrData
        .split(QRConstants.QR_SHC_PROTOCOL)[1]
        .match(/(..?)/g)
        .map((num) => String.fromCharCode(parseInt(num, 10) + 45))
        .join("");
    }
    throw new Error("Invalid QR Code");
  }
  return Object.freeze({ getCamera, processQR });
}
