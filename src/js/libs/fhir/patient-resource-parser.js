export const PatientResourceParser = {
  parse: (patientResource) => {
    const uiMapping = [
      { elementId: "surName", path: "resource/name/0/family" },
      {
        elementId: "givenName",
        path: "resource/name/0/given",
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
