
const basePath = './assets/frontend_assets/';

export const assets = {
    logo: basePath + 'logo.png',
    basket_icon: basePath + 'basket_icon.png',
    header_img: basePath + 'header_img.png',
    search_icon: basePath + 'search_icon.png',
    rating_starts: basePath + 'rating_starts.png',
    add_icon_green: basePath + 'add_icon_green.png',
    add_icon_white: basePath + 'add_icon_white.png',
    remove_icon_red: basePath + 'remove_icon_red.png',
    app_store: basePath + 'app_store.png',
    play_store: basePath + 'play_store.png',
    linkedin_icon: basePath + 'linkedin_icon.png',
    facebook_icon: basePath + 'facebook_icon.png',
    twitter_icon: basePath + 'twitter_icon.png',
    cross_icon: basePath + 'cross_icon.png',
    selector_icon: basePath + 'selector_icon.png',
    profile_icon: basePath + 'profile_icon.png',
    logout_icon: basePath + 'logout_icon.png',
    bag_icon: basePath + 'bag_icon.png',
    parcel_icon: basePath + 'parcel_icon.png'
}

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: basePath + 'menu_1.png'
    },
    {
        menu_name: "Rolls",
        menu_image: basePath + 'menu_2.png'
    },
    {
        menu_name: "Deserts",
        menu_image: basePath + 'menu_3.png'
    },
    {
        menu_name: "Sandwich",
        menu_image: basePath + 'menu_4.png'
    },
    {
        menu_name: "Cake",
        menu_image: basePath + 'menu_5.png'
    },
    {
        menu_name: "Pure Veg",
        menu_image: basePath + 'menu_6.png'
    },
    {
        menu_name: "Pasta",
        menu_image: basePath + 'menu_7.png'
    },
    {
        menu_name: "Noodles",
        menu_image: basePath + 'menu_8.png'
    }]


// Food Categories
const categories = [
  { id: 1, name: "All", icon: "🍽️" },
  { id: 2, name: "Pizza", icon: "🍕" },
  { id: 3, name: "Burgers", icon: "🍔" },
  { id: 4, name: "Sushi", icon: "🍱" },
  { id: 5, name: "Salads", icon: "🥗" },
  { id: 6, name: "Desserts", icon: "🍰" },
  { id: 7, name: "Drinks", icon: "🥤" },
  { id: 8, name: "Pasta", icon: "🍝" }
];
export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: basePath + 'food_1.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: basePath + 'food_2.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "3",
        name: "Clover Salad",
        image: basePath + 'food_3.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "4",
        name: "Chicken Salad",
        image: basePath + 'food_4.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "5",
        name: "Lasagna Rolls",
        image: basePath + 'food_5.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "6",
        name: "Peri Peri Rolls",
        image: basePath + 'food_6.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "7",
        name: "Chicken Rolls",
        image: basePath + 'food_7.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "8",
        name: "Veg Rolls",
        image: basePath + 'food_8.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "9",
        name: "Ripple Ice Cream",
        image: basePath + 'food_9.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "10",
        name: "Fruit Ice Cream",
        image: basePath + 'food_10.png',
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "11",
        name: "Jar Ice Cream",
        image: basePath + 'food_11.png',
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: basePath + 'food_12.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: basePath + 'food_13.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: basePath + 'food_14.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "15",
        name: "Grilled Sandwich",
        image: basePath + 'food_15.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "16",
        name: "Bread Sandwich",
        image: basePath + 'food_16.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "17",
        name: "Cup Cake",
        image: basePath + 'food_17.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "18",
        name: "Vegan Cake",
        image: basePath + 'food_18.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "19",
        name: "Butterscotch Cake",
        image: basePath + 'food_19.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "20",
        name: "Sliced Cake",
        image: basePath + 'food_20.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "21",
        name: "Garlic Mushroom ",
        image: basePath + 'food_21.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "22",
        name: "Fried Cauliflower",
        image: basePath + 'food_22.png',
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "23",
        name: "Mix Veg Pulao",
        image: basePath + 'food_23.png',
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "24",
        name: "Rice Zucchini",
        image: basePath + 'food_24.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: basePath + 'food_25.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: basePath + 'food_26.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "27",
        name: "Creamy Pasta",
        image: basePath + 'food_27.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "28",
        name: "Chicken Pasta",
        image: basePath + 'food_28.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "29",
        name: "Buttter Noodles",
        image: basePath + 'food_29.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "30",
        name: "Veg Noodles",
        image: basePath + 'food_30.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "31",
        name: "Somen Noodles",
        image: basePath + 'food_31.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "32",
        name: "Cooked Noodles",
        image: basePath + 'food_32.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
]
