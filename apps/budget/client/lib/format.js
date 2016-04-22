// Lifted from http://stackoverflow.com/a/149099
export function formatCurrency(raw) {
  const s = raw < 0 ? "-" : ""
  const i = parseInt(raw = Math.abs(+raw || 0).toFixed(2)) + ""
  let j = (j = i.length) > 3 ? j % 3 : 0
  return s + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") + (2 ? "." + Math.abs(raw - i).toFixed(2).slice(2) : "")
}
