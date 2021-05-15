import { TagNames } from "./tagnames.js";
export const QRCodeComponentFactory = Object.freeze({
  register: () => customElements.define(TagNames.qrCode, QRCodeComponent),
});

class QRCodeComponent extends HTMLElement {
  constructor() {
    super();
  }

  setData(data) {
    const numericJws = data
      .split("")
      .map((c) => c.charCodeAt(0) - 45)
      .flatMap((c) => [Math.floor(c / 10), c % 10])
      .join("");

    const segments = [
      { data: "shc:/", mode: "byte" },
      { data: numericJws, mode: "numeric" },
    ];

    QRCode.toDataURL(segments, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const qrCode = document.createElement("img");
      qrCode.src = url;
      this.appendChild(qrCode);
    });
  }
}
