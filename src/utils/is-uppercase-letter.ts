/**
 * Check if provided string (character) is uppercased alphabetic value
 * @param str character
 * @returns boolean: true | false
 */
export default function isUppercaseLetter(str: string) {
  return Boolean(str.match(/[A-Z]/));
}
