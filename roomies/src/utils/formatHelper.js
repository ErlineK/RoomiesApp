export function formatDate(dateBase) {
  try {
    const iDate = new Date(dateBase);
    return new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).format(dateBase);
  } catch (err) {
    return "";
  }
}

export function formatDateOnly(dateBase) {
  try {
    const iDate = new Date(dateBase);
    return new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12: false
    }).format(iDate);
  } catch (err) {
    return "";
  }
}

export function formatDayMonth(dateBase) {
  try {
    const iDate = new Date(dateBase);
    return new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "numeric"
    }).format(iDate);
  } catch (err) {
    return "";
  }
}

export function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currencyDisplay: "symbol",
      currency: "CAD"
    }).format(amount);
  } catch (err) {
    return "";
  }
}
