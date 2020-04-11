export function formatDate(dateBase) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).format(dateBase);
}

export function formatDateOnly(dateBase) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: false
  }).format(dateBase);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currencyDisplay: "symbol",
    currency: "CAD"
  }).format(amount);
}
