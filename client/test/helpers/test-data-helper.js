import * as faker from "faker";
import { DateUtils } from "../../src/js/libs/date-utils";
import { HealthCardModel } from "../../src/js/models/health-card-model";
export function TestDataGenerator() {
  function generateCardData(populateId) {
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
  }

  function generateNCardData(n) {
    const result = [];
    for (var i = 0; i < n; i++) {
      result.push(generateCardData());
    }

    return result;
  }
  function getFaker() {
    return faker;
  }

  return Object.freeze({ generateCardData, generateNCardData, getFaker });
}
