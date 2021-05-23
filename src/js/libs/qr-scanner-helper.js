"use strict";
export const QRConstants = {
  QR_SHC_PROTOCOL: "shc:/",
};

export const QRScannerHelper = Object.freeze({
  processQR: (qrData) => {
    if (qrData && qrData.startsWith(QRConstants.QR_SHC_PROTOCOL)) {
      return qrData
        .split(QRConstants.QR_SHC_PROTOCOL)[1]
        .match(/(..?)/g)
        .map((num) => String.fromCharCode(parseInt(num, 10) + 45))
        .join("");
    }
    throw new Error("Invalid QR Code");
  },
});
