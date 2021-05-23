import { CardListComponentFactory } from "../../src/js/components/card-list";
import { TagNames } from "../../src/js/components/tagnames";
describe("CardListComponent", () => {
  let component;
  beforeAll(() => {
    CardListComponentFactory.register();
  });

  beforeEach(() => {
    component = document.createElement(TagNames.cardList);
    return;
  });

  afterEach(() => {
    component = undefined;
  });

  test("can be created", () => {
    expect(component).toBeDefined();
  });

  test("should throw error when 'cards' is not defined", () => {
    expect(() => component.setCards(undefined)).toThrow();
  });

  test("should populate ui for each card item", () => {
    const cards = [{}, {}];
    component.setCards(cards);
    expect(component.children.length).toBe(2);
  });
});
