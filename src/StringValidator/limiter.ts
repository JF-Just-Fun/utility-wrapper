export const lowercase = "a-z";
export const uppercase = "A-Z";
export const number = "0-9";
export const patternPunctuation = ".,!?;:";
export const patternMath = "+\\-*/=<>^%";
export const patternCurrencySymbol = "$€£¥₹";
export const patternSpecial = "@#&*()_~`";
export const patternCustom = (arr: string[]) => arr.join("");

export function getPattern(...arr: string[]) {
  return RegExp(`[^${arr.join()}]`, "g");
}
