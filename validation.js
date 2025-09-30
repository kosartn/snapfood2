export function validateFood(name, desc, price) {
  if (!name || !desc || !price || isNaN(price)) {
    return false;
  }
  return true;
}
