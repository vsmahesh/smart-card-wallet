import { CardListComponentFactory } from "../../src/js/components/card-list";
import { TagNames } from "../../src/js/components/tagnames";
import { IndexView } from "../../src/js/views/index";
import { TestDataGenerator } from "../helpers/test-data-helper";

describe("Index View", () => {
  CardListComponentFactory.register();
  const element = document.createElement(TagNames.cardList);
  document.body.appendChild(element);

  const lnkDelete = document.createElement("a");
  lnkDelete.id = "lnkDeleteAll";
  document.body.appendChild(lnkDelete);

  const cards = TestDataGenerator.generateNCardData();
  IndexView.setCard(cards);

  it("should set the card property of the card list component", () => {
    expect(element.children.length).toBe(cards.length);
  });
  it("should make the delete all link visible when there are cards", () => {
    expect(lnkDelete.style.display).not.toBe("none");
  });
});
