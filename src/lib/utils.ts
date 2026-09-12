import { clsx, type ClassValue } from "./clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
