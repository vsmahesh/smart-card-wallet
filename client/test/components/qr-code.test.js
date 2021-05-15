import { QRCodeComponentFactory } from "../../src/js/components/qr-code";
import { TagNames } from "../../src/js/components/tagnames";
import { StaticData } from "../helpers/static-data-helper";
describe("QR Code Component", () => {
  beforeAll(() => {
    QRCodeComponentFactory.register();
  });
  it("populates image when data set", () => {
    const component = document.createElement(TagNames.qrCode);
    component.setData(StaticData.JWS);
    const html = component.outerHTML;
    expect(html).toContain("<img");
  });
});
