export const categories = [
  "Beef", "Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous",
  "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"
];

export const areas = [
  "American", "British", "Canadian", "Chinese", "Croatian", "Dutch", "Egyptian",
  "Filipino", "French", "Greek", "Indian", "Irish", "Italian", "Jamaican",
  "Japanese", "Kenyan", "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese","Russian", "Spanish", "Thai", "Tunisian", "Turkish", "Ukrainian", "Unknown", "Vietnamese"
];
export const moodToCategoriesAndAreas = {
  comforting: {
    categories: ["Breakfast", "Pasta", "Dessert", "Side"],
    areas: ["American", "British", "Italian"]
  },
  healthy: {
    categories: ["Vegan", "Vegetarian", "Seafood"],
    areas: ["Greek", "Japanese", "Moroccan"]
  },
  exotic: {
    categories: ["Miscellaneous", "Goat", "Lamb"],
    areas: ["Thai", "Indian", "Mexican", "Turkish", "Tunisian", "Vietnamese"]
  }
};
