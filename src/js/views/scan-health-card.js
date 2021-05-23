let _scanCompleteCallback = undefined;
export const ScanHealthCardView = Object.freeze({
  initialize: () =>
    document.addEventListener("DOMContentLoaded", () => {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const camera = devices[devices.length - 1];
            const cameraId = camera.id;
            const html5QrCode = new Html5Qrcode("reader");
            const button = document.querySelector("#btnScan");
            button.addEventListener("click", (e) => {
              if (html5QrCode._isScanning) {
                stopScanning(e.target, html5QrCode);
              } else {
                startScanning(e.target, html5QrCode, cameraId);
              }
            });
            startScanning(button, html5QrCode, cameraId);
          }
          resolve(undefined);
        })
        .catch(() => {
          // Hide the scan button
          // Show text message
        });
    }),
  onScanComplete: (fn) => {
    _scanCompleteCallback = fn;
  },
});

function startScanning(button, html5QrCode, cameraId) {
  setButtonLabel(button, "data-stop-label");
  html5QrCode
    .start(cameraId, { fps: 10, qrbox: 250 }, (scannedQR) => {
      stopScanning(button, html5QrCode);
      if (_scanCompleteCallback) {
        _scanCompleteCallback(scannedQR);
      }
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
