import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from "./constants.js";

/**
 * Formats a number or string to ensure it has two digits, padding with leading zero if necessary.
 *
 * @param {number|string} value - The value to format
 * @returns {string} A two-digit string representation of the input value
 */
const formatTime = (value) => {
  return String(value).padStart(2, "0");
};

/**
 * Validates whether a given time string is in the correct HH:MM:SS format.
 *
 * @param {string} time - The time string to validate
 * @returns {boolean} True if the time string matches the HH:MM:SS format, false otherwise
 */
const validateTime = (time) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(time);
};

/**
 * Converts a time string in the format "HH:MM:SS" to total seconds.
 *
 * @param {string} time - A time string in the format "HH:MM:SS"
 * @returns {number} The total number of seconds represented by the time string
 */
const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;
};

export { formatTime, validateTime, timeToSeconds };
