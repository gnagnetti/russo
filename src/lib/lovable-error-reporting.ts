export function reportLovableError(error: unknown, info?: Record<string, unknown>): void {
  if (typeof console !== "undefined" && console.error) {
    console.error("[App Error Caught]", error, info);
  }
}
