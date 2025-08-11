import {
  getPattern,
  lowercase,
  number,
  patternCustom,
  uppercase,
} from "./limiter";

export function isEmail(v: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedChars = getPattern(
    lowercase,
    uppercase,
    number,
    patternCustom([".", "_", "@", "-"])
  );
  const value = v.replace(allowedChars, "");

  return {
    valid: pattern.test(value),
    value,
  };
}

export function isPhone(v: string) {
  const pattern = /^1[3-9]\d{9}$/;
  const allowedChars = getPattern(number);
  const value = v.replace(allowedChars, "");

  return {
    valid: pattern.test(value),
    value,
  };
}

export function isKana(v: string) {
  const pattern = /^[A-Za-z\u30A0-\u30FF\u30FC]+$/u;
  const allowedChars = /[^A-Za-z\u30A0-\u30FF\u30FC]/u;
  const value = v.replace(allowedChars, "");

  return {
    valid: pattern.test(value),
    value,
  };
}

export function isLetter(v: string) {
  const pattern = /^[A-Za-z]+$/;
  const allowedChars = getPattern(lowercase, uppercase);
  const value = v.replace(allowedChars, "");

  return {
    valid: pattern.test(value),
    value,
  };
}

export function isNumber(v: string) {
  const pattern = /^[0-9]+$/;
  const allowedChars = getPattern(number);
  const value = v.replace(allowedChars, "");

  return {
    valid: pattern.test(value),
    value,
  };
}
