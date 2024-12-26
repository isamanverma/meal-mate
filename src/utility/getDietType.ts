export function getDietType(vegetarian?: boolean, vegan?: boolean): string {
  if (vegan) {
    return "Vegan";
  } else if (vegetarian) {
    return "Veg";
  } else {
    return "Non-Veg";
  }
}
