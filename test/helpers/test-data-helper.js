import * as faker from "faker";
import { DateUtils } from "../../src/js/libs/date-utils";
import { HealthCardModel } from "../../src/js/models/health-card-model";

export const TestDataGenerator = Object.freeze({
  generateCardData: (populateId) => {
    const fake = {
      recent: faker.date.recent(),
      past: faker.date.past(),
      title: faker.lorem.words(2),
    };

    const dateUtils = new DateUtils();
    const card = new HealthCardModel(
      undefined,
      fake.title,
      dateUtils.toLocaleDateTimeString(fake.past),
      dateUtils.toLocaleDateTimeString(fake.recent)
    );

    if (populateId) {
      card.id = Date.now();
    }
    return card;
  },
  generateNCardData: (n) =>
    Array.from({ length: n || faker.datatype.number(10) }, () =>
      TestDataGenerator.generateCardData(true)
    ),
  getFaker: () => faker,
});
