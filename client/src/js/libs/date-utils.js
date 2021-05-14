"use strict";
export function DateUtils() {
  function toLocaleDateTimeString(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
  return Object.freeze({ toLocaleDateTimeString });
}
