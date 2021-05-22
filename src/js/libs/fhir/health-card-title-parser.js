export const HealthCardTitleParser = Object.freeze({
  parse: (healthcard) => {
    let result = "Health";
    const types = healthcard?.vc?.type;
    if (types?.find((type) => type.endsWith("#immunization"))) {
      result = "Vaccination";
    } else if (types?.find((type) => type.endsWith("#laboratory"))) {
      result = "Laboratory";
    }

    return `${result} Card`;
  },
});
