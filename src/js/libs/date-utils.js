"use strict";
export const DateUtils = Object.freeze({
  toLocaleDateTimeString: (date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
});
