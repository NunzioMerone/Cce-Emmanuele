/** Parse YouTube ISO 8601 durations; missing or malformed values have no duration. */
export function durationSeconds(iso) {
  if (typeof iso !== 'string') return null;
  const parts = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(iso);
  if (!parts || !parts.slice(1).some(Boolean) || iso.endsWith('T')) return null;
  const seconds = Number(parts[1] || 0) * 86400 + Number(parts[2] || 0) * 3600 + Number(parts[3] || 0) * 60 + Number(parts[4] || 0);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
}

/** Upper bound is inclusive: exactly 20 minutes belongs to 0–20, 20:01 to 20–30. */
export function durationRangeId(iso) {
  const seconds = durationSeconds(iso);
  if (seconds === null) return '';
  const upper = seconds <= 1200 ? 20 : Math.ceil(seconds / 600) * 10;
  return `${upper === 20 ? 0 : upper - 10}-${upper}`;
}

export function durationLabel(iso) {
  const total = durationSeconds(iso);
  if (total === null) return '';
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor(total / 60) % 60;
  const seconds = Math.floor(total % 60);
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : `${minutes}:${String(seconds).padStart(2, '0')}`;
}
