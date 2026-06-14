export type ButtonStyle = "pill" | "rounded" | "sharp";

export function getButtonRadius(isBold: boolean, buttonStyle?: ButtonStyle): string {
  if (buttonStyle === "pill") return "rounded-full";
  if (buttonStyle === "rounded") return "rounded-xl";
  if (buttonStyle === "sharp") return "rounded-none";
  return isBold ? "rounded-none" : "rounded-full";
}

export function getInputRadius(isBold: boolean, buttonStyle?: ButtonStyle): string {
  if (buttonStyle === "pill") return "rounded-2xl";
  if (buttonStyle === "rounded") return "rounded-xl";
  if (buttonStyle === "sharp") return "rounded-none";
  return isBold ? "rounded-none" : "rounded-xl";
}
