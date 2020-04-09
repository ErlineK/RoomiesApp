export function getBackgroundByDue(dueDate) {
  let bgClass = "";

  const today = new Date();
  const diff = dueDate - today;

  // if due date is in 1 day or less
  if (diff < 1000 * 60 * 60 * 24 * 1) {
    bgClass = "due1";
  }
  //if due date is in 2 days
  else if (diff < 1000 * 60 * 60 * 24 * 2) {
    bgClass = "due2";
  }

  return bgClass;
}
