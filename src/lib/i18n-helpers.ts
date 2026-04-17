import type { Language } from "@/context/I18nContext";
import type { LocalizedString } from "@/types/gallery";

/** Resolve a LocalizedString (plain string or {tr,en}) to the active language. */
export function localized(value: LocalizedString | undefined, lang: Language): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? value.tr ?? "";
}
