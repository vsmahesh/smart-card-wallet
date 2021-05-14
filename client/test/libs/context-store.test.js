import { ContextStore } from "../../src/js/libs/context-store";
import { TestDataGenerator } from "../helpers/test-data-helper";
describe("Context Storage", () => {
  let contextStore;
  beforeEach(() => {
    contextStore = new ContextStore();
  });
  afterEach(() => {
    contextStore = undefined;
  });

  test("can be created", () => {
    expect(new ContextStore()).toBeDefined();
  });
  test("should have a method to get card from context", () => {
    expect(contextStore.getCard).toBeDefined();
  });
  test("should have a method to set a card into the context", () => {
    expect(contextStore.setCard).toBeDefined();
  });
  test("setCard method should set the context card", () => {
    const card = new TestDataGenerator().generateCardData(true);
    contextStore.setCard(card);
    const cardInContext = contextStore.getCard();
    expect(cardInContext.title).toBe(card.title);
    expect(cardInContext.createdOn).toBe(card.createdOn);
    expect(cardInContext.id).toBe(card.id);
  });
});
