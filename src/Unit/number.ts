export const numberWithCommas = (n: number | string) => {
  const num = typeof n === "number" ? n : parseFloat(n);

  if (isNaN(num)) {
    return "0";
  }

  return num.toLocaleString("en-US");
};

export const decimalToPercentage = (value: number, decimal = 2) => {
  if (typeof value !== "number") return "0%";
  if (isNaN(value)) return "0%";

  const percentage = value * 100;
  const formatted = percentage.toFixed(decimal);

  const result = parseFloat(formatted);

  return `${result}%`;
};

export const bitsToReadable = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let unitIndex = 0;

  if (size <= 0) {
    return "0B";
  }

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formattedValue = parseFloat(size.toFixed(2));

  return `${formattedValue}${units[unitIndex]}`;
};

export const timeToReadable = (seconds: number) => {
  if (typeof seconds !== "number" || seconds < 0) return "0";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
