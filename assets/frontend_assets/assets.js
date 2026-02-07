const basePath = "./assets/frontend_assets/";

// Food Categories
const categories = [
  { id: 1, name: "All", icon: basePath + "add_icon_white.png" },
  { id: 2, name: "Salad", icon: basePath + "menu_1.png" },
  { id: 3, name: "Rolls", icon: basePath + "menu_2.png" },
  { id: 4, name: "Deserts", icon: basePath + "menu_3.png" },
  { id: 5, name: "Sandwich", icon: basePath + "menu_4.png" },
  { id: 6, name: "Cake", icon: basePath + "menu_5.png" },
  { id: 7, name: "Pure Veg", icon: basePath + "menu_6.png" },
  { id: 8, name: "Pasta", icon: basePath + "menu_7.png" },
  { id: 9, name: "Noodles", icon: basePath + "menu_8.png " }
];

// Food Items
const foodItems = [
  {
    id: 1,
    name: "Greek Salad",
    description: "Fresh and healthy traditional Greek salad",
    price: 12,
    category: "Salad",
    image: basePath + "food_1.png",
    rating: 4.5
  },
  {
    id: 2,
    name: "Veg Salad",
    description: "Mixed vegetable salad with fresh ingredients",
    price: 18,
    category: "Salad",
    image: basePath + "food_2.png",
    rating: 4.4
  },
  {
    id: 3,
    name: "Chicken Salad",
    description: "Fresh salad topped with grilled chicken",
    price: 24,
    category: "Salad",
    image: basePath + "food_4.png",
    rating: 4.6
  },
  {
    id: 4,
    name: "Lasagna Rolls",
    description: "Delicious baked lasagna rolls",
    price: 14,
    category: "Rolls",
    image: basePath + "food_5.png",
    rating: 4.3
  },
  {
    id: 5,
    name: "Chicken Rolls",
    description: "Crispy rolls stuffed with chicken",
    price: 20,
    category: "Rolls",
    image: basePath + "food_7.png",
    rating: 4.5
  },
  {
    id: 6,
    name: "Ripple Ice Cream",
    description: "Creamy ripple flavored ice cream",
    price: 14,
    category: "Deserts",
    image: basePath + "food_9.png",
    rating: 4.7
  },
  {
    id: 7,
    name: "Vanilla Ice Cream",
    description: "Classic vanilla ice cream scoop",
    price: 12,
    category: "Deserts",
    image: basePath + "food_12.png",
    rating: 4.6
  },
  {
    id: 8,
    name: "Chicken Sandwich",
    description: "Grilled chicken sandwich with fresh veggies",
    price: 12,
    category: "Sandwich",
    image: basePath + "food_13.png",
    rating: 4.4
  },
  {
    id: 9,
    name: "Grilled Sandwich",
    description: "Toasted sandwich with cheese filling",
    price: 16,
    category: "Sandwich",
    image: basePath + "food_15.png",
    rating: 4.3
  },
  {
    id: 10,
    name: "Butterscotch Cake",
    description: "Soft and creamy butterscotch cake",
    price: 20,
    category: "Cake",
    image: basePath + "food_19.png",
    rating: 4.8
  },
  {
    id: 11,
    name: "Mix Veg Pulao",
    description: "Flavorful pulao with mixed vegetables",
    price: 10,
    category: "Pure Veg",
    image: basePath + "food_23.png",
    rating: 4.5
  },
  {
    id: 12,
    name: "Cheese Pasta",
    description: "Creamy cheese pasta with herbs",
    price: 12,
    category: "Pasta",
    image: basePath + "food_25.png",
    rating: 4.6
  },
  {
    id: 13,
    name: "Chicken Pasta",
    description: "Delicious pasta with chicken pieces",
    price: 24,
    category: "Pasta",
    image: basePath + "food_28.png",
    rating: 4.7
  },
  {
    id: 14,
    name: "Veg Noodles",
    description: "Stir fried noodles with vegetables",
    price: 12,
    category: "Noodles",
    image: basePath + "food_30.png",
    rating: 4.4
  },
  {
    id: 15,
    name: "Somen Noodles",
    description: "Traditional somen noodles",
    price: 20,
    category: "Noodles",
    image: basePath + "food_31.png",
    rating: 4.5
  }
];

// Hero Banner Images
const bannerImages = {
  hero: basePath + "header_img.png",
  promo1: basePath + "menu_1.png",
  promo2: basePath + "menu_5.png"
};

// export { categories, foodItems, bannerImages };
