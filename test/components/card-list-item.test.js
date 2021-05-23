import { CardListItemComponentFactory } from "../../src/js/components/card-list-item";
import { TagNames } from "../../src/js/components/tagnames";
import { TestDataGenerator } from "../helpers/test-data-helper";
describe("Card List Item", () => {
  beforeAll(() => {
    new CardListItemComponentFactory().register();
  });

  let component;

  beforeEach(() => {
    component = document.createElement(TagNames.cardListItem);
  });
  afterEach(() => {
    component = undefined;
  });
  test("can be created", () => {
    expect(component).toBeDefined();
  });

  describe("can be converted to a UI element", () => {
    new CardListItemComponentFactory().register();
    component = document.createElement(TagNames.cardListItem);

    const mockData = TestDataGenerator.generateCardData();

    component.setCard(mockData);

    const outerHtml = component.outerHTML;
    test("contains necessary css classes", () => {
      expect(outerHtml).toContain("card");
      expect(outerHtml).toContain("fluid");
    });
    test("contains the title", () => {
      expect(outerHtml).toContain(mockData.title);
    });
    test("contains created date", () => {
      expect(outerHtml).toContain(mockData.createdOn);
    });
    test("contains verified date", () => {
      expect(outerHtml).toContain(mockData.verifiedOn);
    });
  });
});
