import { TestDataGenerator } from "../helpers/test-data-helper";
import { HealthCardStore } from "../../src/js/libs/health-card-store";
describe("Health Card Store", () => {
  test("can be created", () => {
    expect(new HealthCardStore()).toBeDefined();
  });

  describe("should support CRUD operations", () => {
    const store = new HealthCardStore();

    const dataGenerator = new TestDataGenerator();
    const mockData = dataGenerator.generateNCardData(3);

    test("store a new item", () => {
      expect(() => store.saveCard(mockData[0])).not.toThrow();
      const cards = store.getAll();
      expect(cards.length).toBe(1);
      expect(cards[0].id).toBeDefined();
      expect(cards[0].title).toBe(mockData[0].title);
      expect(cards[0].createdOn).toBe(mockData[0].createdOn);
      expect(cards[0].verifiedOn).toBe(mockData[0].verifiedOn);
    });

    test("update an existing item", () => {
      store.saveCard(mockData[1]);
      store.saveCard(mockData[2]);

      let cards = store.getAll();
      const numberOfCards = cards.length;
      const cardId = cards[0].id;
      const changedTitle = dataGenerator.getFaker().lorem.words(3);

      cards[0].title = changedTitle;

      // Update Card
      store.saveCard(cards[0]);

      cards = store.getAll();
      expect(cards.length).toBe(numberOfCards);
      const updatedCard = cards.find((c) => c.id == cardId);
      expect(updatedCard.title).toBe(changedTitle);
    });

    test("delete an existing item", () => {
      let cards = store.getAll();
      const numberOfCards = cards.length;
      const cardId = cards[0].id;

      store.deleteCard(cardId);
      cards = store.getAll();
      expect(cards.length).toBe(numberOfCards - 1);
      const deletedCard = cards.find((c) => c.id == cardId);
      expect(deletedCard).toBeUndefined();
    });

    test("delete should not fail when a nonexisting id provided", () => {
      let cards = store.getAll();
      const numberOfCards = cards.length;
      const cardId = dataGenerator.getFaker().lorem.words(1);

      expect(() => store.deleteCard(cardId)).not.toThrow();
      cards = store.getAll();
      expect(cards.length).toBe(numberOfCards);
    });
  });

  it("can delete all items in the store", () => {
    const store = new HealthCardStore();

    const dataGenerator = new TestDataGenerator();
    const mockData = dataGenerator.generateNCardData(3);
    store.saveCard(mockData[0]);

    store.clearAll();

    let cards = store.getAll();
    const numberOfCards = cards.length;

    expect(numberOfCards).toBe(0);
  });
});
