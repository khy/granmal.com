export function normalizeOptionalFormInput(raw) {
  return (raw.length > 0) ? raw : undefined
}
