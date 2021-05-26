const JSONPATH = {
  surName: "resource/name/0/family",
  givenName: "resource/name/0/given",
};
export const PatientResourceParser = {
  parse: (patientResource) => {
    const uiMapping = [
      { elementId: "surName", path: JSONPATH.surName },
      {
        elementId: "givenName",
        path: JSONPATH.givenName,
        fn: (value) => value?.join(" ") || "",
      },
      { elementId: "dob", path: "resource/birthDate" },
      {
        elementId: "sex",
        path: "resource/gender",
        fn: (value) => {
          if (value) {
            return ["male", "m"].includes(value.toLowerCase()) ? "M" : "F";
          }
          return "";
        },
      },
    ];
    const result = {};
    uiMapping.map((mapping) => {
      const data = getDataByPath(patientResource, mapping.path);
      result[mapping.elementId] = mapping.fn
        ? mapping.fn.call(null, data)
        : data;
    });
    return result;
  },
  getName: (patientResource) => {
    const surName = getDataByPath(patientResource, JSONPATH.surName);
    const givenName = getDataByPath(patientResource, JSONPATH.givenName);

    if (givenName) {
      return `${givenName.join(" ")} ${surName}`;
    }
    return surName;
  },
};

function getDataByPath(data, path) {
  if (!path) {
    return data;
  }
  path = path.split("/");
  for (const p in path) {
    if (!path[p]) {
      continue;
    }
    data = data[path[p]];
    if (!data) {
      return data;
    }
  }
  return data;
}
