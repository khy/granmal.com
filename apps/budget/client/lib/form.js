export function normalizeOptionalFormInput(raw) {
  (raw.length > 0) ? raw : undefined
}
