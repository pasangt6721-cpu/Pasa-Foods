
// Import assets
import { assets, menu_list, food_list } from './assets/frontend_assets/assets.js';

console.log("App initialized");

// --- Home Page Logic ---

function renderHero() {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    hero.innerHTML = `
        <div class="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-10">
            <div class="flex-1 space-y-6 text-center md:text-left animate-fade-in-up">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                    Order your favourite <br class="hidden md:block">food here
                </h1>
                <p class="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
                </p>
                <a href="menu.html" class="inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300">
                    View Menu
                </a>
            </div>
            <div class="flex-1 relative w-full h-auto max-w-lg md:max-w-2xl mx-auto md:ml-auto">
                 <img src="${assets.header_img}" alt="Delicious Food" class="w-full h-auto object-contain md:object-cover object-center rounded-none md:rounded-lg shadow-none md:shadow-lg">
            </div>
        </div>
    `;
}

function renderCategories() {
    const container = document.getElementById('category-list');
    if (!container) return;

    let activeCategory = ''; // Default to none, or could match URL params

    const updateRender = () => {
        container.innerHTML = menu_list.map(item => {
            const isActive = activeCategory === item.menu_name;
            const activeClass = isActive ? 'border-orange-600 p-0.5 scale-105' : 'border-transparent p-1';
            const textClass = isActive ? 'text-gray-900 underline decoration-orange-600 decoration-2 underline-offset-4' : 'text-gray-600';

            return `
                <div class="category-item min-w-[100px] flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all duration-300" data-name="${item.menu_name}">
                    <div class="w-24 h-24 rounded-full border-4 ${activeClass} transition-all duration-300 bg-orange-100 overflow-hidden flex items-center justify-center">
                        <img src="${item.menu_image}" alt="${item.menu_name}" class="w-full h-full object-cover object-center">
                    </div>
                    <p class="${textClass} text-lg font-medium group-hover:text-orange-600 transition-colors text-center whitespace-nowrap">${item.menu_name}</p>
                </div>
            `;
        }).join('');

        // Re-attach listeners
        container.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                activeCategory = item.dataset.name;
                updateRender();
                // Optional: navigate to relevant section or simple visual toggle
            });
        });
    };

    updateRender();
}


// --- Menu Page Logic ---

function renderMenuPage() {
    const filterContainer = document.getElementById('category-filter');
    const foodContainer = document.getElementById('food-display');

    if (!filterContainer || !foodContainer) return;

    let activeCategory = "All";

    // render Filters
    const renderFilters = () => {
        // Add "All" option
        let html = '';

        // Render helper
        const createFilterItem = (name, image) => {
            const isActive = activeCategory === name;
            const activeClass = isActive ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100';
            // If image is provided, use it, else just text pill
            return `
                 <button class="filter-btn px-4 py-2 rounded-full border transition-colors ${activeClass}" data-name="${name}">
                    ${name}
                 </button>
            `;
        }

        // We can use a simpler visual for filters on the menu page (pills) or the round images.
        // Let's use the round images from Home page for consistency but responsive-friendly.

        // "All" Button
        // Note: reusing the round style might be too large for a strict filter bar on top of grid. 
        // Let's use horizontal scrolling round list similar to home, or simple pills. 
        // User asked for "Category section... clickable... interactive".
        // Let's stick to the round style but maybe slightly smaller or just reuse the logic. 
        // Actually, let's look at the Home design: it's big round icons.
        // For Menu page, let's use the same round icons but handle "All".

        // Re-using the style from home page for consistency
        const allImage = assets.selector_icon; // Placeholder or null

        const list = [{ menu_name: "All", menu_image: assets.selector_icon }, ...menu_list];

        filterContainer.innerHTML = list.map(item => {
            const isActive = activeCategory === item.menu_name;
            const activeClass = isActive ? 'border-orange-600 p-0.5 scale-105' : 'border-transparent p-1 opacity-70 hover:opacity-100';
            const textClass = isActive ? 'text-gray-900 font-bold' : 'text-gray-500';

            return `
                <div class="filter-item flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform" data-name="${item.menu_name}">
                    ${item.menu_image ?
                    `<div class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 ${activeClass} bg-orange-100 overflow-hidden flex items-center justify-center">
                             <img src="${item.menu_image}" class="w-full h-full object-cover object-center">
                         </div>` :
                    // Fallback for "All" if no image, or specific icon
                    `<div class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 ${activeClass} bg-orange-100 flex items-center justify-center text-orange-600">
                             All
                         </div>`
                }
                    <p class="text-sm md:text-base ${textClass} text-center whitespace-nowrap">${item.menu_name}</p>
                </div>
             `;
        }).join('');

        // Attach listeners
        filterContainer.querySelectorAll('.filter-item').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCategory = btn.dataset.name;
                renderFilters();
                renderFoodGrid();
            });
        });
    };

    // Render Food Grid
    const renderFoodGrid = () => {
        const filteredList = activeCategory === "All"
            ? food_list
            : food_list.filter(item => item.category === activeCategory);

        foodContainer.innerHTML = filteredList.map(item => {
            return `
                <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in-up flex flex-col h-full">
                    <div class="relative w-full h-48 sm:h-52 shrink-0">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover object-center">
                        <div class="absolute bottom-4 right-4 bg-white rounded-full p-1.5 shadow-sm cursor-pointer hover:bg-orange-50 transition-colors group add-to-cart-btn z-10" data-id="${item._id}">
                             <img src="${assets.add_icon_white}" class="w-7 h-7 hidden group-hover:block filter invert-0" alt="Add">
                             <img src="${assets.add_icon_white}" class="w-7 h-7 block group-hover:hidden filter brightness-0 invert" alt="Add">
                             <img src="${assets.add_icon_green}" class="w-8 h-8 rounded-full" alt="Add"> 
                        </div>
                    </div>
                    <div class="p-5 flex flex-col grow">
                        <div class="flex justify-between items-start mb-2">
                             <h3 class="text-xl font-bold text-gray-800 line-clamp-1">${item.name}</h3>
                             <img src="${assets.rating_starts}" class="h-4 object-contain" alt="Rating"> 
                        </div>
                        <p class="text-gray-500 text-sm h-10 overflow-hidden mb-4 leading-snug line-clamp-2">${item.description}</p>
                        <p class="text-2xl font-bold text-orange-600 mt-auto">$${item.price}</p>
                    </div>
                </div>
            `;
        }).join('');
    };

    renderFilters();
    renderFoodGrid();
}


document.addEventListener('DOMContentLoaded', () => {
    // Determine page via URL or body ID/class, but simpler to just run all and let them check for elements
    renderHero();
    renderCategories();
    renderMenuPage();
});

