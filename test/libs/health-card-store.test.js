import { TestDataGenerator } from "../helpers/test-data-helper";
import { HealthCardStore } from "../../src/js/libs/health-card-store";
describe("Health Card Store", () => {
  describe("should support CRUD operations", () => {
    const mockData = TestDataGenerator.generateNCardData(3);

    test("store a new item", () => {
      expect(() => HealthCardStore.saveCard(mockData[0])).not.toThrow();
      const cards = HealthCardStore.getAll();
      expect(cards.length).toBe(1);
      expect(cards[0].id).toBeDefined();
      expect(cards[0].title).toBe(mockData[0].title);
      expect(cards[0].createdOn).toBe(mockData[0].createdOn);
      expect(cards[0].verifiedOn).toBe(mockData[0].verifiedOn);
    });

    test("update an existing item", () => {
      HealthCardStore.saveCard(mockData[1]);
      HealthCardStore.saveCard(mockData[2]);

      let cards = HealthCardStore.getAll();
      const numberOfCards = cards.length;
      const cardId = cards[0].id;
      const changedTitle = TestDataGenerator.getFaker().lorem.words(3);

      cards[0].title = changedTitle;

      // Update Card
      HealthCardStore.saveCard(cards[0]);

      cards = HealthCardStore.getAll();
      expect(cards.length).toBe(numberOfCards);
      const updatedCard = cards.find((c) => c.id == cardId);
      expect(updatedCard.title).toBe(changedTitle);
    });

    test("delete an existing item", () => {
      let cards = HealthCardStore.getAll();
      const numberOfCards = cards.length;
      const cardId = cards[0].id;

      HealthCardStore.deleteCard(cardId);
      cards = HealthCardStore.getAll();
      expect(cards.length).toBe(numberOfCards - 1);
      const deletedCard = cards.find((c) => c.id == cardId);
      expect(deletedCard).toBeUndefined();
    });

    test("delete should not fail when a nonexisting id provided", () => {
      let cards = HealthCardStore.getAll();
      const numberOfCards = cards.length;
      const cardId = TestDataGenerator.getFaker().lorem.words(1);

      expect(() => HealthCardStore.deleteCard(cardId)).not.toThrow();
      cards = HealthCardStore.getAll();
      expect(cards.length).toBe(numberOfCards);
    });
  });

  it("can delete all items in the store", () => {
    const mockData = TestDataGenerator.generateNCardData(3);
    HealthCardStore.saveCard(mockData[0]);

    HealthCardStore.clearAll();

    let cards = HealthCardStore.getAll();
    const numberOfCards = cards.length;

    expect(numberOfCards).toBe(0);
  });
});
